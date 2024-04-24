import { RoomTypes } from "@prisma/client";

export class CreateRoomDto {
  capacity: number;
  description?: string;
  floor: number;
  name: string;
  type?: RoomTypes;
}
