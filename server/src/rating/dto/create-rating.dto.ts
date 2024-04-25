import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRatingDto {
  @ApiProperty({ required: true, example: new Date().toISOString() })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsNotEmpty()
  @IsString()
  examId: string;

  @ApiProperty({ required: true, example: 5 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  rating: number;

  @ApiProperty({ required: true, example: "clvbj80ip0000cgc4lkus3lyh" })
  @IsNotEmpty()
  @IsString()
  studentId: string;
}
