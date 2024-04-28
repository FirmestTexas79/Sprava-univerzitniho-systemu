import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateSubjectDto {
  @ApiProperty({
    required: true,
    example: "BIE-SWE",
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    required: true,
    example: 5,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  credits: number;

  @ApiProperty({
    required: true,
    example: "BIE",
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    required: false,
    example: "This is a description",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: true,
    example: "clvbj80ip0000cgc4lkus3lyh",
  })
  @IsString()
  @IsNotEmpty()
  guarantorId: string;

  @ApiProperty({
    required: true,
    example: "Subject name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: "SN",
  })
  @IsString()
  @IsNotEmpty()
  shortName: string;

  @ApiProperty({
    required: false,
    type: String,
    example: ["clvbj80ip0000cgc4lkus3lyh"],
  })
  @IsArray()
  @IsOptional()
  teachers?: string[];

  @ApiProperty({
    required: false,
    type: String,
    example: ["clvbj80ip0000cgc4lkus3lyh"],
  })
  @IsArray()
  @IsOptional()
  fieldOfStudies?: string[];
}
