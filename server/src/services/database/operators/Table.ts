import { TableEnum } from "../../../models/TableEntity"


/**
 * Table decorator to set the table name for the model
 * @param tableName The name of the table
 * @constructor This is a decorator
 * @example
 * ```ts
 * @Table(TableEnum.USERS)
 * export class User extends RowData implements UserInterface {
 * 	name?: string
 *
 * 		constructor (data?: Partial<User>) {
 * 			super(data)
 * 			Object.assign(this, data)
 * 		}
 * }
 * ```
 */
export function Table(tableName: TableEnum) {
	return function(target: any) {
		target.tableName = tableName
	}
}