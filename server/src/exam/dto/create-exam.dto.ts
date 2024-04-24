import { ExamTypes } from "@prisma/client";

export class CreateExamDto {
  capacity: number;
  description?: string;
  end: Date;
  name: string;
  roomId?: string;
  score?: number;
  start: Date;
  subjectId: string;
  teacherId: string;
  type: ExamTypes;
}
