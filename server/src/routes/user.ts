import {Router} from "express"
// @ts-ignore
import {User} from "../../../lib"

export const userRouter = Router()

userRouter.get("/",(req, res)=>{
	const users:User[] = [{name:"Pepega",email:"pipa@gmail.com",birthday:"1.1.1999"},{name:"Leprouch",email:"lol@gmail.com"}]
	res.status(200).json(users)
})