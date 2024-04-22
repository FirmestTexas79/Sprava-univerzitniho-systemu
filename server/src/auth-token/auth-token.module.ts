import { Logger, Module } from "@nestjs/common";
import { AuthTokenService } from "./auth-token.service";

@Module({
  providers: [AuthTokenService, Logger],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
