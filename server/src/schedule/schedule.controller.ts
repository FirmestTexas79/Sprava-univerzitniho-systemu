import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Schedule } from "@prisma/client";
import { ScheduleService } from "./schedule.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import {
  CreateScheduleDto,
  ScheduleCountsDto,
  SelectUserFromScheduleDto,
  UnselectUserFromScheduleDto,
  UpdateScheduleDto,
} from "./dto";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("Schedule")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("schedule")
export class ScheduleController implements RestController<Schedule, CreateScheduleDto, UpdateScheduleDto> {
  constructor(private scheduleService: ScheduleService) {
  }

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

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateScheduleDto, @Res() res: Response) {
    const response = await this.scheduleService.update(id, dto);

    res.status(response.statusCode).json(response);
  }

  @Get("by-subject/:id")
  async getSchedulesBySubjectId(@Param("id") id: string, @Res() res: Response) {
    const response = await this.scheduleService.getSchedulesBySubjectId(id);

    res.status(response.statusCode).json(response);
  }

  @Post("counts")
  async scheduleCounts(@Body() dto: ScheduleCountsDto, @Res() res: Response) {
    const response = await this.scheduleService.scheduleCounts(dto);

    res.status(response.statusCode).json(response);
  }

  @Post("select-user")
  async selectUserFromSchedule(@Body() dto: SelectUserFromScheduleDto, @Res() res: Response) {
    const response = await this.scheduleService.selectUserFromSchedule(dto);

    res.status(response.statusCode).json(response);
  }

  @Post("unselect-user")
  async unselectUserFromSchedule(@Body() dto: UnselectUserFromScheduleDto, @Res() res: Response) {
    const response = await this.scheduleService.unselectUserFromSchedule(dto);

    res.status(response.statusCode).json(response);
  }
}
