import axios from "axios"
import {SERVER_URL} from "../../../../lib/src/persistance/utils.ts"
import {RoutePath} from "../../../../lib/src/persistance/RoutePath.ts"
import {Subject} from "../../../../lib/src/models/Subject.ts"

export async function postSubject(subject:Subject){
	console.log("post subject")

	const response = await axios.post(SERVER_URL + RoutePath.SUBJECTS, {...subject})
	console.log(response)
	return response.status

}