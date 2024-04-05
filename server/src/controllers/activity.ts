import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {Activity} from "../models/Activity"
import {PostActivityBodySchema} from "../../../lib/src/schemas/activity/PostActivityBodySchema"

/**
 * GET /activities
 * @param request Request
 * @param response Response
 * Vypise Activitys
 */
export async function getActivities(request: Request, response: Response) {
	const res: ResponseBody<Activity[]> = {message: "Data from activities", code: 200}
	const count = request.query.count as string | undefined
	const intCount = count ? parseInt(count):undefined


	// execute the query to get all activities
	const operator = new MySQLDatabaseOperator(Activity)
	const results = await operator.readAll({count:intCount})
	res.data = results.map((activity)=> activity.omitNullValues())


	response.status(res.code).json(res)
}

export async function postActivity(request: Request<any,any,PostActivityBodySchema>, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const requestBody = request.body

	const operator = new MySQLDatabaseOperator(Activity)

	await operator.create(new Activity(requestBody))

	response.status(res.code).json(res)
}

export async function getActivityById(request: Request, response: Response) {
	const res: ResponseBody<Activity> = {message: "Successfully found activity", code: 200}

	const idActivity = request.params.id

	const operator = new MySQLDatabaseOperator(Activity)

	const results = await operator.readById(idActivity)

	// check if activity exists
	if (!results) {
		res.message = "No activity found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	res.data = results.omitNullValues()

	response.status(res.code).json(res)
}

export async function putActivity(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const idActivity = request.params.id

	const operator = new MySQLDatabaseOperator(Activity)

	const results = await operator.readById(idActivity)

	// check if activity exists
	if (!results) {
		res.message = "No activity found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.update(results)

	response.status(res.code).json(res)
}

export async function deleteActivity(request: Request, response: Response) {
	const res: ResponseBody = {message: "Activity deleted successfully", code: 200}

	const idActivity = request.params.id
	// Operating database
	const operator = new MySQLDatabaseOperator(Activity)
	const results = await operator.readById(idActivity)

	// check if activity exists
	if (!results) {
		res.message = "No activity found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.softDelete(idActivity)

	response.status(res.code).json(res)
}