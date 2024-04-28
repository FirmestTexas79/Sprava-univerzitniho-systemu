import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { FieldOfStudyService } from "./field-of-study.service";
import { RestController } from "../utils/rest.controller";
import { CreateFieldOfStudyDto, UpdateFieldOfStudyDto } from "./dto";
import { FieldOfStudy } from "@prisma/client";
import { Response } from "express";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Field of study")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("field-of-study")
export class FieldOfStudyController
  implements RestController<FieldOfStudy, CreateFieldOfStudyDto, UpdateFieldOfStudyDto>
{
  constructor(private fieldOfStudyService: FieldOfStudyService) {}

  @Post()
  async create(@Body() dto: CreateFieldOfStudyDto, @Res() res: Response) {
    const response = await this.fieldOfStudyService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.fieldOfStudyService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<FieldOfStudy>, @Res() res: Response) {
    const response = await this.fieldOfStudyService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.fieldOfStudyService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.fieldOfStudyService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateFieldOfStudyDto, @Res() res: Response) {
    const response = await this.fieldOfStudyService.update(id, dto);

    res.status(response.statusCode).json(response);
  }

  @Get("by-subject/:id")
  async getFieldOfStudiesBySubjectId(@Param("id") id: string, @Res() res: Response) {
    const response = await this.fieldOfStudyService.getFieldOfStudiesBySubjectId(id);

    res.status(response.statusCode).json(response);
  }
}
