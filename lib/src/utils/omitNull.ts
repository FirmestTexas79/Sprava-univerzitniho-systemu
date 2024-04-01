/**
 * Omit null values from an object
 * @param object Object to omit null values from it
 * @returns Object without null values
 * @example
 * const object = {a: 1, b: null, c: 3}
 * const newObj = omitNull(object)
 * console.log(newObj) // {a: 1, c: 3}
 */
export function omitNull<T extends Record<string, any>>(object: T): T {
	const newObj: Partial<T> = {}
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key) && object[key] !== null) {
			newObj[key] = object[key]
		}
	}
	return newObj as T
}