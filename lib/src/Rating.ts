import {TableEntity} from "./TableEntity"

export interface Rating extends TableEntity{
	student?:string
	date?:Date
	exam?:string
	rating?:number
}