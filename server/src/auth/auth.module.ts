import { Logger, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { AuthTokenModule } from "../auth-token/auth-token.module";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [JwtModule.register({}), AuthTokenModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger],
})
export class AuthModule {}
