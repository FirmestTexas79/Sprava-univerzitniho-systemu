import { Page } from "../../components/Page.tsx";
import { useEffect, useState } from "react";
import { Exam, Room, Subject, User, UserRoles } from "@prisma/client";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import { CreateExamForm, ExamApi } from "../../services/server/ExamApi.ts";
import { Time } from "../../../../lib/src/utils/Time.ts";
import { ArrayUtils } from "../../../../lib/src/utils/ArrayUtils.ts";
import { SubjectApi } from "../../services/server/SubjectApi.ts";
import { UserApi } from "../../services/server/UserApi.ts";
import { EXAM_TYPES_OPTIONS, makeRoomLabel, makeUserLabel } from "../../services/utils.ts";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { z } from "zod";
import { RoomApi } from "../../services/server/RoomApi.ts";

export function ExamsPage() {
  const {
    token,
    user,
  } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<CreateExamForm>({} as CreateExamForm);
  const [info, setInfo] = useState<string>();
  const [errors, setErrors] = useState<Map<string | number, string>>();

  useEffect(() => {
    if (!token) return;

    const api = new ExamApi(token.token);

    api.findAll({
      sortBy: "name",
      sortOrder: SortType.ASC,
    }).then((value) => {
      if (value.data) {
        value.data.forEach((exam) => {
          exam.start = new Date(exam.start);
          exam.end = new Date(exam.end);
        });
        const subjectIds = ArrayUtils.allVariantsOfKeyArray(value.data, "subjectId") as string[];
        getSubjects(subjectIds);

        const teacherIds = ArrayUtils.allVariantsOfKeyArray(value.data, "teacherId") as string[];
        getUsers(teacherIds);

        setExams(value.data);
      }
    });
  }, []);

  function getSubjects(array: string[]) {
    if (!token) return;

    const api = new SubjectApi(token.token);
    api.getSubjectsByIds(array).then((value) => {
      if (value.data) {
        setSubjects(value.data);
      }
    });
  }

  function getRooms() {
    if (!token) return;

    const api = new RoomApi(token.token);
    api.findAll({
      sortBy: "type",
      sortOrder: SortType.ASC,
    }).then((value) => {
      if (value.data) {
        setRooms(value.data);
      }
    });
  }

  function getUsers(array: string[]) {
    if (!token) return;

    const api = new UserApi(token.token);
    api.getUsersByIds(array).then((value) => {
      if (value.data) {
        setUsers(value.data);
      }
    });
  }

  function getSubjectTeachers(subjectId: string) {
    if (!token) return;

    const api = new UserApi(token.token);
    api.getUsersBySubjectId(subjectId).then((value) => {
      if (value.data) {
        setUsers(ArrayUtils.removeDuplicates([...users, ...value.data], "id"));
      }
    });
  }

  async function onSubmit() {
    if (!token) return;

    const api = new ExamApi(token.token);
    try {
      const response = await api.create({ ...form });
      if (response.data) {
        setInfo("Test byl vytvořen");
        setExams([...exams, response.data]);
      }
    } catch (error) {
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

  function onChange(key: keyof CreateExamForm, value: any) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  return (
      <Page>
        <div className="page-container">
          <h1>Testy</h1>
          {subjects.map((value) => (
              <table key={value.id}>
                <caption>{value.shortName}: {value.name}</caption>
                <thead>
                <tr>
                  <th>Název</th>
                  <th>Popis</th>
                  <th>Typ</th>
                  <th>Čas</th>
                  <th>Maximální kapacita</th>
                  <th>Zkoušející</th>
                </tr>
                </thead>
                <tbody>
                {exams.filter(exam => exam.subjectId === value.id).map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.name}</td>
                      <td>{exam.description}</td>
                      <td>{exam.type}</td>
                      <td>{Time.formatDateTimeRange(exam.start, exam.end)}</td>
                      <td>{exam.capacity}</td>
                      <td>{makeUserLabel(users.find((user) => user.id === exam.teacherId))}</td>
                    </tr>
                ))}
                </tbody>
              </table>))}
          {user?.role !== UserRoles.STUDENT && (<>
            <h2>Vytvořit test</h2>
            <TextInput
                error={errors?.has("name")}
                helperText={errors?.get("name")}
                value={form.name}
                onChange={(value) => onChange("name", value)}
                label="Název"/>
            <SelectInput
                error={errors?.has("type")}
                helperText={errors?.get("type")}
                options={EXAM_TYPES_OPTIONS}
                value={form.type}
                onChange={(value) => onChange("type", value)}
                label="Typ"/>
            <SelectInput
                error={errors?.has("roomId")}
                helperText={errors?.get("roomId")}
                onOpen={getRooms}
                options={rooms.map((value: Room) => ({
                  value: value.id,
                  label: makeRoomLabel(value),
                }))}
                value={form.roomId}
                onChange={(value) => {
                  onChange("roomId", value);
                  onChange("capacity", rooms.find((room) => room.id === value)?.capacity);
                }}
                label="Místnost"/>
            <NumberInput
                error={errors?.has("capacity")}
                helperText={errors?.get("capacity")}
                min={1}
                max={form.roomId ? rooms.find((room) => room.id === form.roomId)?.capacity : 0}
                value={form.capacity}
                onChange={(value) => onChange("capacity", value)}
                label="Maximální kapacita"/>
            <SelectInput
                error={errors?.has("subjectId")}
                helperText={errors?.get("subjectId")}
                options={subjects.map((value) => ({
                  label: `${value.shortName}: ${value.name}`,
                  value: value.id,
                }))}
                value={form.subjectId}
                onChange={(value) => onChange("subjectId", value)}
                label="Předmět"/>
            <SelectInput
                disabled={!form.subjectId}
                error={errors?.has("teacherId")}
                helperText={errors?.get("teacherId")}
                options={users.map((value) => ({
                  label: makeUserLabel(value),
                  value: value.id,
                }))} //TODO: all teachers
                onOpen={() => getSubjectTeachers(form.subjectId)}
                value={form.teacherId}
                onChange={(value) => onChange("teacherId", value)}
                label="Zkoušející"/>
            <TextAreaInput
                error={errors?.has("description")}
                helperText={errors?.get("description")}
                value={form.description}
                onChange={(value) => onChange("description", value)}
                label="Popis"/>
            <Button
                variant="contained"
                onClick={onSubmit}
                fullWidth>Uložit</Button>
          </>)
          }
        </div>
      </Page>
);
}
