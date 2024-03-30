import dotenv from "dotenv"
import {createTransport} from "nodemailer"

dotenv.config()

export const transporter = createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD
	}
})