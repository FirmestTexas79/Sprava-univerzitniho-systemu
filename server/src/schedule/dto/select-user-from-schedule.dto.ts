import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SelectUserFromScheduleDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  scheduleId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
