import { Logger, Module } from "@nestjs/common";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, Logger]
})
export class ScheduleModule {}
