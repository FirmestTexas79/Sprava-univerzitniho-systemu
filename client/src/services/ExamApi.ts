import { Api } from "./Api.ts";
import { Exam, ExamTypes } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const examForm = z.object({
  capacity: z.number().min(1),
  description: z.string().optional(),
  end: z.date(),
  start: z.date(),
  score: z.number().optional(),
  subjectId: z.string().cuid2(),
  roomId: z.string().cuid2().optional(),
  teacherId: z.string().cuid2(),
  type: z.nativeEnum(ExamTypes).optional(),
});

export type ExamForm = z.infer<typeof examForm>;

export class ExamApi extends Api<Exam, ExamForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.EXAM);
  }
}
