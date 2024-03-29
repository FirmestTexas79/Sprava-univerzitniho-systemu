import {Request, Response} from "express"
import {ResponseBody} from "../../../lib/src/ResponseBody"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {User} from "../models/User"
import bcrypt from "bcrypt"

export interface LoginRequestBody {
	email: string,
	password: string
}

export async function postLogin(request: Request, response: Response) {
	const res: ResponseBody<User> = {message: "User successfully logged in", code: 200}

	const requestBody = request.body as LoginRequestBody

	if (!requestBody.email || !requestBody.password) {
		res.message = "Missing required fields"
		res.code = 400
		response.status(res.code).json(res)
		return
	}
	const operator = new MySQLDatabaseOperator(User)

	const users = await operator.readByKey("email", requestBody.email)

	if (users.length !== 1) {
		res.message = "Invalid email"
		res.code = 400
		response.status(res.code).json(res)
		return
	}
	const user = users[0]

	if (!user.password) {
		res.message = "Invalid password"
		res.code = 400
		response.status(res.code).json(res)
		return
	}
	const isMatch = await bcrypt.compare(requestBody.password, user.password)

	if (!isMatch) {
		res.message = "Invalid password"
		res.code = 400
		response.status(res.code).json(res)
		return
	}
	res.data = user.omitProp("password").omitNullValues()
	response.status(res.code).json(res)
}

export function postLogout(request: Request, response: Response) {
	const res: ResponseBody = {message: "User successfully logged out", code: 200}

	//TODO: implement logout function


	response.status(res.code).json(res)
}

export async function postRegister(request: Request, response: Response) {
	const res: ResponseBody = {message: "User created successfully", code: 201}

	const requestBody = request.body as User

	if (!requestBody.email || !requestBody.password || !requestBody.firstname || !requestBody.lastname) {
		res.message = "Missing required fields"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const operator = new MySQLDatabaseOperator(User)

	const users = await operator.readByKey("email", requestBody.email, {ignoreVisibility: true})

	if (users.length !== 0) {
		res.message = "User already exist"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const salt = bcrypt.genSaltSync(12)
	const hashPassword = await bcrypt.hash(requestBody.password,salt)

	await operator.create(new User({...requestBody,password:hashPassword}))

	response.status(res.code).json(res)
}

export function postForgotPassword(request: Request, response: Response) {
	const res: ResponseBody = {message: "User", code: 200}




	response.status(res.code).json(res)
}

export function postResetPassword(request: Request, response: Response) {
	const res: ResponseBody = {message: "User", code: 200}




	response.status(res.code).json(res)
}