export class CreateScheduleDto {
  studentId: string;
  subjectId: string;
  teacherId: string;
  roomId?: string;
  startTime?: Date;
  endTime?: Date;
}
