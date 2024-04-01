import {Request, Response} from "express"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {User} from "../models/User"
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import {AuthToken} from "../models/AuthToken"
import ip from "ip"
import {PORT} from "../app"
import {sendPasswordResetEmail} from "../services/auth/sendPasswordRessetEmail"

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
	const hashPassword = await bcrypt.hash(requestBody.password, salt)

	await operator.create(new User({...requestBody, password: hashPassword}))


	response.status(res.code).json(res)
}

export async function postForgotPassword(request: Request, response: Response) {
	const res: ResponseBody = {message: "Password reset link sent", code: 200}

	const {email} = request.body

	if (!email) {
		res.message = "Email missing"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const operator = new MySQLDatabaseOperator(User)

	const users = await operator.readByKey("email", email)

	if (users.length !== 1) {
		res.message = "Invalid email"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const user = users[0]

	const authOperator = new MySQLDatabaseOperator(AuthToken)

	const at = await authOperator.readByKey("user", user.id)

	if (at[0].token) {
		res.message = "email has already been sent"
		res.code = 200
		response.status(res.code).json(res)
		return
	}

	const token = uuidv4()

	const expire = new Date()
	expire.setHours(expire.getHours() + 1)

	const authToken = new AuthToken({user: user.id, token, expiration: expire})

	await authOperator.create(authToken)

	const resetLink = `http://${ip.address()}:${PORT}/reset-password=${token}`

	await sendPasswordResetEmail(email, resetLink, (error, info) => {
		if (error) {
			res.message = "error sending e-mail"
			res.code = 500
			response.status(res.code).json(res)

		} else {
			res.message = "reset link sent " + JSON.stringify(info)
			res.code = 200
			response.status(res.code).json(res)
		}
	})

	response.status(res.code).json(res)
}

export async function postResetPassword(request: Request, response: Response) {
	const res: ResponseBody = {message: "Password reset successful", code: 200}

	const {email, token, newPassword} = request.body

	if (!email || !token || !newPassword) {
		res.message = "Missing essential fields"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const authOperator = new MySQLDatabaseOperator(AuthToken)

	const tokens = await authOperator.readByKey("token", token)

	if (tokens.length !== 1) {
		res.message = "Invalid token"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const tokenData = tokens[0]

	if (!tokenData.id) {
		res.message = "Invalid token"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	if (tokenData.expiration && tokenData.expiration < new Date()) {
		res.message = "Token expired"
		res.code = 401
		response.status(res.code).json(res)
		return
	}

	const operator = new MySQLDatabaseOperator(User)

	const users = await operator.readByKey("email", email)

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

	const match = await bcrypt.compare(user.password, newPassword)

	if (match) {
		res.message = "Password cannot be same"
		res.code = 400
		response.status(res.code).json(res)
		return
	}

	const salt = bcrypt.genSaltSync(12)
	const hashPassword = await bcrypt.hash(newPassword, salt)

	await operator.update(new User({...user, password: hashPassword}))
	await authOperator.delete(tokenData.id)

	response.status(res.code).json(res)
}