import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class ScheduleCountsDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
