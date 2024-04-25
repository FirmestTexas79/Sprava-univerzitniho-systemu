import { Api } from "./Api.ts";
import { Schedule } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const scheduleForm = z.object({
  studentId: z.string().cuid2(),
  subjectId: z.string().cuid2(),
  teacherId: z.string().cuid2(),
  roomId: z.string().cuid2().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
});

export type ScheduleForm = z.infer<typeof scheduleForm>;

export class ScheduleApi extends Api<Schedule, ScheduleForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.SCHEDULE);
  }
}
