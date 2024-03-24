import express from "express"
import {userRouter} from "./user"
import {redirectDocumentation} from "../controllers/swaggerDoc"

export const routes = express.Router()


// Main route (default)
routes.get("/",redirectDocumentation)
// Add user to possible routes
routes.use("/users",userRouter)