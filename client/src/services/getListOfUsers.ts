import axios from "axios"
import {SERVER_URL} from "../../../lib/src/persistance/utils.ts"
import {RoutePath} from "../../../lib/src/persistance/RoutePath.ts"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody.ts"
import {User} from "../../../lib/src/models/user/User.ts"

export async function getListOfUsers(count:number){
	try {
		const response = await axios.get<any, { data: ResponseBody<User[]> }>(
			`${SERVER_URL + RoutePath.USERS}?count=${count}`
		)
		return response.data.data
	} catch(e) {
		console.error(e)
	}
}