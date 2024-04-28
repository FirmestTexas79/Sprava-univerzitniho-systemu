import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";

export class MultiFilterUserDto {
  @ApiProperty({
    required: true,
    example: [
      {
        key: "email",
        value: "test@test.com",
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  filter: { key: keyof User; value: any }[];
}
