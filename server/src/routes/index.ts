import express from "express"
import {userRouter} from "./user"
import {redirectDocumentation} from "../controllers/swaggerDoc"
import {authRouter} from "./auth"
import {activityRouter} from "./activity"
import {roomRouter} from "./room"
import {ratingRouter} from "./rating"
import {examRouter} from "./exam"
import {subjectRouter} from "./subject"

export const routes = express.Router()


// Main route (default)
routes.get("/",redirectDocumentation)
// Add user to possible routes
routes.use("/users",userRouter)
// Add authentication to possible routes
routes.use("/auth",authRouter)
// Add activities to possible routes
routes.use("/activities",activityRouter)

routes.use("/rooms",roomRouter)

routes.use("/ratings",ratingRouter)

routes.use("/exams",examRouter)

routes.use("/subjects",subjectRouter)