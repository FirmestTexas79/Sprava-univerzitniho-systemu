import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class GetUsersByIdsDto {
  @ApiProperty({
    required: true,
    example: ["e8b1c7c3-0d8e-4b9d-8c3d-3f2f4f9e4f2d", "e8b1c7c3-0d8e-4b9d-8c3d-3f2f4f9e4f2d"],
  })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
