import {connection} from "../config/database"
import {Request, Response} from "express"
import {UserPassword} from "../../../lib/src/lib"
import bcrypt from "bcrypt"

export function getUsers(request: Request, response: Response) {
	// #swagger.tags = ['user']
	connection.query("SELECT * FROM users", (error, results) => {
		if (error) {
			console.error("error executing query: ", error)
			response.status(500).json({message: "error executing query"})
		}
		console.log(results)
		response.status(200).json(results)
	})
}

export async function postUser(request: Request, response: Response) {
	if (!request.body) {
		console.error("Missing parameters")
		response.status(400).json({message: "missing required info"})
	}
	const {password, name, email}: UserPassword = request.body
	if (!password || !email || !name) {
		console.error("Missing parameters")
		response.status(400).json({message: "missing required info"})
	}
	try {
		const salt = bcrypt.genSaltSync(12)
		const hashedPassword = await bcrypt.hash(password, salt)
		// TODO implement mysqldatabase
		console.log("User added succesfully: ", hashedPassword)
		response.status(201).json({message: "Succesfully sent"})
	} catch (error) {
		console.error("error: ", error)
		response.status(500).json({message: "error hashing password"})
	}
}