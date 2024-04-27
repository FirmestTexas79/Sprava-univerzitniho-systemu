import { Page } from "../components/Page.tsx";
import { Button } from "@mui/material";
import { UserApi } from "../services/server/UserApi.ts";
import { useAuth } from "../hooks/useAuth.tsx";
import { useState } from "react";
import { User, UserRoles, Visibility } from "@prisma/client";
import { TextInput } from "../components/inputs/TextInput.tsx";
import { useNavigate } from "react-router-dom";

export function UsersPage() {
  const {
    token,
    user,
  } = useAuth();
  const [filter, setFilter] = useState<{ key: keyof User, value: any }[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  async function search() {
    if (filter.length === 0) return;

    const api = new UserApi(token?.token);
    api.multiFilter(filter).then((value) => {
      if (value.data) {
        value.data.forEach((user) => {
          user.birthdate = new Date(user.birthdate);
        });

        setUsers(value.data);
        setFilter([]);
      }
    });
  }

  function onChangeFilter(key: keyof User, value?: any) {
    if (!value) return;

    const f = filter.find((f) => f.key === key);
    if (f) {
      f.value = value;
    } else {
      filter.push({
        key,
        value,
      });
    }
  }

  function filterUser(value: User) {
    if (user?.role === UserRoles.ADMIN) return true;
    return value.visibility === Visibility.VISIBLE;
  }

  return (
    <Page>
      <h1>Uživatelé</h1>
      <TextInput onChange={(value) => onChangeFilter("email", value)} label="Email" />
      <TextInput onChange={(value) => onChangeFilter("firstname", value)} label="Jméno" />
      <TextInput onChange={(value) => onChangeFilter("lastname", value)} label="Příjmení" />
      <Button onClick={search}>Vyhledat uživatele</Button>
      <table>
        <thead>
        <tr>
          <th>Email</th>
          <th>Jméno</th>
          <th>Příjmení</th>
          <th>Role</th>
        </tr>
        </thead>
        <tbody>
        {users.filter(filterUser).map((usr) => (
          <tr key={usr.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/user/${usr.id}`)}>
            <td>{usr.email}</td>
            <td>{usr.firstname}</td>
            <td>{usr.lastname}</td>
            <td>{usr.role}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Page>
  );
}
