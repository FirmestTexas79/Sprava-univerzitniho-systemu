import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { UserApi } from "../services/server/UserApi.ts";
import { Schedule, User } from "@prisma/client";
import { UserToken } from "../../../lib/src/persistance/user-token.ts";

type AuthContextType = {
  user: User | null
  setUser: (user: User) => void
  userSchedules: Schedule[]
  setUserSchedules: (schedules: Schedule[]) => void
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
  const [userSchedules, setUserSchedules] = useState<Schedule[]>([]);

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

      document.title = `${data.data.role} ${data.data.firstname} ${data.data.lastname}`;
      setUser(data.data);
    });

    api.getSchedules().then((data) => {
      if (!data.data) return;

      data.data.forEach((schedule) => {
        if (schedule.startTime) schedule.startTime = new Date(schedule.startTime);
        if (schedule.endTime) schedule.endTime = new Date(schedule.endTime);
      });
      setUserSchedules(data.data);
    });

  }, [token]);

  const value = useMemo(() => ({
    user,
    setUser,
    login,
    logout,
    token,
    userSchedules,
    setUserSchedules
  }), [user, token, userSchedules]);

  return (
    <AuthContext.Provider value={value}>{
      children
    }</AuthContext.Provider>
  );

}
