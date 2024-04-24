import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Rating } from "@prisma/client";
import { CreateRatingDto, UpdateRatingDto } from "./dto";
import { RatingService } from "./rating.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Rating")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("rating")
export class RatingController implements RestController<Rating, CreateRatingDto, UpdateRatingDto> {
  constructor(private ratingService: RatingService) {}

  @Post()
  async create(@Body() dto: object): Promise<ResponseData<Rating>> {
    return this.ratingService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.ratingService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Rating>): Promise<ResponseData<Rating[]>> {
    return this.ratingService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<Rating>> {
    return this.ratingService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.ratingService.softDelete(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: object): Promise<ResponseData<Rating>> {
    return this.ratingService.update(id, dto);
  }
}
