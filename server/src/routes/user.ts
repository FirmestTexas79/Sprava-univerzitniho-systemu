import {Router} from "express"
import {User} from "../../../lib/src/lib"
import {getUsers} from "../controllers/user"


export const userRouter = Router()

userRouter.get("/", getUsers)