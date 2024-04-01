import {TableEntity} from "../TableEntity"

export interface User extends TableEntity {
	firstname?: string,
	lastname?: string,
	titleAfter?: string,
	titleBefore?: string,
	email?: string,
	phone?: string,
	birthday?: Date,
	image?: Blob,
	role?: string
}