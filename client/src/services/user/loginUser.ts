import axios from "axios"
import {LoginRequestBody} from "../../../../lib/src/persistance/LoginRequestBody.ts"
import {ResponseBody} from "../../../../lib/src/persistance/ResponseBody.ts"
import {User} from "../../../../lib/src/models/user/User.ts"
import {SERVER_URL} from "../../../../lib/src/persistance/utils.ts"
import {RoutePath} from "../../../../lib/src/persistance/RoutePath.ts"


/**
 * Logs in a user
 * @param user The user to log in
 */
export async function loginUser(user: LoginRequestBody) {
	try {
		const {data} = await axios.post<any, { data: ResponseBody<User> }>(SERVER_URL + RoutePath.AUTH_LOGIN, user)
		return data.data
	} catch (e) {
		console.error(e)
	}
}