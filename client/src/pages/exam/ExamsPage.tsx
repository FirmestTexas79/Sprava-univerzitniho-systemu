import { Page } from "../../components/Page.tsx";
import { useEffect, useState } from "react";
import { Exam, Subject } from "@prisma/client";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import { ExamApi } from "../../services/server/ExamApi.ts";
import { Time } from "../../../../lib/src/utils/Time.ts";
import { ArrayUtils } from "../../../../lib/src/utils/ArrayUtils.ts";
import { SubjectApi } from "../../services/server/SubjectApi.ts";

export function ExamsPage() {
  const { token } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

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
        getSubjects(subjectIds)
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

  return (
    <Page>
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
              <td>{exam.teacherId}</td>
            </tr>
          ))}
          </tbody>
        </table>))}
    </Page>
  );
}
