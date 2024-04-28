import { Page } from "../../components/Page.tsx";
import { Room, UserRoles } from "@prisma/client";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { ROOM_TYPES_OPTIONS } from "../../services/utils.ts";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateRoomForm, RoomApi } from "../../services/server/RoomApi.ts";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { AxiosError } from "axios";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";
import { z } from "zod";

export default function RoomsPage() {
  const {
    token,
    user,
  } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [form, setForm] = useState<CreateRoomForm>({} as CreateRoomForm);
  const [info, setInfo] = useState<string>();
  const [errors, setErrors] = useState<Map<string | number, string>>();

  useEffect(() => {
    if (!token) return;

    const api = new RoomApi(token.token);

    api.findAll({
      sortBy: "name",
      sortOrder: SortType.ASC,
    }).then((value) => {
      if (value.data) {
        setRooms(value.data);
      }
    });
  }, []);

  function onChange(key: keyof CreateRoomForm, value: any) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  async function onSubmit() {
    if (!token) return;

    const api = new RoomApi(token.token);
    try {
      const response = await api.create({ ...form });
      if (response.data) {
        setInfo("Místnost byla vytvořena");
        setRooms([...rooms, response.data]);
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

  return (
    <Page>
      <h1>Místnosti</h1>
      <table>
        <thead>
        <tr>
          <th>Název</th>
          <th>Typ</th>
          <th>Patro</th>
          <th>Kapacita</th>
        </tr>
        </thead>
        <tbody>
        {rooms.map((r) => (
          <tr key={r.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/room/${r.id}`)}>
            <td>{r.name}</td>
            <td>{r.type}</td>
            <td>{r.floor}</td>
            <td>{r.capacity}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {user?.role === UserRoles.ADMIN && (<>
        <h2>Vytvoření předmětu</h2>
        <TextInput
          error={errors?.has("name")}
          helperText={errors?.get("name")}
          onChange={(value) => onChange("name", value)}
          label="Název"
          value={form.name} />
        <SelectInput
          error={errors?.has("type")}
          helperText={errors?.get("type")}
          onChange={(value) => onChange("type", value)}
          label="Typ"
          value={form.type}
          options={ROOM_TYPES_OPTIONS} />
        <NumberInput
          error={errors?.has("floor")}
          helperText={errors?.get("floor")}
          onChange={(value) => onChange("floor", value)}
          min={0}
          label="Patro"
          value={form.floor} />
        <NumberInput
          error={errors?.has("capacity")}
          helperText={errors?.get("capacity")}
          onChange={(value) => onChange("capacity", value)}
          min={0}
          label="Kapacita"
          value={form.capacity} />
        <TextAreaInput
          error={errors?.has("description")}
          helperText={errors?.get("description")}
          onChange={(value) => onChange("description", value)}
          label="Popis"
          value={form.description} />
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}
        >Vytvořit místnost
        </Button>
      </>)}
    </Page>
  );
}
