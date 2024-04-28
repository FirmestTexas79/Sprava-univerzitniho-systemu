import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
  const { token } = useAuth();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!token) return;
    if (!value) return;

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
      }
    });
  }, [value]);

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
            <tr key={schedule.id}>
              <td>{Time.formatDay(schedule.day)}</td>
              <td>{Time.formatTimeRange(schedule.startTime, schedule.endTime)}</td>
              <td style={{ cursor: schedule.roomId ? "pointer" : "default" }}
                  onClick={() => schedule.roomId && navigate(`room/${schedule.roomId}`)}>{rooms.find((room) => room.id === schedule.roomId)?.name}</td>
              <td style={{ cursor: schedule.teacherId ? "pointer" : "default" }}
                  onClick={() => schedule.teacherId && navigate(`room/${schedule.roomId}`)}>{makeUserLabel(users.find((user) => user.id === schedule.teacherId))}</td>
              <td>{0}/{schedule.roomId ? rooms.find((room) => room.id === schedule.roomId)?.capacity : 0}</td>
              <td style={{ cursor: "pointer" }} onClick={() => {
                onClose();
              }}>Vybrat</td>
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
