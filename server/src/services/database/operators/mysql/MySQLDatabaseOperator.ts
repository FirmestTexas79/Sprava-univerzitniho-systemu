import { DatabaseOperator, OperatorOptions } from "../DatabaseOperator"
import { TableEntity, TableEntityConstructor } from "../../../../models/TableEntity"
import { ResultSetHeader } from "mysql2"
import { DatabaseRowVisibility } from "../../../../../../lib/src/DatabaseRowVisibility"
import { pool } from "../../../../config/database"

/**
 * MySQLDatabaseOperator
 * The operator for MySQL database operations
 */
export class MySQLDatabaseOperator<T extends TableEntity> extends DatabaseOperator<T, ResultSetHeader> {
	/*
	 * The pool to be used for database operations
	 */
	private pool

	constructor(constructor?: TableEntityConstructor<T>) {
		super(constructor)
		this.pool = pool
	}

	/**
	 * Create a new record in the database
	 * @param data The data to be inserted
	 */
	async create(data: T): Promise<ResultSetHeader | undefined> {
		if (!this.constructorFn) return

		const sql = `INSERT INTO ${this.tableName}
                 SET ?`

		try {
			const [rows] = await this.pool.query<ResultSetHeader>(sql, data)
			console.log("Record added successfully", JSON.stringify(rows))
			return rows
		} catch (error) {
			console.error("Error executing execute:", error)
			throw error
		}
	}

	/**
	 * Read a record from the database by its id
	 * @param id The id of the record to be retrieved
	 * @param options Options for the operation
	 */
	async readById(id: string, options?: OperatorOptions): Promise<T | undefined> {
		if (!this.constructorFn) return

		const sql = `SELECT *
                 FROM ${this.tableName}
                 WHERE id = ?`

		try {
			// @ts-ignore
			const [rows] = await this.pool.query<T[]>(sql, [id])
			console.log("Record retrieved successfully", rows)

			if (rows.length === 0) {
				console.warn("No record found")
				return
			} else if (rows.length > 1) {
				console.warn("More than one record found")
				return
			} else if (options?.ignoreVisibility === true || rows[0].visibility === DatabaseRowVisibility.ACTIVE) {
				console.log("11", rows[0])
				return new this.constructorFn(rows[0])
			}
		} catch (error) {
			console.error("Error executing execute:", error)
			throw error
		}
	}

	/**
	 * Read a record from the database by a key
	 * @param key The key to search by
	 * @param value The value to search for
	 * @param options Options for the operation
	 */
	async readByKey(key: keyof T, value: string, options?: OperatorOptions): Promise<T[]> {
		if (!this.constructorFn) return []

		const field = key.toString()
		const results: T[] = []

		const sql = `SELECT *
                 FROM ${this.tableName}
                 WHERE ${field} = ?`

		try {
			// @ts-ignore
			const [rows] = await this.pool.query<T[]>(sql, [value])
			console.log("Records retrieved successfully", rows)

			const entities = rows.filter((element: T) => options?.ignoreVisibility === true || element.visibility === DatabaseRowVisibility.ACTIVE)

			for (const element of entities) {
				if (!this.constructorFn) break
				const entity = new this.constructorFn(element)
				results.push(entity)
			}
			return results
		} catch (error) {
			console.error("Error executing execute:", error)
			throw error
		}
	}

	/**
	 * Read all records from the database
	 * @param options Options for the operation
	 */
	async readAll(options?: OperatorOptions): Promise<T[]> {
		if (!this.constructorFn) return []

		const results: T[] = []

		const sql = `SELECT *
                 FROM ${this.tableName}`

		try {
			// @ts-ignore
			const [rows] = await this.pool.query<T[]>(sql)
			console.log("Records retrieved successfully", rows)

			for (const element of rows) {
				if (!this.constructorFn) break
				const entity = new this.constructorFn(element)
				if (options?.ignoreVisibility === true || entity.visibility === DatabaseRowVisibility.ACTIVE)
					results.push(entity)
			}
			return results
		} catch (error) {
			console.error("Error executing execute:", error)
			throw error
		}
	}

	/**
	 * Update a record in the database
	 * @param data The data to be updated
	 */
	async update(data: T): Promise<ResultSetHeader | undefined> {
		if (!this.constructorFn) return

		const sql = `UPDATE ${this.tableName}
                 SET ?
                 WHERE id = ?`

		try {
			const [rows] = await this.pool.query<ResultSetHeader>(sql, [data, data.id])
			console.log("Record updated successfully", JSON.stringify(rows))
			return rows
		} catch (error) {
			console.error("Error executing execute:", error)
			throw error
		}
	}

	/**
	 * Merge a record in the database
	 * @param data The data to be merged
	 */
	async merge(data: T): Promise<ResultSetHeader | undefined> {
		if (!this.constructorFn) return

		const sql = `INSERT INTO ${this.tableName}
                 SET ?
                 ON DUPLICATE KEY UPDATE ?`

		try {
			const [rows] = await this.pool.query<ResultSetHeader>(sql, [data, data])
			console.log("Record merged successfully", JSON.stringify(rows))
			return rows
		} catch (error) {
			console.error("Error executing execute:", error)
			throw error
		}
	}

	/**
	 * Delete a record from the database
	 * @param id The id of the record to be deleted
	 */
	async delete(id: string): Promise<ResultSetHeader | undefined> {
		if (!this.constructorFn) return

		const sql = `DELETE
                 FROM ${this.tableName}
                 WHERE id = ?`

		try {
			const [rows] = await this.pool.query<ResultSetHeader>(sql, [id])
			console.log("Record deleted successfully", JSON.stringify(rows))
			return rows
		} catch (error) {
			console.error("Error executing query:", error)
			throw error
		}
	}

	/**
	 * Soft delete a record from the database
	 * @param id The id of the record to be soft deleted
	 */
	async softDelete(id: string): Promise<ResultSetHeader | undefined> {
		if (!this.constructorFn) return

		const sql = `UPDATE ${this.tableName}
                 SET visibility = ` + DatabaseRowVisibility.DELETED + " WHERE id = ?"

		try {
			const [rows] = await this.pool.query<ResultSetHeader>(sql, [id])
			console.log("Record soft deleted successfully", JSON.stringify(rows))
			return rows
		} catch (error) {
			console.error("Error executing query:", error)
			throw error
		}
	}
}
