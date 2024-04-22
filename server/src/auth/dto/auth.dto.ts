import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({ required: true, example: "bobdoe@domain.com" })
  @IsString()
  @IsNotEmpty()
  email: string;
}
