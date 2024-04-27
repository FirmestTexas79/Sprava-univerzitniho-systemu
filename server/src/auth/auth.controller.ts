import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, ChangePasswordAuthDto, LoginAuthDto, RegisterAuthDto, ResetPasswordAuthDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "./guard";
import { Response } from "express";
import { GetUser } from "./decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  async login(@Body() dto: LoginAuthDto, @Res() res: Response) {
    const response = await this.authService.login(dto);

    res.status(response.statusCode).json(response);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post("/logout")
  async logout() {
    return this.authService.logout();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post("/register")
  async register(@Body() dto: RegisterAuthDto, @Res() res: Response) {
    const response = await this.authService.register(dto);

    res.status(response.statusCode).json(response);
  }

  @Post("/forgot-password")
  async forgotPassword(@Headers("origin") origin: string, @Body() dto: AuthDto, @Res() res: Response) {
    const response = await this.authService.forgotPassword(origin, dto);

    res.status(response.statusCode).json(response);
  }

  @Post("/reset-password")
  async resetPassword(@Body() dto: ResetPasswordAuthDto, @Res() res: Response) {
    const response = await this.authService.resetPassword(dto);

    res.status(response.statusCode).json(response);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post("/change-password")
  async changePassword(@GetUser("id") userId: string, @Body() dto: ChangePasswordAuthDto, @Res() res: Response) {
    const response = await this.authService.changePassword(userId, dto);

    res.status(response.statusCode).json(response);
  }
}
