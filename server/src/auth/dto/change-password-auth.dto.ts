import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ChangePasswordAuthDto {
  @ApiProperty({ required: true, example: "Password123", minLength: 8 })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ required: true, example: "Password1234", minLength: 8 })
  @IsString()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ required: true, example: "Password1234", minLength: 8 })
  @IsString()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
  @IsNotEmpty()
  confirmPassword: string;
}
