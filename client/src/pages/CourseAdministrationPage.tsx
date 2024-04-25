import { useEffect, useState } from "react";
import "../styles/SpravaKurzu.css";
import { Subject } from "../../../lib/src/models/Subject";
import { MenuItem, Select } from "@mui/material";
import { User } from "../../../lib/src/models/user/User.ts";

export default function CourseAdministrationPage() {
  const [messeges, setMesseges] = useState<Partial<Record<keyof any, string>>>({});

  const [teachers, setTeachers] = useState<User[]>([]);

  const [subject, setSubject] = useState<Subject>();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {

  }, []);


  async function onSubmit() {
    try {
      if (!subject) {
        return;
      }
      const data = {};
      if (data === 200) {
        setSubjects([...subjects, subject]);
        setSubject({});
      }


    } catch (error) {
      // @ts-ignore
      setMesseges(error);
    }
  }

  function onChange(key: keyof Subject, value: any) {
    setSubject({ ...subject, [key]: value });
  }


  return (
    <div className="sprava-kurzu-container">
      <h2>Správa Kurzů</h2>
      <input type="text" placeholder="Nazev" value={subject?.name}
             onChange={e => onChange("name", e.target.value)} />
      <input type="text" placeholder="Zkratka" value={subject?.short}
             onChange={e => onChange("short", e.target.value)} />
      <input type="number" placeholder="Kredity" value={subject?.credits}
             onChange={e => onChange("credits", parseInt(e.target.value))} />
      <input type="text" placeholder="Kategorie" value={subject?.category}
             onChange={e => onChange("category", e.target.value)} />
      <input type="text" placeholder="Katedra" value={subject?.department}
             onChange={e => onChange("department", e.target.value)} />
      <textarea placeholder="Popis" value={subject?.description}
                onChange={e => onChange("description", e.target.value)} />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={subject?.guarantor}
        label="Garant"
        onChange={(e) => onChange("guarantor", e.target.value)}
      >
        {teachers.map((teacher) => <MenuItem key={teacher.id}
                                             value={teacher.id}>{`${teacher.firstname} ${teacher.lastname}`}</MenuItem>)}
      </Select>


      <button onClick={onSubmit}>
        Odeslat
      </button>
      <div className="kurzy-list">
        {subjects && subjects.map((subject) => (
          <div key={subject.id} className="kurz">
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
