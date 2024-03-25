// Library for functions,interface in one place
export interface User {
    firstname: string,
    lastname: string,
    titleAfter?: string,
    titleBefore?: string,
    email: string,
    phone?: string,
    birthday?: string,
    image?: Blob,
    role?: string
}
export interface UserPassword extends User{
    password: string
}