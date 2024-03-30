import { Options } from "nodemailer/lib/mailer"
import { SentMessageInfo } from "nodemailer"
import dotenv from "dotenv"
import {transporter} from "../../config/nodemailer"

dotenv.config()

/**
 * Send a password reset email
 * @param email The email address of the user
 * @param resetLink The link to reset the password
 * @param callback The callback function
 */
export async function sendPasswordResetEmail(email: string, resetLink: string, callback: (err: (Error | null), info: SentMessageInfo) => void): Promise<void> {
	const APP_NAME = process.env.APP_NAME

	// Configure the email
	const mailOptions = {
		from: APP_NAME,
		to: email,
		subject: `${APP_NAME}: Password Reset Request`,
		html: `You requested a password reset. Click on the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`
	} as Options

	// Send the email
	transporter.sendMail(mailOptions, callback)
}