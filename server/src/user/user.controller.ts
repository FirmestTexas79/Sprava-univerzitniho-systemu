import { Body, Controller, Delete, Get, Param, Patch, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

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
}
