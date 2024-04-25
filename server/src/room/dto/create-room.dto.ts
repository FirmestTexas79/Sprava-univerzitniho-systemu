import { RoomTypes } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRoomDto {
  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  capacity: number;

  @ApiProperty({ required: false, example: "This is a description" })
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  floor: number;

  @ApiProperty({ required: true, example: "Room name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: RoomTypes.LECTURE })
  @IsString()
  @IsOptional()
  type?: RoomTypes;
}
