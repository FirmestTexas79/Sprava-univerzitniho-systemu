import {Router} from "express"
import {postForgotPassword, postLogin, postLogout, postRegister, postResetPassword} from "../controllers/auth"

export const authRouter = Router()

authRouter.post("/login",postLogin)
authRouter.post("/logout",postLogout)
authRouter.post("/register",postRegister)
authRouter.post("/forgot-password",postForgotPassword)
authRouter.post("/reset-password",postResetPassword)