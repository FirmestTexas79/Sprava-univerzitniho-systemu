import axios from "axios"
import {ResponseBody} from "../../../../lib/src/persistance/ResponseBody.ts"
import {SERVER_URL} from "../../../../lib/src/persistance/utils.ts"
import {RoutePath} from "../../../../lib/src/persistance/RoutePath.ts"
import {Subject} from "../../../../lib/src/models/Subject.ts"

export async function getSubjects(count?:number){

	const url = `${SERVER_URL + RoutePath.SUBJECTS}`
	const uri = count? url + `?count=${count}`:url

	try {
		const response = await axios.get<any, { data: ResponseBody<Subject[]> }>(
			uri
		)
		return response.data.data
	} catch(e) {
		console.error(e)
	}
}