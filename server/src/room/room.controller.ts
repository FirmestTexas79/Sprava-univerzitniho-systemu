import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Room } from "@prisma/client";
import { CreateRoomDto, UpdateRoomDto } from "./dto";
import { RoomService } from "./room.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";

@ApiTags("Room")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("room")
export class RoomController implements RestController<Room, CreateRoomDto, UpdateRoomDto> {
  constructor(private roomService: RoomService) {}

  @Post()
  async create(@Body() dto: object): Promise<ResponseData<Room>> {
    return this.roomService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<ResponseData> {
    return this.roomService.delete(id);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Room>): Promise<ResponseData<Room[]>> {
    return this.roomService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ResponseData<Room>> {
    return this.roomService.findOne(id);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string): Promise<ResponseData> {
    return this.roomService.softDelete(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: object): Promise<ResponseData<Room>> {
    return this.roomService.update(id, dto);
  }
}
