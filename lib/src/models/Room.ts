import {TableEntity} from "./TableEntity"

export interface Room extends TableEntity{
	name?:string
	floor?:number
	type?:RoomType
	description?:string
	capacity?:number
}

export enum RoomType {
	COMPUTERS = "COMPUTERS",
	LABORATORY = "LABORATORY",
	LECTURE = "LECTURE",
	SEMINAR = "SEMINAR",
	OFFICE = "OFFICE",
	OTHER = "OTHER",
}