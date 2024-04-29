import { Page } from "../../components/Page.tsx";
import { useEffect, useState } from "react";
import { FieldOfStudy, Subject, User, UserRoles } from "@prisma/client";
import { useAuth } from "../../hooks/useAuth.tsx";
import { CreateSubjectForm, SubjectApi } from "../../services/server/SubjectApi.ts";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";
import { Button } from "@mui/material";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { makeFieldOfStudiesLabel, makeUserLabel } from "../../services/utils.ts";
import { UserApi } from "../../services/server/UserApi.ts";
import { z } from "zod";
import { AxiosError } from "axios";
import { FieldOfStudyApi } from "../../services/server/FieldOfStudyApi.ts";
import { SelectSessionSubjectDialog } from "../../components/dialog/SelectSessionSubjectDialog.tsx";

const emptySubjectForm = {
  category: "",
  credits: 0,
  department: "",
  description: "",
  guarantorId: "",
  name: "",
  shortName: "",
  teachers: [],
  fieldOfStudies: [],
};

export default function SubjectsPage() {
  const {
    token,
    user,
  } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [fieldOfStudies, setFieldOfStudies] = useState<FieldOfStudy[]>([]);
  const [form, setForm] = useState<CreateSubjectForm>({} as CreateSubjectForm);
  const [info, setInfo] = useState<string>();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [dialog, setDialog] = useState(false);
  const [selectSubject, setSelectSubject] = useState<Subject>();

  useEffect(() => {
    const api = new SubjectApi(token?.token);

    if (user?.role === UserRoles.ADMIN || UserRoles.STUDENT || UserRoles.TEACHER)  {
      api.findAll({
        sortBy: "name",
        sortOrder: SortType.ASC,
      }).then((value) => {
        if (value.data) {
          setSubjects(value.data);
        }
      });
    }
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
    /* api.teacherWithoutGuarantorSubject().then((value) => {
      if (value.data) {
        setUsers(value.data);
      }
    }); */
    api.findAll({
      sortBy: "firstname",
      sortOrder: SortType.ASC,
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
      sortOrder: SortType.ASC,
    }).then((value) => {
      if (value.data) {
        setFieldOfStudies(value.data);
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
        setSubjects([...subjects, response.data]);
      }
    } catch (error: any) {
      console.error(error);
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

  function openDialog() {
    setDialog(true);
  }

  function closeDialog() {
    setDialog(false);
  }

  return (
    <Page>
      <div className="page-container">
      <h1>Předměty</h1>
      <table>
        <thead>
        <tr>
          <th>Katedra</th>
          <th>Název</th>
          <th>Zkratka</th>
          <th>Kategorie</th>
          <th>Kredity</th>
          <th>Detail</th>
          {user?.role === UserRoles.STUDENT && <th>Termíny</th>}
        </tr>
        </thead>
        <tbody>
        {subjects.map((subject) => (
            <tr key={subject.id}
                style={{backgroundColor: subject.guarantorId === user?.id ? "rgba(255,255,255,0.2)" : "default"}}>
              <td>{subject.department}</td>
              <td>{subject.name}</td>
              <td>{subject.shortName}</td>
              <td>{subject.category}</td>
              <td>{subject.credits}</td>
              <td style={{cursor: "pointer"}} onClick={() => navigate(`/subject/${subject.id}`)}>Otevřít</td>
              {user?.role === UserRoles.STUDENT && <td style={{cursor: "pointer"}} onClick={() => {
                setSelectSubject(subject);
                openDialog();
              }}>Vybrat</td>}
            </tr>
        ))}
        </tbody>
      </table>
          {user?.role === UserRoles.ADMIN && (<>
            <div className="form-container">
              <h2>Vytvoření předmětu</h2>
              <div className="input-container">
                <TextInput
                    error={errors?.has("department")}
                    helperText={errors?.get("department")}
                    onChange={(value) => onChange("department", value)}
                    label="Katedra"
                    value={form.department}/>
              </div>
              <div className="input-container">
                <TextInput
                    error={errors?.has("name")}
                    helperText={errors?.get("name")}
                    onChange={(value) => onChange("name", value)}
                    label="Název"
                    value={form.name}/>
              </div>
              <div className="input-container">
                <TextInput
                    error={errors?.has("shortName")}
                    helperText={errors?.get("shortName")}
                    onChange={(value) => onChange("shortName", value)}
                    label="Zkratka"
                    value={form.shortName}/>
              </div>
              <div className="input-container">
                <SelectInput
                    options={users.filter(value => value.role === UserRoles.TEACHER).map((g) => ({
                      value: g.id,
                      label: makeUserLabel(g),
                    }))}
                    onOpen={() => getUserOptions()}
                    error={errors?.has("guarantorId")}
                    helperText={errors?.get("guarantorId")}
                    onChange={(value) =>
                        setForm({
                          ...form,
                          guarantorId: value,
                          teachers: [value],
                        })
                    }
                    label="Garant"
                    value={form.guarantorId}/>
              </div>
              <div className="input-container">
                <SelectInput
                    options={users.filter(value => value.role === UserRoles.TEACHER).map((g) => ({
                      value: g.id,
                      label: makeUserLabel(g),
                    }))}
                    onOpen={() => getUserOptions()}
                    error={errors?.has("teachers")}
                    lockedOptions={[form.guarantorId]}
                    helperText={errors?.get("teachers")}
                    onChange={(value) => onChange("teachers", value)}
                    label="Vyučující"
                    value={form.teachers ?? []}
                />
              </div>
              <div className="input-container">
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
                    value={form.fieldOfStudies ?? []}
                />
              </div>
              <div className="input-container">
                <TextInput
                    error={errors?.has("category")}
                    helperText={errors?.get("category")}
                    onChange={(value) => onChange("category", value)}
                    label="Kategorie"
                    value={form.category}/>
              </div>
              <div className="input-container">
                <NumberInput
                    error={errors?.has("credits")}
                    helperText={errors?.get("credits")}
                    onChange={(value) => onChange("credits", value)}
                    label="Kredity"
                    value={form.credits}/>
              </div>
              <div className="input-container">
                <TextAreaInput
                    error={errors?.has("description")}
                    helperText={errors?.get("description")}
                    label="Popis"
                    value={form?.description}
                    onChange={(value) => onChange("description", value)}
                />
              </div>
              <div className="button-container">
                <Button
                    variant="contained"
                    fullWidth
                    onClick={onSubmit}
                >Vytvořit předmět
                </Button>
              </div>
            </div>
          </>)}
        <SelectSessionSubjectDialog value={selectSubject} open={dialog} onClose={closeDialog}/>
      </div>
    </Page>
  );
}
