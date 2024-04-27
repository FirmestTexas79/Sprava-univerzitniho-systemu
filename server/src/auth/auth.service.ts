import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthDto, ChangePasswordAuthDto, LoginAuthDto, RegisterAuthDto, ResetPasswordAuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { AuthTokenService } from "../auth-token/auth-token.service";
import { EmailService } from "../email/email.service";
import { PrismaService } from "../prisma/prisma.service";
import { generateRandomPassword } from "../utils/utils";
import { ResponseData } from "../utils/response-data";
import { UserToken } from "../utils/user-token";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private tokens: AuthTokenService,
    private emailService: EmailService,
    private logger: Logger = new Logger(AuthService.name),
  ) {}

  /**
   * Log in a user
   * @param dto The user's credentials
   */
  async login(dto: LoginAuthDto): Promise<ResponseData<UserToken>> {
    const response: ResponseData<UserToken> = {
      statusCode: HttpStatus.OK,
      message: "User logged in",
    } as ResponseData<UserToken>;
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // If the user does not exist, throw an error
    if (!user) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid credentials";
      return response;
    }

    // Verify the password
    const valid = await argon.verify(user.password, dto.password);

    // If the password is invalid, throw an error
    if (!valid) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid credentials";
      return response;
    }

    response.data = await this.signToken(user.id, user.email);

    // Return the user
    return response;
  }

  /**
   * Log out a user
   */
  logout(): void {
    //TODO: Implement logout
  }

  /**
   * Register a new user
   * @param dto The user's credentials
   */
  async register(dto: RegisterAuthDto): Promise<ResponseData<UserToken>> {
    const response: ResponseData<UserToken> = {
      statusCode: HttpStatus.CREATED,
      message: "User registered",
    } as ResponseData<UserToken>;

    const password = generateRandomPassword(8, 1, 1, 1, 0);

    // Hash the password
    const hash = await argon.hash(password);

    try {
      // Create a new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          sex: dto.sex,
          role: dto.role,
          firstname: dto.firstname,
          lastname: dto.lastname,
          birthdate: dto.birthdate,
          phone: dto.phone,
          titleBefore: dto.titleBefore,
          titleAfter: dto.titleAfter,
          fieldOfStudyId: dto.fieldOfStudy,
          password: hash,
        },
      });

      // Return the user
      response.data = await this.signToken(user.id, user.email);
      await this.sendRegistrationEmail(user.email, password);
      return response;
    } catch (error) {
      // If the error is a known request error
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "PHttpStatus.OK2") {
          this.logger.error(error);
          response.error = "Forbidden";
          response.statusCode = HttpStatus.FORBIDDEN;
          response.message = "Email is already taken";
          return response;
        }
      }
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Sign a token
   * @param userId user id
   * @param email user email
   */
  private async signToken(userId: string, email: string): Promise<UserToken> {
    const payload = { sub: userId, email: email };

    this.logger.log(`Payload for ${userId}`);

    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, { expiresIn: "4h", secret: secret });

    return { token: token, expiration: new Date(Date.now() + 4 * 60 * 60 * 1000) };
  }

  /**
   * Reset a user's password
   * @param origin The origin of the request
   * @param dto The user's credentials
   */
  async forgotPassword(origin: string, dto: AuthDto): Promise<ResponseData> {
    const response: ResponseData = { statusCode: HttpStatus.OK, message: "Password reset email sent" } as ResponseData;
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid user.";
      return response;
    }

    const token = uuid();

    // Set the token to expire in 1-day
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await this.tokens.createToken(user.email, token, expiresAt);

    const link = `${origin}/reset-password/${token}`;

    await this.sendPasswordReset(user.email, link);

    return response;
  }

  /**
   * Change a user's password with a logged user
   * @param userId The logged user
   * @param dto The user's credentials
   */
  async changePassword(userId: string, dto: ChangePasswordAuthDto): Promise<ResponseData> {
    const response: ResponseData = { statusCode: HttpStatus.OK, message: "Password changed" } as ResponseData;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid user.";
      return response;
    }

    const valid = await argon.verify(user.password, dto.oldPassword);

    if (!valid) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid password.";
      return response;
    }

    if (dto.newPassword !== dto.confirmPassword) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Passwords do not match.";
      return response;
    }

    if (dto.oldPassword === dto.newPassword) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "New password must be different from old password.";
      return response;
    }

    const hash = await argon.hash(dto.newPassword);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    return response;
  }

  /**
   * Reset a user's password
   * @param dto The user's credentials
   */
  async resetPassword(dto: ResetPasswordAuthDto): Promise<ResponseData> {
    const response: ResponseData = { statusCode: HttpStatus.OK, message: "Password reset" } as ResponseData;
    if (dto.newPassword !== dto.confirmPassword) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Passwords do not match.";
      return response;
    }

    const token = await this.tokens.getToken(dto.token);

    if (!token) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid token.";
      return response;
    }

    if (token.expiresAt < new Date()) {
      await this.tokens.removeTokenById(token.id);
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Token expired.";
      return response;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email: token.email,
      },
    });

    if (!user) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "Invalid user.";
      return response;
    }

    const valid = await argon.verify(user.password, dto.newPassword);

    if (valid) {
      response.error = "Forbidden";
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = "New password must be different from old password.";
      return response;
    }

    const hash = await argon.hash(dto.newPassword);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    await this.tokens.removeTokenById(token.id);

    return response;
  }

  /**
   * Send a password reset email
   * @param email Email address to send the email to
   * @param link The link to reset the password
   */
  private async sendPasswordReset(email: string, link: string): Promise<void> {
    await this.emailService.send({
      to: email,
      subject: "Obnovení hesla",
      html: `<html lang="cs">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Obnovení hesla</title>
            </head>
            <body>
                <p>Dobrý den,</p>
                <p>Obdrželi jsme žádost o obnovení hesla k vašemu účtu. Pokud jste tuto žádost neodeslali, můžete tento e-mail ignorovat.</p>
                <p>Pro obnovení hesla klikněte <a href="${link}">ZDE</a>.</p>
                <p>S pozdravem,</p>
                <p>${this.config.get("NÁZEV_APLIKACE")}</p>
            </body>
            </html>`,
    });
  }

  /**
   * Send a registration email
   * @param email Email address to send the email to
   * @param password The user's password
   */
  private async sendRegistrationEmail(email: string, password: string): Promise<void> {
    await this.emailService.send({
      to: email,
      subject: "Registrace",
      html: `<html lang="cs">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registrace</title>
            </head>
            <body>
                <p>Dobrý den,</p>
                <p>Váš účet byl vytvořen. Vaše heslo je: ${password}</p>
                <p>S tímto heslem se můžete přihlásit do svého účtu.</p>
                <p>S pozdravem,</p>
                <p>${this.config.get("NÁZEV_APLIKACE")}</p>
            </body>
            </html>`,
    });
  }
}
