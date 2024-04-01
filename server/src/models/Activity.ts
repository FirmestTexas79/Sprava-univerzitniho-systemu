import {TableEntity, TableEnum} from "./TableEntity"
import {Activity as ActivityInterface} from "../../../lib/src/models/Activity"
import {Table} from "../services/database/operators/Table"

@Table(TableEnum.ACTIVITIES)
export class Activity extends TableEntity implements ActivityInterface{
	name?:string
	description?:string

	constructor(data?: Partial<Activity>) {
		super(data)
		Object.assign(this,data)
	}
}

