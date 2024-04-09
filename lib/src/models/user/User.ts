import {TableEntity} from "../TableEntity"
import {UserRole} from "./UserRole"

export interface User extends TableEntity {
	firstname?: string,
	lastname?: string,
	titleAfter?: string,
	titleBefore?: string,
	email?: string,
	phone?: string,
	birthday?: Date,
	image?: Blob,
	role?: UserRole
}