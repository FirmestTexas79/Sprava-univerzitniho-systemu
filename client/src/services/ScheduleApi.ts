import { Api } from "./Api.ts";
import { Schedule } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const createScheduleForm = z.object({
  studentId: z.string().cuid(),
  subjectId: z.string().cuid(),
  teacherId: z.string().cuid(),
  roomId: z.string().cuid().nullish(),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
});

const updateScheduleForm = z.object({
  studentId: z.string().cuid().nullish(),
  subjectId: z.string().cuid().nullish(),
  teacherId: z.string().cuid().nullish(),
  roomId: z.string().cuid().nullish(),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
});

export type UpdateScheduleForm = z.infer<typeof updateScheduleForm>;

export type CreateScheduleForm = z.infer<typeof createScheduleForm>;

export class ScheduleApi extends Api<Schedule, CreateScheduleForm, UpdateScheduleForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.SCHEDULE, {
      create: createScheduleForm,
      update: updateScheduleForm,
    });
  }
}
