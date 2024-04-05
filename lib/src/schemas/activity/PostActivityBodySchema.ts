import {z} from "zod"

export type PostActivityBodySchema = z.infer<typeof postActivitySchema>["body"]

export const postActivitySchema = z.object({
	body:z.object({
		name:z.string().min(3),
		description:z.string().min(5),
	})
})