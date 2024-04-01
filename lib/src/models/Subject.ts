import {TableEntity} from "./TableEntity"

export interface Subject extends TableEntity{
	name?:string
	short?:string
	department?:string
	credits?:number
	guarantor?:string
	description?:string
	category?:string
}