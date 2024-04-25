import { ExamTypes } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateExamDto {
  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({ required: false, example: "This is a description" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true, type: Date })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  end: Date;

  @ApiProperty({ required: true, example: "Exam name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsOptional()
  roomId?: string;

  @ApiProperty({ required: false, example: 5 })
  @IsNumber()
  @IsOptional()
  score?: number;

  @ApiProperty({ required: true, type: Date })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start: Date;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty({ required: true, enum: ExamTypes, example: ExamTypes.EXAM })
  @IsNotEmpty()
  @IsString()
  type: ExamTypes;
}
