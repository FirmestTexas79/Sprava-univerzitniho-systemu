import ip from "ip"
import {PORT} from "./app"
import swaggerAutogen from "swagger-autogen"

const doc = {
	info: {
		version: process.env.npm_package_version,
		title: "Swagger Docs for University System Project",
		description:
            "This is the documentation for the University System Project API. It contains all the endpoints and their descriptions."
	},
	servers: [
		{
			url: `http://${ip.address()}:${PORT}`,
			description: "Development server"
		}
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer"
			}
		}
	}
}

//import of files
const outputFile = "./swagger_output.json"
const routes = ["./src/routes/index.ts"]
// Generating documentation
swaggerAutogen({openapi:"3.0.0"})(outputFile,routes,doc)