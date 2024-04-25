import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { ResponseData } from "../utils/response-data";

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser() user: User): Promise<ResponseData<User>> {
    return this.userService.getMe(user);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateUserDto): Promise<ResponseData<User>> {
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.userService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<User>): Promise<ResponseData<User[]>> {
    return this.userService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<User>> {
    return this.userService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.userService.softDelete(id);
  }
}
