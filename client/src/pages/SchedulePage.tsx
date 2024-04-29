import { Page } from "../components/Page.tsx";
import { Scheduler } from "@aldabil/react-scheduler";
import { useAuth } from "../hooks/useAuth.tsx";
import { useEffect, useState } from "react";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { SubjectApi } from "../services/server/SubjectApi.ts";
import { makeRoomLabel, makeSubjectLabel, stringToColor } from "../services/utils.ts";
import { Room, Schedule, Subject } from "@prisma/client";
import dayjs from "dayjs";
import { Time } from "../../../lib/src/utils/Time.ts";
import { Typography } from "@mui/material";
import { ArrayUtils } from "../../../lib/src/utils/ArrayUtils.ts";
import { RoomApi } from "../services/server/RoomApi.ts";

export function SchedulePage() {
  const {
    userSchedules,
    token,
  } = useAuth();
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const range: Date[] = [new Date("2023-09-01"), new Date("2024-06-30")];

  useEffect(() => {
    if (!userSchedules) return;
    if (!token) return;

    const api = new SubjectApi(token.token);
    api.getSubjectsByIds(userSchedules.map((schedule: Schedule) => schedule.subjectId)).then((value) => {
      if (value.data) {

        let newEvents: ProcessedEvent[] = [];
        for (let i = 0; Time.isDateInRange(new Date(new Date().setHours(i * 24)), range); i = i + 7) {
          userSchedules.forEach((schedule: Schedule) => {
            const find = value.data?.find((subject: Subject) => subject.id === schedule.subjectId);
            const label = makeSubjectLabel(find);
            const scheduleDay: number = schedule.day ?? 0;

            newEvents.push({
              event_id: schedule.id,
              title: label,
              start: dayjs(schedule.startTime).add(scheduleDay, "day").add(i,"day").toDate(),
              end: dayjs(schedule.endTime).add(scheduleDay, "day").add(i,"day").toDate(),
              color: stringToColor(find?.name ?? ""),
              info: { subject: find , schedule: schedule },
            } as unknown as ProcessedEvent);
          });
        }


        const roomsIds = ArrayUtils.allVariantsOfKeyArray(userSchedules, "roomId") as string[];
        const roomApi = new RoomApi(token.token);

        roomApi.getRoomsByIds(roomsIds).then((value) => {
          if (value.data) {
            setRooms(value.data);
          }
        });

        setEvents(newEvents);
      }
    });
  }, [userSchedules]);

  return (
    <Page>
      <Scheduler
        agenda={false}
        editable={false}
        deletable={false}
        hourFormat={"24"}
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
        events={events}
        viewerExtraComponent={(_fields, event) => {
          if (event.info) {
            const info = event.info as { subject: Subject, schedule: Schedule };
            return (
              <div>
                <Typography variant="h6">{info.subject.name}</Typography>
                <Typography>{info.subject.description}</Typography>
                <Typography>{info.subject.department}</Typography>
                <Typography>{makeRoomLabel(rooms.find((room: Room) => room.id === info.schedule.roomId))}</Typography>
              </div>
            );
          } else {
            return null;
          }
        }}
      />
    </Page>
  );
}
