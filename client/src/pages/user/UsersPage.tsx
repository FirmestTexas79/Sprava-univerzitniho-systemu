import { Page } from "../../components/Page.tsx";
import { Button } from "@mui/material";
import { UserApi } from "../../services/server/UserApi.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useState } from "react";
import { FieldOfStudy, User, UserRoles, Visibility } from "@prisma/client";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { useNavigate } from "react-router-dom";
import { DateInput } from "../../components/inputs/DateInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { Option, SelectInput } from "../../components/inputs/SelectInput.tsx";
import { SEX_OPTIONS, USER_ROLES_OPTIONS } from "../../services/utils.ts";
import { AuthApi, RegisterForm } from "../../services/server/AuthApi.ts";
import { z } from "zod";
import { AxiosError } from "axios";
import { FieldOfStudyApi } from "../../services/server/FieldOfStudyApi.ts";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";

const emptyUserForm = {
  birthdate: new Date(),
  email: "",
  fieldOfStudyId: null,
  firstname: "",
  lastname: "",
  phone: "",
  role: null,
  sex: null,
  titleAfter: null,
  titleBefore: null,
  year: null,
};

export function UsersPage() {
  const {
    token,
    user,
  } = useAuth();
  const [form, setForm] = useState<RegisterForm>({} as RegisterForm);
  const [filter, setFilter] = useState<{ key: keyof User, value: any }[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<FieldOfStudy[]>([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [info, setInfo] = useState<string>();

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

  async function createUser() {
    const api = new AuthApi(token?.token);
    try {
      console.log(form);
      const response = await api.register(form as unknown as RegisterForm);

      if (response.data) {
        setForm(emptyUserForm as unknown as RegisterForm);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = new Map<string | number, string>();
        error.errors.forEach((err) => {
          const field = err.path[0];
          fieldErrors.set(field, err.message);
        });
        setErrors(fieldErrors);
      } else if (error instanceof AxiosError) {
        setInfo(error.response?.data.message);
      }
    }
  }

  function onChangeFilter(key: keyof User, value?: any) {

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

  function onChangeForm(key: keyof User, value?: any) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  function filterUser(value: User) {
    if (user?.role === UserRoles.ADMIN) return true;
    return value.visibility === Visibility.VISIBLE;
  }

  async function getFieldOfStudyOptions() {
    if (loaded) return;

    try {
      const api = new FieldOfStudyApi(token?.token);
      const { data } = await api.findAll({
        sortBy: "name",
        sortOrder: SortType.ASC,
        filterBy: "visibility",
        filterValue: Visibility.VISIBLE,
      });
      data && setFieldOfStudy(data);
      setLoaded(true);
    } catch (error: any) {
      setInfo(error?.message);
    }
  }

  return (
      <Page>
        <div className="page-container">
          <div className="form-container">
            <div className="search-container">
              <h1>Vyhledávání uživatelů</h1>
              <div className="input-container">
                <TextInput onChange={(value) => onChangeFilter("email", value)} label="Email"/>
                <TextInput onChange={(value) => onChangeFilter("firstname", value)} label="Jméno"/>
                <TextInput onChange={(value) => onChangeFilter("lastname", value)} label="Příjmení"/>
              </div>
            <div className="button-container">
              <Button
                  variant="contained"
                  fullWidth
                  onClick={search}>Vyhledat uživatele</Button>
            </div>
          </div>
          </div>
          {users.length > 0 && (
              <div className="results-container">
                <h2>Výsledky vyhledávání</h2>
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
                      <tr key={usr.id} style={{cursor: "pointer"}} onClick={() => navigate(`/user/${usr.id}`)}>
                        <td>{usr.email}</td>
                        <td>{usr.firstname}</td>
                        <td>{usr.lastname}</td>
                        <td>{usr.role}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}

          {user?.role === UserRoles.ADMIN && (<>
            <h2>Zaregistrovat uživatele</h2>
            {info && <p>{info}</p>}
            <TextInput
                value={form.email}
                onChange={(value) => onChangeForm("email", value)}
                label="Email"
                error={errors?.has("email")}
                helperText={errors?.get("email")}/>
            <TextInput
                value={form.firstname}
                onChange={(value) => onChangeForm("firstname", value)}
                label="Jméno"
                error={errors?.has("firstname")}
                helperText={errors?.get("firstname")}/>
            <TextInput
                value={form.lastname}
                onChange={(value) => onChangeForm("lastname", value)}
                label="Příjmení"
                error={errors?.has("lastname")}
                helperText={errors?.get("lastname")}/>
            <TextInput
                value={form.titleAfter}
                onChange={(value) => onChangeForm("titleAfter", value)}
                label="Titul za"
                error={errors?.has("titleAfter")}
                helperText={errors?.get("titleAfter")}/>
            <TextInput
                value={form.titleBefore}
                onChange={(value) => onChangeForm("titleBefore", value)}
                label="Titul před"
                error={errors?.has("titleBefore")}
                helperText={errors?.get("titleBefore")}/>
            <TextInput
                value={form.phone}
                onChange={(value) => onChangeForm("phone", value)}
                placeholder={"+420775485242"}
                label="Telefon" error={errors?.has("phone")}
                helperText={errors?.get("phone")}/>
            <DateInput
                disableFuture
                onChange={(value) => onChangeForm("birthdate", value)}
                value={form.birthdate}
                label="Datum narození" error={errors?.has("birthdate")}
                helperText={errors?.get("birthdate")}/>
            <SelectInput
                options={SEX_OPTIONS}
                value={form.sex}
                onChange={(value) => onChangeForm("sex", value)}
                label="Pohlaví"
                error={errors?.has("sex")}
                helperText={errors?.get("sex")}/>
            <SelectInput
                options={USER_ROLES_OPTIONS}
                value={form?.role}
                onChange={(value) => {
                  onChangeForm("role", value);
                }}
                label="Role" error={errors?.has("role")}
                helperText={errors?.get("role")}/>
            {form.role === UserRoles.STUDENT && (<>
              <SelectInput
                  options={fieldOfStudy?.map((value) => ({
                    label: value.name + " - " + value.type,
                    value: value.id,
                  } as Option<string>)) || []}
                  onChange={(value) => onChangeForm("fieldOfStudyId", value)}
                  onOpen={() => getFieldOfStudyOptions()}
                  value={form.fieldOfStudyId}
                  label="Obor"
                  error={errors?.has("fieldOfStudyId")}
                  helperText={errors?.get("fieldOfStudyId")}/>
              <NumberInput
                  min={1}
                  max={4}
                  onChange={(value) => onChangeForm("year", value)}
                  value={form.year || 1}
                  label="Ročník"
                  error={errors?.has("year")}
                  helperText={errors?.get("year")}/></>)}
            <Button
                variant="contained"
                fullWidth
                onClick={createUser}>Vytvořit uživatele</Button></>)}
        </div>
      </Page>
);
}
