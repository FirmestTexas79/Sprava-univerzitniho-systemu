import {connection} from "../config/database"
import {Request,Response} from "express"

export function getUsers(request:Request,response:Response){
	// #swagger.tags = ['user']
connection.query("SELECT * FROM users",(error,results)=>{
	if (error){
		console.error("error executing query: ",error)
		response.status(500).json({message:"error executing query"})
	}
	console.log(results)
	response.status(200).json(results)
})
}