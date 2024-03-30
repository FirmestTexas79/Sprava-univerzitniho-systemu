import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {Activity} from "../models/Activity"
import {ResponseBody} from "../../../lib/src/ResponseBody"

/**
 * GET /activitys
 * @param request Request
 * @param response Response
 * Vypise Activitys
 */
export async function getActivities(request: Request, response: Response) {
	const res: ResponseBody<Activity[]> = {message: "Data from activities", code: 200}

	response.status(res.code).json(res)
}

export async function postActivity(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	response.status(res.code).json(res)
}

export async function getActivityById(request: Request, response: Response) {
	const res: ResponseBody<Activity> = {message: "Successfully found activity", code: 200}

	response.status(res.code).json(res)
}

export async function putActivity(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	response.status(res.code).json(res)
}

export async function deleteActivity(request: Request, response: Response) {
	const res: ResponseBody = {message: "Activity deleted successfully", code: 200}

	response.status(res.code).json(res)
}