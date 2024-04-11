import {TableEntity, TableEnum} from "./TableEntity"
import {Table} from "../services/database/operators/Table"
import {UserPassword as UserInterface} from "../../../lib/src/models/user/UserPassword"
import {UserRole} from "../../../lib/src/models/user/UserRole"


@Table(TableEnum.USERS)
export class User extends TableEntity implements UserInterface{
	birthday?: Date
	email?: string
	firstname?: string
	image?: Blob
	lastname?: string
	phone?: string
	role?: UserRole
	titleAfter?: string
	titleBefore?: string
	password?:string

	constructor(data?: Partial<User>) {
		super(data)
		Object.assign(this,data)
	}

}