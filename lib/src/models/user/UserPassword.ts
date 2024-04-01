import {User} from "./User"

export interface UserPassword extends User {
	password?: string
}