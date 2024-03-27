import {Router} from "express"
import {deleteUser, getUsers, postUser} from "../controllers/user"


export const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.post("/",postUser)
// userRouter.get("/:id",getUserById)
// userRouter.put("/:id",putUser)
userRouter.delete("/:id",deleteUser)