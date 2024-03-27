import {DatabaseOperator, OPERATOR_OPTION_COUNT, OperatorOptions, QueryOperatorOptions} from "../DatabaseOperator"
import { TableEntity, TableEntityConstructor } from "../../../../models/TableEntity"
import { ResultSetHeader } from "mysql2"
import { DatabaseRowVisibility } from "../../../../../../lib/src/DatabaseRowVisibility"
import { pool } from "../../../../config/database"
import "reflect-metadata"

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

		const [rows] = await this.pool.query<ResultSetHeader>(sql, data)
		console.log("Record added successfully", JSON.stringify(rows))
		return rows
	}

	/**
	 * Read a record from the database by its id
	 * @param id The id of the record to be retrieved
	 * @param options Options for the operation
	 */
	async readById(id: string, options?: OperatorOptions): Promise<T | undefined> {
		if (!this.constructorFn) return

		const visibility: string = options?.ignoreVisibility ? "" : `AND visibility = '${DatabaseRowVisibility.ACTIVE}'`
		const sql = `SELECT *
                     FROM ${this.tableName}
                     WHERE id = ? ${visibility}`


		// @ts-ignore
		const [rows] = await this.pool.query<T[]>(sql, [id])
		console.log("Record retrieved successfully", JSON.stringify(rows))

		if (rows.length === 0) {
			console.warn("No record found")
			return
		}
		if (rows.length > 1) {
			console.warn("More than one record found")
			return
		}

		const entity = new this.constructorFn(rows[0])

		// get related props using @BindEntity
		await this.referencedProps(entity, MySQLDatabaseOperator, options)


		return entity
	}

	/**
	 * Read a record from the database by a key
	 * @param key The key to search by
	 * @param value The value to search for
	 * @param options Options for the operation
	 */
	async readByKey(key: keyof T, value: string, options?: QueryOperatorOptions): Promise<T[]> {
		if (!this.constructorFn) return []

		// visibility check
		const visibility: string = options?.ignoreVisibility ? "" : `AND visibility = '${DatabaseRowVisibility.ACTIVE}'`
		// count check
		const count = options?.count ?? OPERATOR_OPTION_COUNT
		const field = key.toString()
		const results: T[] = []

		const sql = `SELECT *
                     FROM ${this.tableName}
                     WHERE ${field} = ? ${visibility} ${options?.count ? "LIMIT " + count : ""}`


		// @ts-ignore
		const [rows] = await this.pool.query<T[]>(sql, [value])
		console.log("Records retrieved successfully", JSON.stringify(rows))

		for (const element of rows) {
			if (!this.constructorFn) break
			const entity = new this.constructorFn(element)
			await this.referencedProps(entity, MySQLDatabaseOperator, options)
			results.push(entity)
		}
		return results
	}

	/**
	 * Read all records from the database
	 * @param options Options for the operation
	 */
	async readAll(options?: QueryOperatorOptions): Promise<T[]> {
		if (!this.constructorFn) return []

		// visibility check
		const visibility: string = options?.ignoreVisibility ? "" : `WHERE visibility = '${DatabaseRowVisibility.ACTIVE}'`

		// count check
		const count: number = options?.count ?? OPERATOR_OPTION_COUNT
		const results: T[] = []

		const sql = `SELECT *
                     FROM ${this.tableName} ${visibility} ${options?.count ? "LIMIT " + count : ""}`


		// @ts-ignore
		const [rows] = await this.pool.query<T[]>(sql)
		console.log("Records retrieved successfully", JSON.stringify(rows))

		for (const element of rows) {
			if (!this.constructorFn) break
			const entity = new this.constructorFn(element)
			await this.referencedProps(entity, MySQLDatabaseOperator, options)
			results.push(entity)
		}
		return results

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


		const [rows] = await this.pool.query<ResultSetHeader>(sql, [data, data.id])
		console.log("Record updated successfully", JSON.stringify(rows))
		return rows

	}

	/**
	 * Merge a record in the database
	 * @param id The id of the record to be merged
	 * @param key The key to merge
	 * @param value The value to merge
	 */
	async merge<K extends keyof T>(id: string, key: K, value: T[K]): Promise<ResultSetHeader | undefined> {
		if (!this.constructorFn) return

		const sql = `UPDATE ${this.tableName}
                     SET ${key as string} = ?
                     WHERE id = ?`


		const [rows] = await this.pool.query<ResultSetHeader>(sql, [value, id])
		console.log("Record merged successfully", JSON.stringify(rows))
		return rows
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


		const [rows] = await this.pool.query<ResultSetHeader>(sql, [id])
		console.log("Record deleted successfully", JSON.stringify(rows))
		return rows
	}

	/**
	 * Soft delete a record from the database
	 * @param id The id of the record to be soft deleted
	 */
	async softDelete(id: string): Promise<ResultSetHeader | undefined> {
		return this.merge(id, "visibility", DatabaseRowVisibility.DELETED)
	}
}