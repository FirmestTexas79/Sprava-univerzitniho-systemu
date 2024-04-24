import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Subject } from "@prisma/client";
import { CreateSubjectDto, UpdateSubjectDto } from "./dto";
import { SubjectService } from "./subject.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Subject")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("subject")
export class SubjectController implements RestController<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor(private subjectService: SubjectService) {}

  @Post()
  async create(@Body() dto: CreateSubjectDto): Promise<ResponseData<Subject>> {
    return this.subjectService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.subjectService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Subject>): Promise<ResponseData<Subject[]>> {
    return this.subjectService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<Subject>> {
    return this.subjectService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.subjectService.softDelete(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateSubjectDto): Promise<ResponseData<Subject>> {
    return this.subjectService.update(id, dto);
  }
}
