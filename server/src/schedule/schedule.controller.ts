import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Schedule } from "@prisma/client";
import { ScheduleService } from "./schedule.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { CreateScheduleDto, UpdateScheduleDto } from "./dto";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("Schedule")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("schedule")
export class ScheduleController implements RestController<Schedule, CreateScheduleDto, UpdateScheduleDto> {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  async create(@Body() dto: CreateScheduleDto, @Res() res: Response) {
    const response = await this.scheduleService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.scheduleService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Schedule>, @Res() res: Response) {
    const response = await this.scheduleService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.scheduleService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.scheduleService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateScheduleDto, @Res() res: Response) {
    const response = await this.scheduleService.update(id, dto);

    res.status(response.statusCode).json(response);
  }
}
