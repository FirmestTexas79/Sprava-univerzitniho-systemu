import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {User} from "../models/User"
import {ResponseBody} from "../../../lib/src/ResponseBody"

/**
 * GET /users
 * @param request Request
 * @param response Response
 * Vypise Users
 */
export async function getUsers(request: Request, response: Response) {
	const res: ResponseBody<User[]> = {message: "Data from users", code: 200}
	//  #swagger.tags = ['User']
	//  #swagger.description = 'Endpoint to get all users'
	//  #swagger.responses[200] = {
	//    description: 'Data from users',
	//  }
	//  #swagger.responses[500] = {
	//    description: 'Error executing query'
	//  }

	const count = request.query.count as string | undefined
	const intCount = count ? parseInt(count):undefined


	// execute the query to get all users
	const operator = new MySQLDatabaseOperator(User)
	const results = await operator.readAll({count:intCount})
	res.data = results.map((user)=> user.omitNullValues().omitProp("password"as keyof User))
	// send the users as a response
	//    #swagger.responses[200]
	response.status(res.code).json(res)
}

// export async function postUser(request: Request, response: Response) {
//
// }

export async function getUserById(request: Request, response: Response) {
	const res: ResponseBody<User> = {message: "Successfully found user", code: 200}

	const idUser = request.params.id

	const operator = new MySQLDatabaseOperator(User)

	const results = await operator.readById(idUser)

	// check if user exists
	if (!results) {
		res.message = "No user found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	res.data = results.omitNullValues().omitProp("password" as keyof User)
	response.status(res.code).json(res)
}

export async function putUser(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const idUser = request.params.id

	const operator = new MySQLDatabaseOperator(User)

	const results = await operator.readById(idUser)

	// check if user exists
	if (!results) {
		res.message = "No user found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.update(results)
	response.status(res.code).json(res)
}

export async function deleteUser(request: Request, response: Response) {
	const res: ResponseBody = {message: "User deleted successfully", code: 200}
	// requesting id for idUser
	const idUser = request.params.id
	// Operating database
	const operator = new MySQLDatabaseOperator(User)
	const results = await operator.readById(idUser)

	// check if user exists
	if (!results) {
		res.message = "No user found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.softDelete(idUser)
	response.status(res.code).json(res)
}