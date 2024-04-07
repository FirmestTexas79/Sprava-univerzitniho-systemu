import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {Subject} from "../models/Subject"
import {PostSubjectBodySchema} from "../../../lib/src/schemas/subject/PostSubjectBodySchema"

/**
 * GET /subjects
 * @param request Request
 * @param response Response
 * Vypise Subjects
 */
export async function getSubjects(request: Request, response: Response) {
	const res: ResponseBody<Subject[]> = {message: "Data from subjects", code: 200}
	const count = request.query.count as string | undefined
	const intCount = count ? parseInt(count):undefined


	// execute the query to get all subjects
	const operator = new MySQLDatabaseOperator(Subject)
	const results = await operator.readAll({count:intCount})
	res.data = results.map((subject)=> subject.omitNullValues())


	response.status(res.code).json(res)
}

export async function postSubject(request: Request<any,any,PostSubjectBodySchema>, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const requestBody = request.body as Subject

	const operator = new MySQLDatabaseOperator(Subject)

	await operator.create(new Subject(requestBody))


	response.status(res.code).json(res)
}

export async function getSubjectById(request: Request, response: Response) {
	const res: ResponseBody<Subject> = {message: "Successfully found subject", code: 200}

	const idSubject = request.params.id

	const operator = new MySQLDatabaseOperator(Subject)

	const results = await operator.readById(idSubject)

	// check if subject exists
	if (!results) {
		res.message = "No subject found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	res.data = results.omitNullValues()

	response.status(res.code).json(res)
}

export async function putSubject(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const idSubject = request.params.id

	const operator = new MySQLDatabaseOperator(Subject)

	const results = await operator.readById(idSubject)

	// check if subject exists
	if (!results) {
		res.message = "No subject found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.update(results)

	response.status(res.code).json(res)
}

export async function deleteSubject(request: Request, response: Response) {
	const res: ResponseBody = {message: "Subject deleted successfully", code: 200}

	const idSubject = request.params.id
	// Operating database
	const operator = new MySQLDatabaseOperator(Subject)
	const results = await operator.readById(idSubject)

	// check if subject exists
	if (!results) {
		res.message = "No subject found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.softDelete(idSubject)

	response.status(res.code).json(res)
}