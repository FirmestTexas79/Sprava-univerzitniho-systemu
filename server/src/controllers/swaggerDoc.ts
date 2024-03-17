import {Request,Response} from "express"

export function redirectDocumentation(request:Request,response:Response){
	response.status(200).redirect("/api-docs")
}