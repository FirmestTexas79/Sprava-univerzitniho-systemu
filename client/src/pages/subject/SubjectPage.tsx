import { Page } from "../../components/Page.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FieldOfStudy, User, UserRoles } from "@prisma/client";
import { SubjectApi, UpdateSubjectForm } from "../../services/server/SubjectApi.ts";
import { Box, Button, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { UserApi } from "../../services/server/UserApi.ts";
import { AxiosError } from "axios";
import { z } from "zod";
import { makeFieldOfStudiesLabel, makeUserLabel } from "../../services/utils.ts";
import { FieldOfStudyApi } from "../../services/server/FieldOfStudyApi.ts";

export function SubjectPage() {
  const { id } = useParams();
  const [subject, setSubject] = useState<UpdateSubjectForm>();
  const [users, setUsers] = useState<User[]>([]);
  const [fieldOfStudies, setFieldOfStudies] = useState<FieldOfStudy[]>([]);
  const [info, setInfo] = useState<string>();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const {
    token,
    user,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    if (!token) return;

    const api = new SubjectApi(token.token);
    api.findOne(id).then((value) => {
      console.debug(value)
      if (value.data) {
          const userApi = new UserApi(token.token);
          userApi.getUsersBySubjectId(value.data.id).then((val) => {
            console.debug(val)
            if (val.data) {
              setUsers(val.data);
            }
          });

          const fieldOfStudyApi = new FieldOfStudyApi(token.token);
          fieldOfStudyApi.getFieldOfStudiesBySubjectId(value.data.id).then((val) => {
            console.debug(val)
            if (val.data) {
              setFieldOfStudies(val.data);
            }
          });
        setSubject(value.data);
      }
    }).catch(() => navigate(-1));
  }, []);

  function onChange<T extends UpdateSubjectForm,K extends keyof T>(key: T, value: T[K]) {
    console.debug(key, value);
    setSubject({
      ...subject,
      [key]: value,
    });
  }

  function getUserOptions() {
    if (!token) return;

    const api = new UserApi(token.token);
    api.findAll({
      filterBy: "role",
      filterValue: UserRoles.TEACHER,
    }).then((value) => {
      if (value.data) {
        setUsers(value.data);
      }
    });
  }

  function getFieldOfStudiesOptions() {
    if (!token) return;

    const api = new FieldOfStudyApi(token.token);
    api.findAll({
      sortBy: "name",
      sortOrder: "asc",
    }).then((value) => {
      if (value.data) {
        setFieldOfStudies(value.data);
      }
    });
  }

  function onSubmit() {
    if (!token) return;
    if (!subject) return;

    const api = new SubjectApi(token.token);
    api.update(subject?.id, { ...subject } as UpdateSubjectForm).then((response) => {
      if (response.data) {
        setSubject(response.data);
      }
    }).catch((error: any) => {
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
    });
  }

  return (
    <Page>
      {user?.role === UserRoles.ADMIN || user?.id === subject?.guarantorId ? (<Box>
        <Typography variant="h4">Předmět</Typography>
        <TextInput
          error={errors?.has("name")}
          helperText={errors?.get("name")}
          label="Název"
          value={subject?.name}
          onChange={(value) => onChange("name", value)}
        />
        <TextInput
          error={errors?.has("shortName")}
          helperText={errors?.get("shortName")}
          label="Zkratka"
          value={subject?.shortName}
          onChange={(value) => onChange("shortName", value)}
        />
        <TextInput
          error={errors?.has("category")}
          helperText={errors?.get("category")}
          label="Kategorie"
          value={subject?.category}
          onChange={(value) => onChange("category", value)}
        />
        <NumberInput
          error={errors?.has("credits")}
          helperText={errors?.get("credits")}
          label="Kredity"
          value={subject?.credits}
          onChange={(value) => onChange("credits", value)}
        />
        <SelectInput
          disabled={user?.role !== UserRoles.ADMIN}
          options={users.map((g) => ({
            value: g.id,
            label: makeUserLabel(g),
          }))}
          error={errors?.has("guarantorId")}
          helperText={errors?.get("guarantorId")}
          onOpen={() => getUserOptions()}
          label="Garant"
          value={subject?.guarantorId}
          onChange={(value) => setSubject({
            ...subject,
            guarantorId: value,
            teachers: [value],
          })}
        />
        <SelectInput
          options={users.filter(value => value.role === UserRoles.TEACHER).map((g) => ({
            value: g.id,
            label: makeUserLabel(g),
          }))}
          onOpen={() => getUserOptions()}
          error={errors?.has("teachers")}
          lockedOptions={[subject?.guarantorId]}
          helperText={errors?.get("teachers")}
          onChange={(value) => onChange("teachers", value)}
          label="Vyučující"
          value={subject?.teachers ?? []}
        />
        <SelectInput
          options={fieldOfStudies.map((g) => ({
            value: g.id,
            label: makeFieldOfStudiesLabel(g),
          }))}
          onOpen={() => getFieldOfStudiesOptions()}
          error={errors?.has("fieldOfStudies")}
          helperText={errors?.get("fieldOfStudies")}
          onChange={(value) => onChange("fieldOfStudies", value)}
          label="Obory"
          value={subject?.fieldOfStudies ?? []}
        />
        <TextInput
          error={errors?.has("department")}
          helperText={errors?.get("department")}
          label="Katedra"
          value={subject?.department}
          onChange={(value) => onChange("department", value)}
        />
        <TextAreaInput
          error={errors?.has("description")}
          helperText={errors?.get("description")}
          label="Popis"
          value={subject?.description}
          onChange={(value) => onChange("description", value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}>Uložit</Button>
      </Box>) : (<Box>
        <Typography variant="h4">Předmět</Typography>
        <Typography variant="h6">ID: {subject?.id}</Typography>
        <Typography variant="h6">Název: {subject?.name}</Typography>
        <Typography variant="h6">Zkratka: {subject?.shortName}</Typography>
        <Typography variant="h6">Kategorie: {subject?.category}</Typography>
        <Typography variant="h6">Kredity: {subject?.credits}</Typography>
        <Typography
          variant="h6">Garant: {makeUserLabel(users.find((user) => user.id === subject?.guarantorId))}</Typography>
        <Typography variant="h6">Katedra: {subject?.department}</Typography>
        <Typography variant="h6">Popis: {subject?.description}</Typography>
        <Typography
          variant="h6">Vyučující: {users.map((value) => makeUserLabel(value)).join(", ")}</Typography>
        <Typography
          variant="h6">Obory: {fieldOfStudies.map((value) => makeFieldOfStudiesLabel(value)).join(", ")}</Typography>
      </Box>)}
    </Page>
  );
}
