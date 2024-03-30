import {TableEntity, TableEnum} from "./TableEntity"
import {Room as RoomInterface, RoomType} from "../../../lib/src/Room"
import {Table} from "../services/database/operators/Table"

@Table(TableEnum.ROOMS)
export class Room extends TableEntity implements RoomInterface{
	name?:string
	floor?:number
	type?:RoomType
	description?:string
	capacity?:number

	constructor(data?: Partial<Room>) {
		super(data)
		Object.assign(this,data)
	}
}

