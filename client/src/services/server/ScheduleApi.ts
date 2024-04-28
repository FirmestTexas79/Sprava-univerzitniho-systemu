import { Api } from "./Api.ts";
import { Schedule } from "@prisma/client";
import { RoutePath } from "../../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";
import axios from "../../api/axios.ts";
import { ResponseData } from "../../../../lib/src/persistance/response-data.ts";

const createScheduleForm = z.object({
  subjectId: z.string().cuid(),
  teacherId: z.string().cuid(),
  roomId: z.string().cuid().nullish(),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
  day: z.number().int().min(0).max(6).nullish(),
});

const updateScheduleForm = z.object({
  subjectId: z.string().cuid().nullish(),
  teacherId: z.string().cuid().nullish(),
  roomId: z.string().cuid().nullish(),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
  day: z.number().int().min(0).max(6).nullish(),
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

  /**
   * Get schedules by subject id
   * @param subjectId Subject id
   */
  async getSchedulesBySubjectId(subjectId: string) {
    const { data } = await axios.get<any, {
      data: ResponseData<Schedule[]>
    }>(this.path + "by-subject/" + subjectId, this.config);
    return data;
  }
}
