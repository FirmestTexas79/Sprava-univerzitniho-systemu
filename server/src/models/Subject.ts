import {TableEntity, TableEnum} from "./TableEntity"
import {Subject as SubjectInterface} from "../../../lib/src/Subject"
import {Table} from "../services/database/operators/Table"

@Table(TableEnum.SUBJECTS)
export class Subject extends TableEntity implements SubjectInterface{
	name?:string
	short?:string
	department?:string
	credits?:number
	guarantor?:string
	description?:string
	category?:string

	constructor(data?: Partial<Subject>) {
		super(data)
		Object.assign(this,data)
	}
}

