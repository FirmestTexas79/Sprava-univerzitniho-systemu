import {TableEntity, TableEnum} from "./TableEntity"
import {Table} from "../services/database/operators/Table"
import {UserPassword as UserInterface} from "../../../lib/src/models/user/UserPassword"


@Table(TableEnum.USERS)
export class User extends TableEntity implements UserInterface{
	birthday?: string
	email?: string
	firstname?: string
	image?: Blob
	lastname?: string
	phone?: string
	role?: string
	titleAfter?: string
	titleBefore?: string
	password?:string

	constructor(data?: Partial<User>) {
		super(data)
		Object.assign(this,data)
	}

}