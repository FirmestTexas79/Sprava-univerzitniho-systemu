import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { GetUsersByIdsDto, UpdateUserDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";
import { MultiFilterUserDto } from "./dto/multi-filter-user.dto";

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get("me")
  async getMe(@GetUser() user: User, @Res() res: Response) {
    const response = await this.userService.getMe(user);

    res.status(response.statusCode).json(response);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateUserDto, @Res() res: Response) {
    const response = await this.userService.update(id, dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.userService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<User>, @Res() res: Response) {
    const response = await this.userService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.userService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.userService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Post("multi-filter")
  async multiFilter(@Body() dto: MultiFilterUserDto, @Res() res: Response) {
    const response = await this.userService.multiFilter(dto);

    res.status(response.statusCode).json(response);
  }

  @Post("teacher-without-guarantor-subject")
  async teacherWithoutGuarantorSubject(@Res() res: Response) {
    const response = await this.userService.teacherWithoutGuarantorSubject();

    res.status(response.statusCode).json(response);
  }

  @Post("by-ids")
  async getUsersByIds(@Body() dto: GetUsersByIdsDto, @Res() res: Response) {
    const response = await this.userService.getUsersByIds(dto);

    res.status(response.statusCode).json(response);
  }

  @Get("by-subject/:id")
  async getUsersBySubjectId(@Param("id") id: string, @Res() res: Response) {
    const response = await this.userService.getUsersBySubjectId(id);

    res.status(response.statusCode).json(response);
  }

  @Post("schedules")
  async getSchedules(@GetUser() user: User, @Res() res: Response) {
    const response = await this.userService.getSchedules(user);

    res.status(response.statusCode).json(response);
  }
}
