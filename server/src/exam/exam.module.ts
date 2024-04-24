import { Logger, Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";

@Module({
  controllers: [ExamController],
  providers: [ExamService, Logger]
})
export class ExamModule {}
