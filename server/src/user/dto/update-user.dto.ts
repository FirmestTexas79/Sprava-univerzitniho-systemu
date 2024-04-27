import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Sex, UserRoles } from "@prisma/client";

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    example: "bobdoe@domain.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    required: false,
    example: "Bob",
  })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty({
    required: false,
    example: "Doe",
  })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthdate?: Date;

  @ApiProperty({
    required: false,
    example: "clvbj80ip0000cgc4lkus3lyh",
  })
  @IsString()
  @IsOptional()
  fieldOfStudyId?: string;

  @ApiProperty({
    required: false,
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  year?: number;

  @ApiProperty({
    required: true,
    enum: UserRoles,
    example: UserRoles.STUDENT,
    default: UserRoles.STUDENT,
  })
  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRoles;

  @ApiProperty({
    required: true,
    enum: Sex,
    example: Sex.MALE,
  })
  @IsEnum(Sex)
  @IsOptional()
  sex?: Sex;
}
