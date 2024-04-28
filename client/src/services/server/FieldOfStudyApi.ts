import { Api } from "./Api.ts";
import { RoutePath } from "../../../../lib/src/persistance/RoutePath.ts";
import { FieldOfStudy, FieldOfStudyTypes } from "@prisma/client";
import { z } from "zod";
import { ResponseData } from "../../../../lib/src/persistance/response-data.ts";
import axios from "../../api/axios.ts";

const createFieldOfStudyForm = z.object({
  name: z.string().min(2),
  description: z.string().nullish(),
  type: z.nativeEnum(FieldOfStudyTypes).nullish(),
  duration: z.number().min(1),
});

const updateFieldOfStudyForm = z.object({
  name: z.string().min(2).nullish(),
  description: z.string().nullish(),
  type: z.nativeEnum(FieldOfStudyTypes).nullish(),
  duration: z.number().min(1).nullish(),
});

export type CreateFieldOfStudyForm = z.infer<typeof createFieldOfStudyForm>;

export type UpdateFieldOfStudyForm = z.infer<typeof updateFieldOfStudyForm>;

export class FieldOfStudyApi extends Api<FieldOfStudy, CreateFieldOfStudyForm, UpdateFieldOfStudyForm> {
  constructor(token: string | null = null) {
    super(token, RoutePath.FIELD_OF_STUDY, {
      create: createFieldOfStudyForm,
      update: updateFieldOfStudyForm,
    });
  }

  /**
   * Get field of study by subject id
   * @param subjectId Subject id
   */
  async getFieldOfStudiesBySubjectId(subjectId: string) {
    const { data } = await axios.get<any, { data: ResponseData<FieldOfStudy[]> }>(this.path + "by-subject/" + subjectId, this.config);
    return data;
  }
}
