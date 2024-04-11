import {createContext, ReactNode, useEffect, useState} from "react"
import {User} from "../../../lib/src/models/user/User.ts"
import {useNavigate} from "react-router-dom"
import {valueOf} from "axios"


type AuthContextType = {
	user:User | null
	login:(userData:User) => void
	logout:() => void
}

type AuthProviderProps = {
	children:ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:AuthProviderProps){
	const [user, setUser] = useState<User | null>(null)
	const navigate = useNavigate()

	const login = (userData:User) => {
		console.log(userData)
		if(userData.id)
			localStorage.setItem("user", userData.id)
		setUser(userData)
	}

	const logout = () => {
		console.log("Vypadni a už se nevracej")
		setUser(null)
		localStorage.removeItem("user")
	}

	useEffect(() => {
		if(!user){
			navigate("login")
		}
	}, [user])

	return (
		<AuthContext.Provider value={{user,login,logout}}>{
			children
		}</AuthContext.Provider>
	)


}