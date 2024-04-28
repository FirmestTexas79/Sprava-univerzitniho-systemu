import { Page } from "../../components/Page.tsx";
import { useEffect, useState } from "react";
import { Subject, User, UserRoles } from "@prisma/client";
import { useAuth } from "../../hooks/useAuth.tsx";
import { CreateSubjectForm, SubjectApi } from "../../services/server/SubjectApi.ts";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";
import { Button } from "@mui/material";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { makeUserLabel } from "../../services/utils.ts";
import { UserApi } from "../../services/server/UserApi.ts";
import { z } from "zod";
import { AxiosError } from "axios";

const emptySubjectForm = {
  category: "",
  credits: 0,
  department: "",
  description: "",
  guarantorId: "",
  name: "",
  shortName: "",
};

export default function SubjectsPage() {
  const {
    token,
    user,
  } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<CreateSubjectForm>({} as CreateSubjectForm);
  const [info, setInfo] = useState<string>();
  const [errors, setErrors] = useState<Map<string | number, string>>();

  useEffect(() => {
    if (user?.role === UserRoles.STUDENT) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const api = new SubjectApi(token?.token);

    api.findAll({
      sortBy: "name",
      sortOrder: SortType.ASC,
    }).then((value) => {
      if (value.data) {
        setSubjects(value.data);
      }
    });
  }, []);

  function onChange(key: keyof CreateSubjectForm, value?: any) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  function getUserOptions() {
    if (!token) return;

    const api = new UserApi(token.token);
    api.teacherWithoutGuarantorSubject().then((value) => {
      if (value.data) {
        setUsers(value.data);
      }
    });
  }

  async function onSubmit() {
    const api = new SubjectApi(token?.token);
    try {
      console.log(form);
      const response = await api.create(form as unknown as CreateSubjectForm);

      if (response.data) {
        setForm(emptySubjectForm as unknown as CreateSubjectForm);
        setSubjects([...subjects, response.data])
      }
    } catch (error: any) {
      console.error(error);
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

  return (
    <Page>
      <h1>Předměty</h1>
      <table>
        <thead>
        <tr>
          <th>Katedra</th>
          <th>Název</th>
          <th>Zkratka</th>
          <th>Kategorie</th>
          <th>Kredity</th>
        </tr>
        </thead>
        <tbody>
        {subjects.map((subject) => (
          <tr key={subject.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/subject/${subject.id}`)}>
            <td>{subject.department}</td>
            <td>{subject.name}</td>
            <td>{subject.shortName}</td>
            <td>{subject.category}</td>
            <td>{subject.credits}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {user?.role === UserRoles.ADMIN && (<>
        <h2>Vytvoření předmětu</h2>
        <TextInput
          error={errors?.has("department")}
          helperText={errors?.get("department")}
          onChange={(value) => onChange("department", value)}
          label="Katedra"
          value={form.department} />
        <TextInput
          error={errors?.has("name")}
          helperText={errors?.get("name")}
          onChange={(value) => onChange("name", value)}
          label="Název"
          value={form.name} />
        <TextInput
          error={errors?.has("shortName")}
          helperText={errors?.get("shortName")}
          onChange={(value) => onChange("shortName", value)}
          label="Zkratka"
          value={form.shortName} />
        <SelectInput
          options={users.map((g) => ({
            value: g.id,
            label: makeUserLabel(g),
          }))}
          onOpen={() => getUserOptions()}
          error={errors?.has("guarantorId")}
          helperText={errors?.get("guarantorId")}
          onChange={(value) => onChange("guarantorId", value)}
          label="Garant"
          value={form.guarantorId} />
        <TextInput
          error={errors?.has("category")}
          helperText={errors?.get("category")}
          onChange={(value) => onChange("category", value)}
          label="Kategorie"
          value={form.category} />
        <NumberInput
          error={errors?.has("credits")}
          helperText={errors?.get("credits")}
          onChange={(value) => onChange("credits", value)}
          label="Kredity"
          value={form.credits} />
        <TextAreaInput
          error={errors?.has("description")}
          helperText={errors?.get("description")}
          label="Popis"
          value={form?.description}
          onChange={(value) => onChange("description", value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}
        >Vytvořit předmět
        </Button>
      </>)}
    </Page>
  );
}
