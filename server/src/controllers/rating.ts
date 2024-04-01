import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {Rating} from "../models/Rating"

/**
 * GET /ratings
 * @param request Request
 * @param response Response
 * Vypise Ratings
 */
export async function getRatings(request: Request, response: Response) {
	const res: ResponseBody<Rating[]> = {message: "Data from ratings", code: 200}
	const count = request.query.count as string | undefined
	const intCount = count ? parseInt(count):undefined


	// execute the query to get all ratings
	const operator = new MySQLDatabaseOperator(Rating)
	const results = await operator.readAll({count:intCount})
	res.data = results.map((rating)=> rating.omitNullValues())


	response.status(res.code).json(res)
}

export async function postRating(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const requestBody = request.body as Rating

	const operator = new MySQLDatabaseOperator(Rating)

	await operator.create(new Rating(requestBody))


	response.status(res.code).json(res)
}

export async function getRatingById(request: Request, response: Response) {
	const res: ResponseBody<Rating> = {message: "Successfully found rating", code: 200}

	const idRating = request.params.id

	const operator = new MySQLDatabaseOperator(Rating)

	const results = await operator.readById(idRating)

	// check if rating exists
	if (!results) {
		res.message = "No rating found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	res.data = results.omitNullValues()

	response.status(res.code).json(res)
}

export async function putRating(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const idRating = request.params.id

	const operator = new MySQLDatabaseOperator(Rating)

	const results = await operator.readById(idRating)

	// check if rating exists
	if (!results) {
		res.message = "No rating found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.update(results)

	response.status(res.code).json(res)
}

export async function deleteRating(request: Request, response: Response) {
	const res: ResponseBody = {message: "Rating deleted successfully", code: 200}

	const idRating = request.params.id
	// Operating database
	const operator = new MySQLDatabaseOperator(Rating)
	const results = await operator.readById(idRating)

	// check if rating exists
	if (!results) {
		res.message = "No rating found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.softDelete(idRating)

	response.status(res.code).json(res)
}