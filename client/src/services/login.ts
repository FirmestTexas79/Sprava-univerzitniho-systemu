import axios from "axios"
import {LoginRequestBody} from "../../../lib/src/persistance/LoginRequestBody"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {User} from "../../../lib/src/models/user/User"
import {SERVER_URL} from "../../../lib/src/persistance/utils"
import {RoutePath} from "../../../lib/src/persistance/RoutePath"


/**
 * Logs in a user
 * @param user The user to log in
 */
export async function login(user: LoginRequestBody) {
	try {
		const {data} = await axios.post<any, { data: ResponseBody<User> }>(SERVER_URL + RoutePath.AUTH_LOGIN, user)
		return data.data
	} catch (e) {
		console.error(e)
	}
}