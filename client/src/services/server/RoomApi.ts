import { Api } from "./Api.ts";
import { RoutePath } from "../../../../lib/src/persistance/RoutePath.ts";
import { Room, RoomTypes, User } from "@prisma/client";
import { z } from "zod";
import axios from "../../api/axios.ts";
import { ResponseData } from "../../../../lib/src/persistance/response-data.ts";

const createRoomForm = z.object({
  capacity: z.number(),
  name: z.string().min(2),
  description: z.string().nullish(),
  floor: z.number(),
  type: z.nativeEnum(RoomTypes).nullish(),
});

const updateRoomForm = z.object({
  capacity: z.number().nullish(),
  name: z.string().min(2).nullish(),
  description: z.string().nullish(),
  floor: z.number().nullish(),
  type: z.nativeEnum(RoomTypes).nullish(),
});

export type CreateRoomForm = z.infer<typeof createRoomForm>;

export type UpdateRoomForm = z.infer<typeof updateRoomForm>;

export class RoomApi extends Api<Room, CreateRoomForm, UpdateRoomForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.ROOM,{ create: createRoomForm, update: updateRoomForm});
  }

  /**
   * Get rooms by ids
   * @param array Array of ids
   */
  async getRoomsByIds(array: string[]) {
    const { data } = await axios.post<any, {
      data: ResponseData<Room[]>
    }>(this.path + "by-ids", { ids: array }, this.config);
    return data;
  }
}
