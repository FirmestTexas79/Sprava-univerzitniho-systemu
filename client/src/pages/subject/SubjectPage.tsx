import { Page } from "../../components/Page.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Subject, User, UserRoles } from "@prisma/client";
import { SubjectApi, UpdateSubjectForm } from "../../services/server/SubjectApi.ts";
import { Box, Button, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { UserApi } from "../../services/server/UserApi.ts";
import { AxiosError } from "axios";
import { z } from "zod";
import { makeUserLabel } from "../../services/utils.ts";

export function SubjectPage() {
  const { id } = useParams();
  const [subject, setSubject] = useState<Subject>();
  const [users, setUsers] = useState<User[]>([]);
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
      if (value.data) {
        if (value.data?.guarantorId) {
          const guarantorApi = new UserApi(token.token);
          guarantorApi.findOne(value.data.guarantorId).then((value) => {
            if (value.data) {
              setUsers([value.data]);
            }
          });
        }
        setSubject(value.data);
      }
    }).catch(() => navigate(-1));
  }, []);

  function onChange(key: keyof Subject, value: any) {
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

  function onSubmit() {
    if (!token) return;

    const api = new SubjectApi(token.token);
    api.update(subject?.id!, { ...subject } as UpdateSubjectForm).then((response) => {
      if (response.data) {
        setSubject(response.data);
      }
    }).catch((error: any) => {
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
          onChange={(value) => onChange("guarantorId", value)}
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
        <Typography variant="h6">Garant: {subject?.guarantorId}</Typography>
        <Typography variant="h6">Katedra: {subject?.department}</Typography>
        <Typography variant="h6">Popis: {subject?.description}</Typography>
      </Box>)}
    </Page>
  );
}
