import {AnyZodObject, ZodError, ZodIssue} from "zod"
import {NextFunction, Request, Response} from "express"
import {ResponseBody} from "../../../lib/src/persistance/ResponseBody"
import {StatusCodes} from "http-status-codes"

export interface ErrorResponseData {
	parameter?: string
	expected?: string
	received?: string
	message?: string
}

export function validate(schema: AnyZodObject) {
	return function (request: Request, response: Response, next: NextFunction) {
		try {
			schema.parse({
				body: request.body,
				params: request.params,
				query: request.query,
			})
			next()
		} catch (e: any) {
			const requestBody: ResponseBody = {
				message: "Invalid request",
				code: StatusCodes.BAD_REQUEST
			}
			if (e instanceof ZodError) {
				requestBody.description = errorMessage(e)
				console.error(errorMessage(e))
				return response.status(requestBody.code).json(requestBody)
			} else {
				requestBody.message = errorMessage(e)
				requestBody.code = StatusCodes.INTERNAL_SERVER_ERROR
				console.error(e)
				return response.status(requestBody.code).json(requestBody)
			}
		}
	}
}

function errorMessage(error: ZodError) {
	return error.errors.map((err: ZodIssue) => ("" + err.message + " in " + err.path[0])).join(". ")
}