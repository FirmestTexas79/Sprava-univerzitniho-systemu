import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AuthDto } from "./auth.dto";
import { IsDate, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Sex, UserRoles } from "@prisma/client";

export class RegisterAuthDto extends PartialType(AuthDto) {
  @ApiProperty({
    required: true,
    example: "Bob",
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    required: true,
    example: "Doe",
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    required: true,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty({
    required: false,
    type: Number,
    default: 1,
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  year?: number;

  @ApiProperty({
    required: false,
    example: "Ing.",
  })
  @IsString()
  @IsOptional()
  titleAfter?: string;

  @ApiProperty({
    required: false,
    example: "Ph.D.",
  })
  @IsString()
  @IsOptional()
  titleBefore?: string;

  @ApiProperty({
    required: false,
    example: "+420123456789",
  })
  @IsMobilePhone(undefined, { strictMode: true })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    required: true,
    enum: Sex,
    example: Sex.MALE,
  })
  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @ApiProperty({
    required: true,
    enum: UserRoles,
    example: UserRoles.STUDENT,
    default: UserRoles.STUDENT,
  })
  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: UserRoles;

  @ApiProperty({
    required: false,
    example: "clvbj80ip0000cgc4lkus3lyh",
  })
  @IsString()
  @IsOptional()
  fieldOfStudyId: string;
}
