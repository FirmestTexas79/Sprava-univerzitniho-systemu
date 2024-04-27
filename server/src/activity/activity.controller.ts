import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Activity } from "@prisma/client";
import { CreateActivityDto, UpdateActivityDto } from "./dto";
import { ActivityService } from "./activity.service";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("Activity")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("activity")
export class ActivityController implements RestController<Activity, CreateActivityDto, UpdateActivityDto> {
  constructor(private activityService: ActivityService) {
  }

  @Post()
  async create(@Body() dto: CreateActivityDto, @Res() res: Response) {
    const response = await this.activityService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.activityService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Activity>, @Res() res: Response) {
    const response = await this.activityService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.activityService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.activityService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateActivityDto, @Res() res: Response) {
    const response = await this.activityService.update(id, dto);

    res.status(response.statusCode).json(response);
  }
}
