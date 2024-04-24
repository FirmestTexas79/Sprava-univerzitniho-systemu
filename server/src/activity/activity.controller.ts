import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Activity } from "@prisma/client";
import { CreateActivityDto, UpdateActivityDto } from "./dto";
import { ActivityService } from "./activity.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Activity")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("activity")
export class ActivityController implements RestController<Activity, CreateActivityDto, UpdateActivityDto> {
  constructor(private activityService: ActivityService) {}

  @Post()
  async create(@Body() dto: CreateActivityDto): Promise<ResponseData<Activity>> {
    return this.activityService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.activityService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Activity>): Promise<ResponseData<Activity[]>> {
    return this.activityService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<Activity>> {
    return this.activityService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.activityService.softDelete(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateActivityDto): Promise<ResponseData<Activity>> {
    return this.activityService.update(id, dto);
  }
}
