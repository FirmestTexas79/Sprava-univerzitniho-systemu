import { TableEntity, TableEntityConstructor, TableEnum } from "../../../models/TableEntity"

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
    abstract readByKey(key: keyof T, value: string, options?: OperatorOptions): Promise<T[]>

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
     * @param data The data to be merged
     */
    abstract merge(data: T): Promise<R | undefined>

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