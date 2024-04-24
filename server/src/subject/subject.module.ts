import { Logger, Module } from "@nestjs/common";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, Logger]
})
export class SubjectModule {}
