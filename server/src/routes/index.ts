import express from "express"
import {userRouter} from "./user"

export const routes = express.Router()


// Main route (default)
routes.get("/",(req, res)=>{
	res.status(200).json({message: "Ready to listen"})
})
// Add user to possible routes
routes.use("/users",userRouter)