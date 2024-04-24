import { Logger, Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Module({
  controllers: [RoomController],
  providers: [RoomService, Logger]
})
export class RoomModule {}
