import cors from "cors"
import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerOutput from "./swagger_output.json"
import ip from "ip"
import {routes} from "./routes"
import {connection} from "./config/database"
// loading environments variables from .env
require("dotenv").config()


//setup for port server
export const PORT = process.env.SERVER_PORT || 3002
//setup for framework(express)
const app = express()
//setup cors (privileges)
app.use(cors({
	origin: "*"
}))
// setup body parser
app.use(express.json())
//setup swagger documentation with end points(api)
app.use("/api.docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))


connection.connect((error) => {
	if (error) {
		console.error("error connecting to database: ", error)
		return
	}
	console.log("connected to database")
})

/*connection.query("SELECT * FROM student", (error,results) =>{
    if (error) {
        console.error("error executing query: ",error)
        return
    }
    console.log("Data from students: ", results)
})*/


/*connection.end((error) => {
    if (error) {
        console.error("error closing connection: ",error)
        return
    }
    console.log("connection to database closed")
})*/

app.use("/", routes)

app.listen(PORT, () => {
	console.log(`Server is running on : ${ip.address()}:${PORT}`)
})

