import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FieldOfStudyTypes } from "@prisma/client";

export class CreateFieldOfStudyDto {
  @ApiProperty({
    required: true,
    example: FieldOfStudyTypes.BACHELOR,
  })
  @IsNotEmpty()
  @IsEnum(FieldOfStudyTypes)
  @IsString()
  type: FieldOfStudyTypes;

  @ApiProperty({
    required: true,
    example: 3,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  duration: number;

  @ApiProperty({
    required: false,
    example: "Some desc",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: true,
    example: "Math",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
