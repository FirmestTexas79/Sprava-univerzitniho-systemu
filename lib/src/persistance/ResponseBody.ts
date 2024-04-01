export interface ResponseBody<T = undefined> {
	message: string
	code: number
	description?: string
	data?: T
}