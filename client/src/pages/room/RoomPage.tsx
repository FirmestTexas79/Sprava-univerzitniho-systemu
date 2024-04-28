import { Page } from "../../components/Page.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Room, UserRoles } from "@prisma/client";
import { useAuth } from "../../hooks/useAuth.tsx";
import { RoomApi, UpdateRoomForm } from "../../services/server/RoomApi.ts";
import { z } from "zod";
import { AxiosError } from "axios";
import { Box, Button, Typography } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { NumberInput } from "../../components/inputs/NumberInput.tsx";
import { SelectInput } from "../../components/inputs/SelectInput.tsx";
import { ROOM_TYPES_OPTIONS } from "../../services/utils.ts";
import { TextAreaInput } from "../../components/inputs/TextAreaInput.tsx";

export function RoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room>();
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

    const api = new RoomApi(token.token);
    api.findOne(id).then((value) => {
      if (value.data) {
        setRoom(value.data);
      }
    }).catch(() => navigate(-1));
  }, []);

  function onChange(key: keyof Room, value: any) {
    setRoom({
      ...room,
      [key]: value,
    });
  }

  function onSubmit() {
    if (!token) return;

    const api = new RoomApi(token.token);
    api.update(room?.id!, { ...room } as UpdateRoomForm).then((response) => {
      if (response.data) {
        setRoom(response.data);
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
      {user?.role === UserRoles.ADMIN ? (<Box>
        <Typography variant="h4">Místnost</Typography>
        <TextInput
          error={errors?.has("name")}
          helperText={errors?.get("name")}
          label="Název"
          value={room?.name}
          onChange={(value) => onChange("name", value)}
        />
        <SelectInput
          error={errors?.has("type")}
          helperText={errors?.get("type")}
          label="Typ"
          value={room?.type}
          options={ROOM_TYPES_OPTIONS}
          onChange={(value) => onChange("type", value)}
        />
        <NumberInput
          error={errors?.has("floor")}
          helperText={errors?.get("floor")}
          label="Patro"
          min={0}
          value={room?.floor}
          onChange={(value) => onChange("floor", value)}
        />
        <NumberInput
          error={errors?.has("capacity")}
          helperText={errors?.get("capacity")}
          label="Kapacita"
          min={1}
          value={room?.capacity}
          onChange={(value) => onChange("capacity", value)}
        />
        <TextAreaInput
          error={errors?.has("description")}
          helperText={errors?.get("description")}
          label="Popis"
          value={room?.description}
          onChange={(value) => onChange("description", value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}>Uložit</Button>
      </Box>) : (<Box>
        <Typography variant="h4">Místnost</Typography>
        <Typography variant="h6">ID: {room?.id}</Typography>
        <Typography variant="h6">Název: {room?.name}</Typography>
        <Typography variant="h6">Typ: {room?.type}</Typography>
        <Typography variant="h6">Patro: {room?.floor}</Typography>
        <Typography variant="h6">Kapacita: {room?.capacity}</Typography>
        <Typography variant="h6">Popis: {room?.description}</Typography>
      </Box>)}
    </Page>
  );
}
