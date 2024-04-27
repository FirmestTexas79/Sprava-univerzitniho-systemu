import { Api } from "./Api.ts";
import { Exam, ExamTypes } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const createExamForm = z.object({
  capacity: z.number().min(1),
  description: z.string().nullish(),
  end: z.date(),
  start: z.date(),
  score: z.number().nullish(),
  subjectId: z.string().cuid(),
  roomId: z.string().cuid().nullish(),
  teacherId: z.string().cuid(),
  type: z.nativeEnum(ExamTypes).nullish(),
});

export type CreateExamForm = z.infer<typeof createExamForm>;

const updateExamForm = z.object({
  capacity: z.number().min(1).nullish(),
  description: z.string().nullish(),
  end: z.date().nullish(),
  start: z.date().nullish(),
  score: z.number().nullish(),
  subjectId: z.string().cuid().nullish(),
  roomId: z.string().cuid().nullish(),
  teacherId: z.string().cuid().nullish(),
  type: z.nativeEnum(ExamTypes).nullish(),
});

export type UpdateExamForm = z.infer<typeof updateExamForm>;

export class ExamApi extends Api<Exam, CreateExamForm, UpdateExamForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.EXAM, {
      create: createExamForm,
      update: updateExamForm,
    });
  }
}
