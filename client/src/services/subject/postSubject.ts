import {PostSubjectBodySchema} from "../../../../lib/src/schemas/subject/PostSubjectBodySchema.ts"
import axios from "axios"
import {SERVER_URL} from "../../../../lib/src/persistance/utils.ts"
import {RoutePath} from "../../../../lib/src/persistance/RoutePath.ts"

export async function postSubject(subject:PostSubjectBodySchema){

	try {
		const response = await axios.post(SERVER_URL + RoutePath.SUBJECTS, subject)
		return response.status
	} catch (e) {
		console.error(e)
		// @ts-ignore
		return e?.code
	}
}