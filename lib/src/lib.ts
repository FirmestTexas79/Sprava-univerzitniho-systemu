// Library for functions,interface in one place
export interface User {
    name: string,
    email: string,
    birthday?: string
}
export interface UserPassword extends User{
    password: string
}