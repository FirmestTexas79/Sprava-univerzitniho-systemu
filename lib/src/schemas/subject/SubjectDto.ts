import {z} from "zod"

export type SubjectDto = z.infer<typeof postSubjectSchema>["body"]

export const postSubjectSchema = z.object({
	body:z.object({
		name:z.string().min(3),
		short:z.string().min(1),
		department:z.string().min(1),
		credits:z.number().min(1),
		guarantor:z.string().min(3),
		description:z.string().min(5),
		category:z.string().min(1),
	})
})