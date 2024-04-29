import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Room, Schedule, Subject, User } from "@prisma/client";
import { makeSubjectLabel, makeUserLabel } from "../../services/utils.ts";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.tsx";
import { ScheduleApi } from "../../services/server/ScheduleApi.ts";
import { Time } from "../../../../lib/src/utils/Time.ts";
import { ArrayUtils } from "../../../../lib/src/utils/ArrayUtils.ts";
import { RoomApi } from "../../services/server/RoomApi.ts";
import { UserApi } from "../../services/server/UserApi.ts";
import { useNavigate } from "react-router-dom";

interface SelectSessionSubjectDialogProps {
  open: boolean;
  onClose: () => void;
  value?: Subject;
}

export function SelectSessionSubjectDialog({
                                             open,
                                             onClose,
                                             value,
                                           }: SelectSessionSubjectDialogProps) {
  const {
    token,
    userSchedules,
    user,
    setUserSchedules,
  } = useAuth();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [counts, setCounts] = useState<Map<string, number>>(new Map<string, number>());
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!token) return;
    if (!value) return;

    console.debug(userSchedules);

    const api = new ScheduleApi(token.token);
    api.getSchedulesBySubjectId(value?.id).then((value) => {
      if (value.data) {
        value.data.forEach((schedule) => {
          if (schedule.startTime) schedule.startTime = new Date(schedule.startTime);
          if (schedule.endTime) schedule.endTime = new Date(schedule.endTime);
        });
        setSchedules(value.data);

        const roomIds = ArrayUtils.allVariantsOfKeyArray(value.data, "roomId") as string[];
        getRooms(roomIds);

        const teacherIds = ArrayUtils.allVariantsOfKeyArray(value.data, "teacherId") as string[];
        getUsers(teacherIds);

        getCounts(value.data.map((schedule) => schedule.id));
      }
    });
  }, [value]);

  function getCounts(array: string[]) {
    if (!token) return;

    const api = new ScheduleApi(token.token);
    api.getCounts(array).then((value) => {
      if (value.data) {
        console.debug(value.data);
        const map = new Map<string, number>();
        value.data.forEach((item) => {
          map.set(item.key, item.value);
        });
        setCounts(map);
      }
    });
  }

  function getRooms(array: string[]) {
    if (!token) return;

    const api = new RoomApi(token.token);
    api.getRoomsByIds(array).then((value) => {
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

  function isFull(schedule: Schedule) {
    return (counts.get(schedule.id) ?? 0) >= (rooms.find((room) => room.id === schedule.roomId)?.capacity ?? 0);
  }

  function isSelectByMe(schedule: Schedule) {
    return !!userSchedules.find((userSchedule) => userSchedule.id === schedule.id);
  }

  function handleSelect(schedule: Schedule) {
    if (!token) return;
    if (!user) return;
    if (isSelectByMe(schedule)) return;

    const api = new ScheduleApi(token.token);

    api.selectUserFromSchedule(schedule.id, user.id).then((value) => {
      if (value.data) {
        if (value.data.startTime) value.data.startTime = new Date(value.data.startTime);
        if (value.data.endTime) value.data.endTime = new Date(value.data.endTime);

        setUserSchedules([...userSchedules, value.data]);

        getCounts(schedules.map((schedule) => schedule.id));
      }
    });
  }

  function handleUnselect(schedule: Schedule) {
    if (!token) return;
    if (!user) return;
    if (!isSelectByMe(schedule)) return;

    const api = new ScheduleApi(token.token);

    api.unselectUserFromSchedule(schedule.id, user.id).then((value) => {
      if (value) {
        setUserSchedules(userSchedules.filter((userSchedule) => userSchedule.id !== schedule.id));

        getCounts(schedules.map((schedule) => schedule.id));
      }
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Předmět {makeSubjectLabel(value)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vyberte rozvrhové akce pro tento předmět.
        </DialogContentText>
        <Typography>Název: {value?.name}</Typography>
        <Typography>Popis: {value?.description}</Typography>
        <Typography variant="h6">Rozvrhové akce</Typography>
        <table>
          <thead>
          <tr>
            <th>Den</th>
            <th>Čas</th>
            <th>Místnost</th>
            <th>Vyučující</th>
            <th>Místo/Kapacita</th>
            <th>Vybrat</th>
          </tr>
          </thead>
          <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} style={{ backgroundColor: isFull(schedule) ? "rgba(255,0,0,0.2)" : "default" }}>
              <td>{Time.formatDay(schedule.day)}</td>
              <td>{Time.formatTimeRange(schedule.startTime, schedule.endTime)}</td>
              <td style={{ cursor: schedule.roomId ? "pointer" : "default" }}
                  onClick={() => schedule.roomId && navigate(`room/${schedule.roomId}`)}>{rooms.find((room) => room.id === schedule.roomId)?.name}</td>
              <td style={{ cursor: schedule.teacherId ? "pointer" : "default" }}
                  onClick={() => schedule?.teacherId && navigate(`room/${schedule.roomId}`)}>{makeUserLabel(users.find((user) => user.id === schedule.teacherId))}</td>
              <td>{counts.get(schedule.id) ?? 0}/{schedule.roomId ? rooms.find((room) => room.id === schedule.roomId)?.capacity : 0}</td>
              <td style={{ cursor: isSelectByMe(schedule) ? "pointer" : isFull(schedule) ? "default" : "pointer" }}
                  onClick={() => {
                    isSelectByMe(schedule) || isFull(schedule) ? handleUnselect(schedule) : handleSelect(schedule);
                  }}>{isSelectByMe(schedule) ? "Odhlásit" : isFull(schedule) ? "Plno" : "Vybrat"}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          onClose();
        }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
