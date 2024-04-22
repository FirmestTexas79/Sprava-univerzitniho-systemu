import { Injectable, Logger } from "@nestjs/common";
import { AuthToken } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthTokenService {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(AuthTokenService.name),
  ) {
  }

  /**
   * Create a new auth token
   * @param email The user's email
   * @param token The token's value
   * @param expiresAt The token's expiration date
   */
  async createToken(email: string, token: string, expiresAt: Date): Promise<AuthToken> {
    try {
      const result = await this.prismaService.authToken.create({
        data: {
          email,
          token,
          expiresAt,
        },
      });
      this.logger.log(`Created ${result.email}'s token`);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Remove an auth token
   * @param id The token's ID
   */
  async removeTokenById(id: string): Promise<AuthToken> {
    try {
      const result = await this.prismaService.authToken.delete({
        where: {
          id,
        },
      });
      this.logger.log(`Removed ${result.email}'s token`);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Get an auth token
   * @param token The token's value
   */
  async getToken(token: string): Promise<AuthToken | null> {
    try {
      const result = await this.prismaService.authToken.findUnique({
        where: {
          token,
        },
      });
      if (result) {
        this.logger.log(`Found ${result.email}'s token`);
      } else {
        this.logger.log(`Token not found for token: ${token}`);
      }
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
