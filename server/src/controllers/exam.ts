import {Request, Response} from "express"
import {MySQLDatabaseOperator} from "../services/database/operators/mysql/MySQLDatabaseOperator"
import {ResponseBody} from "../../../lib/src/ResponseBody"
import {Exam} from "../models/Exam"

/**
 * GET /exams
 * @param request Request
 * @param response Response
 * Vypise Exams
 */
export async function getExams(request: Request, response: Response) {
	const res: ResponseBody<Exam[]> = {message: "Data from exams", code: 200}
	const count = request.query.count as string | undefined
	const intCount = count ? parseInt(count):undefined


	// execute the query to get all exams
	const operator = new MySQLDatabaseOperator(Exam)
	const results = await operator.readAll({count:intCount})
	res.data = results.map((exam)=> exam.omitNullValues())


	response.status(res.code).json(res)
}

export async function postExam(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const requestBody = request.body as Exam

	const operator = new MySQLDatabaseOperator(Exam)

	await operator.create(new Exam(requestBody))


	response.status(res.code).json(res)
}

export async function getExamById(request: Request, response: Response) {
	const res: ResponseBody<Exam> = {message: "Successfully found exam", code: 200}

	const idExam = request.params.id

	const operator = new MySQLDatabaseOperator(Exam)

	const results = await operator.readById(idExam)

	// check if exam exists
	if (!results) {
		res.message = "No exam found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	res.data = results.omitNullValues()

	response.status(res.code).json(res)
}

export async function putExam(request: Request, response: Response) {
	const res: ResponseBody = {message: "Succesfully changed record", code: 200}

	const idExam = request.params.id

	const operator = new MySQLDatabaseOperator(Exam)

	const results = await operator.readById(idExam)

	// check if exam exists
	if (!results) {
		res.message = "No exam found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.update(results)

	response.status(res.code).json(res)
}

export async function deleteExam(request: Request, response: Response) {
	const res: ResponseBody = {message: "Exam deleted successfully", code: 200}

	const idExam = request.params.id
	// Operating database
	const operator = new MySQLDatabaseOperator(Exam)
	const results = await operator.readById(idExam)

	// check if exam exists
	if (!results) {
		res.message = "No exam found"
		res.code = 500
		response.status(res.code).json(res)
		return
	}
	await operator.softDelete(idExam)

	response.status(res.code).json(res)
}