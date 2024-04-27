import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFieldOfStudyDto } from "./create-field-of-study.dto";
import { FieldOfStudyTypes } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateFieldOfStudyDto extends PartialType(CreateFieldOfStudyDto) {
  @ApiProperty({
    required: false,
    example: FieldOfStudyTypes.BACHELOR,
  })
  @IsOptional()
  @IsEnum(FieldOfStudyTypes)
  @IsString()
  type?: FieldOfStudyTypes;

  @ApiProperty({
    required: false,
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  duration?: number;

  @ApiProperty({
    required: false,
    example: "Some desc",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    example: "Math",
  })
  @IsOptional()
  @IsString()
  name?: string;
}
