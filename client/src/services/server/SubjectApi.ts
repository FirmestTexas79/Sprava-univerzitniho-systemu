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
  teachers: z.array(z.string().cuid()).nullish(),
  fieldOfStudies: z.array(z.string().cuid()).nullish(),
});

const updateSubjectForm = z.object({
  category: z.string().nullish(),
  credits: z.number().min(1).nullish(),
  department: z.string().nullish(),
  description: z.string().nullish(),
  guarantorId: z.string().cuid().nullish(),
  name: z.string().min(2).nullish(),
  shortName: z.string().min(2).nullish(),
  teachers: z.array(z.string().cuid()),
  fieldOfStudies: z.array(z.string().cuid()),
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

  /**
   * Get subjects by field of study
   * @param array Array of field of study ids
   */
  async getSubjectsByIds(array: string[]) {
    const { data } = await axios.post<any, {
      data: ResponseData<Subject[]>
    }>(this.path + "by-ids", { ids: array }, this.config);
    return data;
  }

  /**
   * Get subjects by field of study
   * @param fieldOfStudyId Field of study id
   */
  async getSubjectsByFieldOfStudy(fieldOfStudyId: string) {
    const { data } = await axios.get<any, {
      data: ResponseData<Subject[]>
    }>(this.path + "by-field-of-study/" + fieldOfStudyId, this.config);
    return data;
  }
}
