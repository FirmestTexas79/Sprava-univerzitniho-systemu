import {TableEntity, TableEnum} from "./TableEntity"
import {Exam as ExamInterface, ExamType} from "../../../lib/src/Exam"
import {Table} from "../services/database/operators/Table"

@Table(TableEnum.EXAMS)
export class Exam extends TableEntity implements ExamInterface{
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

	constructor(data?: Partial<Exam>) {
		super(data)
		Object.assign(this,data)
	}
}

