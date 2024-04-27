import { Api } from "./Api.ts";
import { RoutePath } from "../../../../lib/src/persistance/RoutePath.ts";
import { FieldOfStudy, FieldOfStudyTypes } from "@prisma/client";
import { z } from "zod";

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
}
