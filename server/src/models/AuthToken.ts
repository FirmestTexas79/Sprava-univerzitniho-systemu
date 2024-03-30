import {TableEntity, TableEnum} from "./TableEntity"
import {Table} from "../services/database/operators/Table"

@Table(TableEnum.AUTH_TOKENS)
export class AuthToken extends TableEntity implements AuthTokenInterface{
	token?:string
	user?:string
	expiration?:Date


	constructor(data?: Partial<AuthToken>) {
		super(data)
		Object.assign(this,data)
	}

}

export interface AuthTokenInterface {
	token?:string
	user?:string
	expiration?:Date
}