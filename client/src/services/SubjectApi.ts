import { Api } from "./Api.ts";
import { Subject } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const subjectForm = z.object({
  category: z.string(),
  credits: z.number().min(1),
  department: z.string(),
  description: z.string().optional(),
  guarantorId: z.string().cuid2(),
  name: z.string().min(2),
  shortName: z.string().min(2),
});

export type SubjectForm = z.infer<typeof subjectForm>;

export class SubjectApi extends Api<Subject, SubjectForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.SUBJECT);
  }
}
