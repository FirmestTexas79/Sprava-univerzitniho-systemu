import {RowDataPacket} from "mysql2"
import {TableEntity as TableEntityInterface} from "../../../lib/src/TableEntity"
import {omitNull} from "../../../lib/src/utils"

/**
 * TableEntity is the base class for all data models.
 */
//@ts-ignore
export abstract class TableEntity implements RowDataPacket, TableEntityInterface {
	id?: string
	visibility?: string
	static readonly tableName?: TableEnum

	protected constructor(data?: Partial<TableEntity>) {
		Object.assign(this, data)
	}

	/**
	 * Hydrate the model with data
	 * @param data The data to hydrate the model with
	 * @protected This method should only be called from within the class
	 */
	protected hydrate(data: Partial<TableEntity>) {
		Object.assign(this, data)
	}

	/**
	 * Omit a single property from the model
	 * @param property The property to omit
	 */
	public omitProp<T extends this>(property: keyof T): T {
		const data: Partial<T> = {...this, [property]: undefined} as unknown as Partial<T>
		return new (this.constructor as new (data?: Partial<T>) => T)(data)
	}

	/**
	 * Omit multiple properties from the model
	 * @param properties The properties to omit
	 */
	public omitProps<T extends this>(properties: (keyof T)[]): T {
		const omittedProperties: Partial<T> = {}
		for (const prop of properties) {
			omittedProperties[prop] = undefined
		}
		const data: Partial<T> = {...this, ...omittedProperties} as unknown as Partial<T>
		return new (this.constructor as new (data?: Partial<T>) => T)(data)
	}


	/**
	 * Omit null values from the model
	 */
	public omitNullValues<T extends this>(): T {
		const data: Partial<T> = omitNull(this) as unknown as Partial<T>
		return new (this.constructor as new (data?: Partial<T>) => T)(data)
	}
}

export enum TableEnum {
	USERS = "users",
	AUTH_TOKENS = "auth_tokens",
}

export interface TableEntityConstructor<T extends TableEntity> {
	new(data?: T): T;

	tableName?: TableEnum;
}