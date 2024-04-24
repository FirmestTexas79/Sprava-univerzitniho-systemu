import { Logger, Module } from "@nestjs/common";
import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";

@Module({
  controllers: [RatingController],
  providers: [RatingService, Logger]
})
export class RatingModule {}
