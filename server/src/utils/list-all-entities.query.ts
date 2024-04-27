import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { SortType } from "./sort-type.enum";

/**
 * List all entities query
 */
export class ListAllEntitiesQuery<T = object> {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ required: false, enum: SortType, default: SortType.ASC })
  @IsEnum(SortType)
  @IsOptional()
  sortOrder?: SortType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  filterBy?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  filterValue?: string;
}
