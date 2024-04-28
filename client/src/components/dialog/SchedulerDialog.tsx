import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { useAuth } from "../../hooks/useAuth.tsx";
import { RoomApi } from "../../services/server/RoomApi.ts";
import { SortType } from "../../../../server/src/utils/sort-type.enum.ts";
import { useEffect, useRef, useState } from "react";
import { Room, Subject, User } from "@prisma/client";
import { makeRoomLabel, makeSubjectLabel, makeUserLabel } from "../../services/utils.ts";
import { UserApi } from "../../services/server/UserApi.ts";
import { ArrayUtils } from "../../../../lib/src/utils/ArrayUtils.ts";
import { SchedulerRef } from "@aldabil/react-scheduler/types";
import { CreateExamForm } from "../../services/server/ExamApi.ts";

interface SchedulerDialogProps {
  open: boolean;
  onClose: () => void;
  label?: string;
  scheduler?: SchedulerProps;
}

interface SchedulerProps {
  view?: "day" | "week" | "month";
  events?: any[];
  editable?: boolean;
}

export function SchedulerDialog({
                                  label,
                                  onClose,
                                  scheduler = {
                                    view: "week",
                                    events: [],
                                    editable: true,
                                  },
                                  open,
                                }: Readonly<SchedulerDialogProps>) {
  const { token } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const calendarRef = useRef<SchedulerRef>(null);

  useEffect(() => {
    logger("REF: ", calendarRef);
  }, [calendarRef]);

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

  function getSubjectTeachers(subjectId: string) {
    if (!token) return;

    const api = new UserApi(token.token);
    api.getUsersBySubjectId(subjectId).then((value) => {
      if (value.data) {
        setUsers(ArrayUtils.removeDuplicates([...users, ...value.data], "id"));
      }
    });
  }

  function getSubjects() {

  }

  function logger(event: any, ...args: any[]) {
    console.debug(new Date().toTimeString(), ": ", event, ...args);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <Scheduler
          view={scheduler?.view}
          ref={calendarRef}
          editable={scheduler?.editable}
          agenda={false}
          events={scheduler?.events}
          day={{
            startHour: 6,
            endHour: 20,
            step: 30,
          }}
          week={{
            startHour: 6,
            endHour: 20,
            step: 30,
            weekStartOn: 1,
          }}
          month={{
            startHour: 6,
            endHour: 20,
            step: 30,
            weekStartOn: 1,
          }}
          hourFormat={24}
          onEventClick={(event) => logger(event)}
          onConfirm={(events) => {
            logger(events);
            logger({
              name: events.title,
              capacity: events.capacity,
              description: events.description,
              end: events.end,
              roomId: events.roomId,
              start: events.start,
              subjectId: events.subjectId,
              teacherId: events.teacherId,
              type: events.type,
            } as CreateExamForm);
          }}
          onEventDrop={(event, droppedOn, updatedEvent, originalEvent) => {
            logger(event, droppedOn, updatedEvent, originalEvent);
            return Promise.resolve(updatedEvent);
          }}
          onEventEdit={(event) => logger(event)}
          resourceFields={{
            idField: "id",
            titleField: "name",
            textField: "name",
            colorField: "color",
          }}
          viewerExtraComponent={(fields, event) => {
            return (<div>
              {fields.map((field, i) => {
                if (field.name === "id") {
                  const admin = field.options?.find((fe) => fe.id === event.id);
                  logger(admin);
                  return (
                    <Typography
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      {"xdddd"}
                    </Typography>
                  );
                } else {
                  return "";
                }
              })}
            </div>)
          }}
          fields={[
            {
              name: "subjectId",
              type: "select",
              default: null,
              options: subjects.map((value) => {
                return ({
                  id: value.id,
                  text: makeSubjectLabel(value),
                  value: value.id,
                });
              }),
              config: {
                label: "Předmět",
                required: false, // true,
              },
            },
            {
              name: "teacherId",
              type: "select",
              default: users[0]?.id || null,
              options: users.map((value) => {
                return ({
                  id: value.id,
                  text: makeUserLabel(value),
                  value: value.id,
                });
              }),
              config: {
                label: "Učitel",
                required: false,// true,
              },
            },
            /* {
              name: "type",
              type: "select",
              default: null,
              options: EXAM_TYPES_OPTIONS.map((value) => {
                return ({
                  id: value.value,
                  text: value.label,
                  value: value.value,
                });
              }),
              config: {
                label: "Typ",
                required: true,
              },
            }, */
            {
              name: "roomId",
              type: "select",
              default: rooms[0]?.id || null,
              options: rooms.map((value) => {
                return ({
                  id: value.id,
                  text: makeRoomLabel(value),
                  value: value.id,
                });
              }),
              config: {
                label: "Místnost",
                required: false,
              },
            },
            {
              name: "capacity",
              type: "input",
              default: rooms[0]?.capacity || 1,
              config: {
                label: "Kapacita",
                required: false,
                min: 1,
                max: rooms[0]?.capacity || 1,
              },
            },
            {
              name: "description",
              type: "input",
              default: "",
              config: {
                label: "Popis",
                required: false,
                multiline: true,
                rows: 4,
              },
            },
          ]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
