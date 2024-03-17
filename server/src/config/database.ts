// setup for database connection
import {createConnection} from "mysql2"

// loading environments variables from .env
require("dotenv").config()

export const connection = createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE

})