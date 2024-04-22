import { ChangePasswordAuthDto } from "./change-password-auth.dto";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordAuthDto extends OmitType(ChangePasswordAuthDto, ["oldPassword"]) {
  @ApiProperty({ required: true, example: "9eae47ee-707c-48bc-9bff-dbc20c7a2683" })
  @IsString()
  @IsNotEmpty()
  token: string;
}
