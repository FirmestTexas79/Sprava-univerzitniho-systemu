import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ResponseData } from "../utils/response-data";
import { StudentSchedule } from "@prisma/client";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { ScheduleService } from "./schedule.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { CreateScheduleDto, UpdateScheduleDto } from "./dto";

@ApiTags("Schedule")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("schedule")
export class ScheduleController implements RestController<StudentSchedule, CreateScheduleDto, UpdateScheduleDto> {
  constructor(private scheduleService: ScheduleService) {
  }

  @Post()
  async create(@Body() dto: object): Promise<ResponseData<StudentSchedule>> {
    return this.scheduleService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.scheduleService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<StudentSchedule>): Promise<ResponseData<StudentSchedule[]>> {
    return this.scheduleService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<StudentSchedule>> {
    return this.scheduleService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.scheduleService.softDelete(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: object): Promise<ResponseData<StudentSchedule>> {
    return this.scheduleService.update(id, dto);
  }
}
