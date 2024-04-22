import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdateUserDto {
  @ApiProperty({ required: true, example: "bobdoe@domain.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false, example: "Bob" })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty({ required: false, example: "Doe" })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthdate?: Date;
}
