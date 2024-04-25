import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateActivityDto {
  @ApiProperty({ required: false, example: "This is a description" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true, example: "Activity name" })
  @IsString()
  @IsNotEmpty()
  name: string;
}
