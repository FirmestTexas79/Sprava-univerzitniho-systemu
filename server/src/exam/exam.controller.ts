import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Exam } from "@prisma/client";
import { CreateExamDto, UpdateExamDto } from "./dto";
import { ExamService } from "./exam.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Exam")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("exam")
export class ExamController implements RestController<Exam, CreateExamDto, UpdateExamDto> {
  constructor(private examService: ExamService) {
  }

  @Post()
  async create(@Body() dto: object): Promise<ResponseData<Exam>> {
    return this.examService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.examService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Exam>): Promise<ResponseData<Exam[]>> {
    return this.examService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<Exam>> {
    return this.examService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.examService.softDelete(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: object): Promise<ResponseData<Exam>> {
    return this.examService.update(id, dto);
  }
}
