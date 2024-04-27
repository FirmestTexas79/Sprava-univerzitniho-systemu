import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Exam } from "@prisma/client";
import { CreateExamDto, UpdateExamDto } from "./dto";
import { ExamService } from "./exam.service";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("Exam")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("exam")
export class ExamController implements RestController<Exam, CreateExamDto, UpdateExamDto> {
  constructor(private examService: ExamService) {
  }

  @Post()
  async create(@Body() dto: CreateExamDto, @Res() res: Response) {
    const response = await this.examService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.examService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Exam>, @Res() res: Response) {
    const response = await this.examService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.examService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.examService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateExamDto, @Res() res: Response) {
    const response = await this.examService.update(id, dto);

    res.status(response.statusCode).json(response);
  }
}
