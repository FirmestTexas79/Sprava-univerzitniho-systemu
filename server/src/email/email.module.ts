import { Logger, Module } from "@nestjs/common";
import { EmailService } from "./email.service";

@Module({
  exports: [EmailService],
  providers: [EmailService, Logger],
})
export class EmailModule {}
