import { useAuth } from "../hooks/useAuth.tsx";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FieldOfStudy, User, UserRoles, Visibility } from "@prisma/client";
import { UpdateUserForm, UserApi } from "../services/server/UserApi.ts";
import { Page } from "../components/Page.tsx";
import { TextInput } from "../components/inputs/TextInput.tsx";
import { z } from "zod";
import { AxiosError } from "axios";
import { DateInput } from "../components/inputs/DateInput.tsx";
import { Option, SelectInput } from "../components/inputs/SelectInput.tsx";
import { NumberInput } from "../components/inputs/NumberInput.tsx";
import { SEX_OPTIONS, USER_ROLES_OPTIONS } from "../services/utils.ts";
import { FieldOfStudyApi } from "../services/server/FieldOfStudyApi.ts";
import { SortType } from "../../../server/src/utils/sort-type.enum.ts";

export default function UserPage() {
  const { id } = useParams();
  const {
    user,
    setUser,
    token,
  } = useAuth();
  const [currentUser, setCurrentUser] = useState<User>();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [fieldOfStudy, setFieldOfStudy] = useState<FieldOfStudy[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    if (id && id !== user?.id) {
      const api = new UserApi(token.token);
      api.findOne(id).then((value) => {
        if (value.data?.birthdate) {
          value.data.birthdate = new Date(value.data.birthdate);
        }
        if(value.data?.fieldOfStudyId) {
          getFieldOfStudyOptions().catch(console.error)
        }
        setCurrentUser(value.data);
      }).catch(() => navigate("/"));
    } else {
      if (user) {
        setCurrentUser(user);
      }
    }
  }, []);

  async function onSubmit() {
    if (!token) return;

    const api = new UserApi(token.token);
    try {
      const response = await api.update(currentUser?.id!, { ...currentUser } as UpdateUserForm);
      if (response.data) {
        if (response.data?.birthdate) {
          response.data.birthdate = new Date(response.data.birthdate);
        }
        setCurrentUser(response.data);
        if (user?.id === response.data.id) {
          setUser(response.data);
        }
        setInfo(response.message);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = new Map<string | number, string>();
        error.errors.forEach((err: { path: any[]; message: string; }) => {
          const field = err.path[0];
          fieldErrors.set(field, err.message);
        });
        setErrors(fieldErrors);
      } else if (error instanceof AxiosError) {
        setInfo(error.response?.data.message);
      }
    }
  }

  function onChange(key: keyof User, value: any) {
    console.log(key, value);
    setCurrentUser({
      ...currentUser,
      [key]: value,
    } as User);
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

  return (<Page>
    <Container maxWidth="sm">
      {user?.role !== UserRoles.ADMIN ? (<Box>
        <Typography variant="h4">User</Typography>
        <Typography variant="h6">ID: {currentUser?.id}</Typography>
        <Typography variant="h6">Email: {currentUser?.email}</Typography>
        <Typography variant="h6">Firstname: {currentUser?.firstname}</Typography>
        <Typography variant="h6">Lastname: {currentUser?.lastname}</Typography>
        <Typography variant="h6">Birthdate: {currentUser?.birthdate.toLocaleDateString()}</Typography>
        <Typography variant="h6">Title after: {currentUser?.titleAfter}</Typography>
        <Typography variant="h6">Title before: {currentUser?.titleBefore}</Typography>
        {user?.role === UserRoles.STUDENT && (<>
          <Typography variant="h6">Phone: {currentUser?.phone}</Typography>
          <Typography variant="h6">Year: {currentUser?.year}</Typography>
        </>)}
        <Typography variant="h6">Field of study: {currentUser?.fieldOfStudyId}</Typography>
        <Typography variant="h6">Sex: {currentUser?.sex}</Typography>
      </Box>) : (<Box>
        <Typography variant="h4">User</Typography>
        <Typography variant="h6">ID: {currentUser?.id}</Typography>
        <TextInput
          onChange={(value) => onChange("email", value)}
          error={errors?.has("email")}
          helperText={errors?.get("email")}
          type={"email"}
          value={currentUser?.email}
          label="Email" />
        <TextInput
          onChange={(value) => onChange("firstname", value)}
          error={errors?.has("firstname")}
          helperText={errors?.get("firstname")}
          value={currentUser?.firstname}
          label="Jméno" />
        <TextInput
          onChange={(value) => onChange("lastname", value)}
          error={errors?.has("lastname")}
          helperText={errors?.get("lastname")}
          value={currentUser?.lastname}
          label="Přijmení" />
        <DateInput
          onChange={(value) => onChange("birthdate", value)}
          error={errors?.has("birthdate")}
          disableFuture
          helperText={errors?.get("birthdate")}
          value={currentUser?.birthdate}
          label="Datum narození" />
        <TextInput
          onChange={(value) => onChange("titleAfter", value)}
          error={errors?.has("titleAfter")}
          helperText={errors?.get("titleAfter")}
          value={currentUser?.titleAfter}
          label="Titul po" />
        <TextInput
          onChange={(value) => onChange("titleBefore", value)}
          error={errors?.has("titleBefore")}
          helperText={errors?.get("titleBefore")}
          value={currentUser?.titleBefore}
          label="Titul před" />
        <TextInput
          onChange={(value) => onChange("phone", value)}
          type={"tel"}
          error={errors?.has("phone")}
          helperText={errors?.get("phone")}
          value={currentUser?.phone}
          label="Telefon" />
        <SelectInput
          options={SEX_OPTIONS}
          onChange={(value) => onChange("sex", value)}
          error={errors?.has("sex")}
          helperText={errors?.get("sex")}
          value={currentUser?.sex}
          label="Pohlaví" />
        <SelectInput
          options={USER_ROLES_OPTIONS}
          onChange={(value) => onChange("role", value)}
          error={errors?.has("role")}
          helperText={errors?.get("role")}
          value={currentUser?.role}
          label="Role" />
        {currentUser?.role === UserRoles.STUDENT && (
          <>
            <NumberInput
              onChange={(value) => onChange("year", value)}
              error={errors?.has("year")}
              helperText={errors?.get("year")}
              value={currentUser?.year}
              label="Ročník" />
            <SelectInput
              options={fieldOfStudy?.map((value) => ({
                label: value.name + " - " + value.type,
                value: value.id,
              } as Option<string>)) || []}
              onOpen={() => getFieldOfStudyOptions()}
              onChange={(value) => onChange("fieldOfStudyId", value)}
              error={errors?.has("fieldOfStudyId")}
              helperText={errors?.get("fieldOfStudyId")}
              value={currentUser?.fieldOfStudyId}
              label="Obor" />
          </>
        )}
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}>Uložit</Button>
      </Box>)}
    </Container>
  </Page>);
}
