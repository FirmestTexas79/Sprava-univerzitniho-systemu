import {TableEntity, TableEnum} from "./TableEntity"
import {Rating as RatingInterface} from "../../../lib/src/models/Rating"
import {Table} from "../services/database/operators/Table"

@Table(TableEnum.RATINGS)
export class Rating extends TableEntity implements RatingInterface{
	student?:string
	date?:Date
	exam?:string
	rating?:number

	constructor(data?: Partial<Rating>) {
		super(data)
		Object.assign(this,data)
	}
}

