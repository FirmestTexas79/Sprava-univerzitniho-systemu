import {z} from "zod"
import {ExamType} from "../../models/Exam"

export type PostExamBodySchema = z.infer<typeof postExamSchema>["body"]

export const postExamSchema = z.object({
	body:z.object({
		name:z.string().min(3),
		type:z.nativeEnum(ExamType),
		start:z.date(),
		end:z.date(),
		score:z.number().min(1),
		teacher:z.string().min(3),
		subject:z.string().min(3),
		capacity:z.number().min(1),
		room:z.string().min(1),
		description:z.string().min(5),
	})
})