import { Api } from "./Api.ts";
import { Subject } from "@prisma/client";
import { RoutePath } from "../../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";
import axios from "../../api/axios.ts";
import { ResponseData } from "../../../../lib/src/persistance/response-data.ts";

const createSubjectForm = z.object({
  category: z.string(),
  credits: z.number().min(1),
  department: z.string(),
  description: z.string().nullish(),
  guarantorId: z.string().cuid(),
  name: z.string().min(2),
  shortName: z.string().min(2),
});

const updateSubjectForm = z.object({
  category: z.string().nullish(),
  credits: z.number().min(1).nullish(),
  department: z.string().nullish(),
  description: z.string().nullish(),
  guarantorId: z.string().cuid().nullish(),
  name: z.string().min(2).nullish(),
  shortName: z.string().min(2).nullish(),
});

export type UpdateSubjectForm = z.infer<typeof updateSubjectForm>;

export type CreateSubjectForm = z.infer<typeof createSubjectForm>;

export class SubjectApi extends Api<Subject, CreateSubjectForm, UpdateSubjectForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.SUBJECT, {
      create: createSubjectForm,
      update: updateSubjectForm,
    });
  }

  async getSubjectsByIds(array: string[]) {
    const { data } = await axios.post<any, {
      data: ResponseData<Subject[]>
    }>(this.path + "by-ids", { ids: array }, this.config);
    return data;
  }
}
