import { Api } from "./Api.ts";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { Room } from "@prisma/client";
import { z } from "zod";
import { RoomType } from "../../../lib/src/models/Room.ts";

const roomForm = z.object({
  capacity: z.number(),
  name: z.string().min(2),
  description: z.string().optional(),
  floor: z.number(),
  type: z.nativeEnum(RoomType).optional(),
});

export type RoomForm = z.infer<typeof roomForm>;

export class RoomApi extends Api<Room, RoomForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.ROOM);
  }
}
