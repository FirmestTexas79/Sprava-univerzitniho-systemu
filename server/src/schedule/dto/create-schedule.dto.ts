import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateScheduleDto {
  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsOptional()
  roomId?: string;

  @ApiProperty({ required: true, example: new Date().toISOString() })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startTime?: Date;

  @ApiProperty({ required: true, example: new Date().toISOString() })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endTime?: Date;
}
