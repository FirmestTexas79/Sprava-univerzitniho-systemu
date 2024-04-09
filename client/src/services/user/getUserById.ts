import axios from "axios"
import {SERVER_URL} from "../../../../lib/src/persistance/utils.ts"
import {RoutePath} from "../../../../lib/src/persistance/RoutePath.ts"
import {User} from "../../../../lib/src/models/user/User.ts"
import {ResponseBody} from "../../../../lib/src/persistance/ResponseBody.ts"

export async function getUserById(userId?:string){
	if(!userId) return
	try {
		const response = await axios.get<any, {data:ResponseBody<User>}>(
			`${SERVER_URL + RoutePath.USERS}/${userId}`
		)
		return response.data.data
	} catch(e) {
		console.error(e)
	}
}