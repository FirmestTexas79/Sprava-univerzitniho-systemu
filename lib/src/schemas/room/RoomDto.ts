import {z} from "zod"
import {RoomType} from "../../models/Room"

export type RoomDto = z.infer<typeof postRoomSchema>["body"]

export const postRoomSchema = z.object({
	body:z.object({
		name:z.string().min(3),
		floor:z.number().min(1),
		type:z.nativeEnum(RoomType),
		description:z.string().min(5),
		capacity:z.number().min(1),
	})
})