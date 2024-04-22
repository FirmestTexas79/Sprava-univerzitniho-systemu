import { AuthDto } from "./auth.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto extends PartialType(AuthDto) {
  @ApiProperty({ required: true, example: "Password123", minLength: 8 })
  @IsString()
  @IsNotEmpty()
  password: string;
}
