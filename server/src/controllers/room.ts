import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {Room} from "../models/Room"

/**
 * GET /rooms
 * @param request Request
 * @param response Response
 * Vypise Rooms
 */
export async function getRooms(request: Request, response: Response) {
	const res: ResponseBody<Room[]> = {message: "Data from rooms", code: 200}
	const count = request.query.count as string | undefined
	const intCount = count ? parseInt(count):undefined


	// execute the query to get all rooms
	const operator = new MySQLDatabaseOperator(Room)
	const results = await operator.readAll({count:intCount})
	res.data = results.map((room)=> room.omitNullValues())


	response.status(res.code).json(res)
}

export async function postRoom(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const requestBody = request.body as Room

	const operator = new MySQLDatabaseOperator(Room)

	await operator.create(new Room(requestBody))


	response.status(res.code).json(res)
}

export async function getRoomById(request: Request, response: Response) {
	const res: ResponseBody<Room> = {message: "Successfully found room", code: 200}

	const idRoom = request.params.id

	const operator = new MySQLDatabaseOperator(Room)

	const results = await operator.readById(idRoom)

	// check if room exists
	if (!results) {
		res.message = "No room found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	res.data = results.omitNullValues()

	response.status(res.code).json(res)
}

export async function putRoom(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const idRoom = request.params.id

	const operator = new MySQLDatabaseOperator(Room)

	const results = await operator.readById(idRoom)

	// check if room exists
	if (!results) {
		res.message = "No room found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.update(results)

	response.status(res.code).json(res)
}

export async function deleteRoom(request: Request, response: Response) {
	const res: ResponseBody = {message: "Room deleted successfully", code: 200}

	const idRoom = request.params.id
	// Operating database
	const operator = new MySQLDatabaseOperator(Room)
	const results = await operator.readById(idRoom)

	// check if room exists
	if (!results) {
		res.message = "No room found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.softDelete(idRoom)

	response.status(res.code).json(res)
}