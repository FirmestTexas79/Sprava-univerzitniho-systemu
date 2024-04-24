import { Body, Controller, Headers, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, ChangePasswordAuthDto, LoginAuthDto, RegisterAuthDto, ResetPasswordAuthDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "./guard";
import { GetUser } from "./decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("/logout")
  async logout() {
    return this.authService.logout();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post("/register")
  async register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post("/forgot-password")
  async forgotPassword(@Headers("origin") origin: string, @Body() dto: AuthDto) {
    return this.authService.forgotPassword(origin, dto);
  }

  @Post("/reset-password")
  async resetPassword(@Body() dto: ResetPasswordAuthDto) {
    return this.authService.resetPassword(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post("/change-password")
  async changePassword(@GetUser("id") userId: string, @Body() dto: ChangePasswordAuthDto) {
    return this.authService.changePassword(userId, dto);
  }
}
