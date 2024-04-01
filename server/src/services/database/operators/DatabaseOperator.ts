import {TableEntity, TableEntityConstructor, TableEnum} from "../../../models/TableEntity"

export abstract class DatabaseOperator<T extends TableEntity, R extends NonNullable<unknown>> {
	protected readonly constructorFn?: new(data?: T) => T
	protected tableName: TableEnum

	protected constructor(constructor?: TableEntityConstructor<T>) {
		if (!constructor)
			console.info("No entity provided")
		else
			this.constructorFn = constructor

		// Get the table name from the constructor function
		if (constructor?.tableName) {
			this.tableName = constructor.tableName
		} else {
			throw new Error("Table name not provided.")
		}
	}

	/**
	 * Create a new record in the database
	 * @param data The data to be inserted
	 */
	abstract create(data: T): Promise<R | undefined>

	/**
	 * Read a record from the database by its id
	 * @param id The id of the record to be retrieved
	 * @param options Options for the operation
	 */
	abstract readById(id: string, options?: OperatorOptions): Promise<T | undefined>

	/**
	 * Read a record from the database by a key
	 * @param key The key to search by
	 * @param value The value to search for
	 * @param options Options for the operation
	 */
	abstract readByKey<K extends keyof T>(key: keyof T, value: T[K], options?: QueryOperatorOptions): Promise<T[]>

	/**
	 * Read all records from the database
	 * @param options Options for the operation
	 */
	abstract readAll(options?: OperatorOptions): Promise<T[]>

	/**
	 * Update a record in the database
	 * @param data The data to be updated
	 */
	abstract update(data: T): Promise<R | undefined>

	/**
	 * Merge a record in the database
	 * @param id The id of the record to be merged
	 * @param key The key to merge
	 * @param value The value to merge
	 */
	abstract merge<K extends keyof T>(id: string, key: keyof T, value: T[K]): Promise<R | undefined>

	/**
	 * Delete a record from the database
	 * @param id The id of the record to be deleted
	 */
	abstract delete(id: string): Promise<R | undefined>

	/**
	 * Soft delete a record from the database
	 * @param id The id of the record to be soft deleted
	 */
	abstract softDelete(id: string): Promise<R | undefined>

	protected async referencedProps<K extends TableEntity>(
		entity: T,
		operatorConstructor: new (constructor?: TableEntityConstructor<K>) => DatabaseOperator<K, R>,
		options?: OperatorOptions
	) {
		// Check for properties decorated with BindEntity and fetch related entities
		for (const prop of Object.keys(entity)) {
			const constructorData = Reflect.getMetadata("bind:entity", entity, prop)
			if (constructorData && this.constructorFn) {
				// Create a new operator for the related entity
				const relatedOperator = new operatorConstructor(constructorData)
				// @ts-ignore
				const relatedEntity = await relatedOperator.readById(entity[prop as keyof T], options)
				if (relatedEntity) {
					// Assign related entity to the property
					// @ts-ignore
					entity[prop as keyof T] = relatedEntity
				}
			}
		}
	}
}

/**
 * Options for the operator
 */
export interface OperatorOptions {
	/**
	 * Ignore the visibility of the record
	 */
	ignoreVisibility?: boolean

}

/**
 * Options for the query operator
 */
export interface QueryOperatorOptions extends OperatorOptions {
	/**
	 * The number of records to return
	 * @default 100
	 * @minimum 1
	 * @maximum 1000
	 * @TJS-type Integer
	 */
	count?: number
}

export const OPERATOR_OPTION_COUNT = 100