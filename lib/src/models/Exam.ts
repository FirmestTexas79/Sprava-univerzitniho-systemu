import {TableEntity} from "./TableEntity"

export interface Exam extends TableEntity{
	name?:string
	type?:ExamType
	start?:Date
	end?:Date
	score?:number
	teacher?:string
	subject?:string
	capacity?:number
	room?:string
	description?:string
}

export enum ExamType {
	EXAM = "EXAM",
	PRESENTATION = "PRESENTATION",
	PROJECT = "PROJECT",
}