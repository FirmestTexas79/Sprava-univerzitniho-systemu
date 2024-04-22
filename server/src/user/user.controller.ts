import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { ResponseData } from "../utils/response-data";
import { GetUser } from "../auth/decorator";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser() user: User): Promise<ResponseData<User>> {
    return this.userService.getMe(user);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateUserDto): Promise<ResponseData<User>> {
    return this.userService.update(id, dto);
  }

  @Delete("id")
  async delete(@Param("id") id: string): Promise<ResponseData<User>> {
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
}
