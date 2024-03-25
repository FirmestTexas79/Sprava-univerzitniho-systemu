// setup for database connection
import {createConnection} from "mysql2"
import {createPool} from "mysql2/promise"

// loading environments variables from .env
require("dotenv").config()
export const DATABASE_CONFIG = {
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE

}
export const pool = createPool(DATABASE_CONFIG)

export const connection = createConnection(DATABASE_CONFIG)