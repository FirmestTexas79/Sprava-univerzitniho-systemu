import express from "express"
import {userRouter} from "./user"
import {redirectDocumentation} from "../controllers/swaggerDoc"
import {authRouter} from "./auth"
import {activityRouter} from "./activity"

export const routes = express.Router()


// Main route (default)
routes.get("/",redirectDocumentation)
// Add user to possible routes
routes.use("/users",userRouter)
// Add authentication to possible routes
routes.use("/auth",authRouter)
// Add activities to possible routes
routes.use("/activities",activityRouter)