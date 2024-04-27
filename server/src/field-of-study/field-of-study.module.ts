import { Logger, Module } from "@nestjs/common";
import { FieldOfStudyController } from "./field-of-study.controller";
import { FieldOfStudyService } from "./field-of-study.service";

@Module({
  controllers: [FieldOfStudyController],
  providers: [FieldOfStudyService, Logger],
})
export class FieldOfStudyModule {}
