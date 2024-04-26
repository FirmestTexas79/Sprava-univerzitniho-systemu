import { createContext, ReactNode, useEffect, useState } from "react";
import { UserApi } from "../services/UserApi.ts";
import { User } from "@prisma/client";
import { UserToken } from "../../../lib/src/persistance/user-token.ts";


type AuthContextType = {
  user: User | null
  login: (token: UserToken) => void
  token: UserToken | null
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<UserToken | null>(null);

  const login = (token: UserToken) => {
    setToken(token);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!token) return;
    const api = new UserApi(token.token);
    api.getMe().then((data) => {
      if (!data.data) return;

      data.data.birthdate = new Date(data.data.birthdate);
      console.log(data.data);
      setUser(data.data);
    });

  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>{
      children
    }</AuthContext.Provider>
  );


}
