import {z} from "zod"

export type PostRatingBodySchema = z.infer<typeof postRatingSchema>["body"]

export const postRatingSchema = z.object({
	body:z.object({
		student:z.string().min(3),
		date:z.date(),
		exam:z.string().min(3),
		rating:z.number().min(1),
	})
})