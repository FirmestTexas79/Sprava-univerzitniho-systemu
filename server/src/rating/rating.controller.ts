import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Rating } from "@prisma/client";
import { CreateRatingDto, UpdateRatingDto } from "./dto";
import { RatingService } from "./rating.service";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("Rating")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("rating")
export class RatingController implements RestController<Rating, CreateRatingDto, UpdateRatingDto> {
  constructor(private ratingService: RatingService) {
  }

  @Post()
  async create(@Body() dto: CreateRatingDto, @Res() res: Response) {
    const response = await this.ratingService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.ratingService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Rating>, @Res() res: Response) {
    const response = await this.ratingService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.ratingService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.ratingService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateRatingDto, @Res() res: Response) {
    const response = await this.ratingService.update(id, dto);

    res.status(response.statusCode).json(response);
  }
}
