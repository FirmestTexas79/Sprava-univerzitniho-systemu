import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Subject } from "@prisma/client";
import { CreateSubjectDto, UpdateSubjectDto } from "./dto";
import { SubjectService } from "./subject.service";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";
import { GetSubjectsByIdsDto } from "./dto/get-subjects-by-ids.dto";

@ApiTags("Subject")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("subject")
export class SubjectController implements RestController<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor(private subjectService: SubjectService) {
  }

  @Post()
  async create(@Body() dto: CreateSubjectDto, @Res() res: Response) {
    const response = await this.subjectService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.subjectService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Subject>, @Res() res: Response) {
    const response = await this.subjectService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.subjectService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.subjectService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateSubjectDto, @Res() res: Response) {
    const response = await this.subjectService.update(id, dto);

    res.status(response.statusCode).json(response);
  }

  @Post("by-ids")
  async getSubjectsByIds(@Body() dto: GetSubjectsByIdsDto, @Res() res: Response) {
    const response = await this.subjectService.getSubjectsByIds(dto);

    res.status(response.statusCode).json(response);
  }
}
