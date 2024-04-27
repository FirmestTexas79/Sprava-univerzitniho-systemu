import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { RestController } from "../utils/rest.controller";
import { Room } from "@prisma/client";
import { CreateRoomDto, UpdateRoomDto } from "./dto";
import { RoomService } from "./room.service";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { Response } from "express";

@ApiTags("Room")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("room")
export class RoomController implements RestController<Room, CreateRoomDto, UpdateRoomDto> {
  constructor(private roomService: RoomService) {
  }

  @Post()
  async create(@Body() dto: CreateRoomDto, @Res() res: Response) {
    const response = await this.roomService.create(dto);

    res.status(response.statusCode).json(response);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.roomService.delete(id);

    res.status(response.statusCode).json(response);
  }

  @Get()
  async findAll(@Query() query: ListAllEntitiesQuery<Room>, @Res() res: Response) {
    const response = await this.roomService.findAll(query);

    res.status(response.statusCode).json(response);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const response = await this.roomService.findOne(id);

    res.status(response.statusCode).json(response);
  }

  @Delete("soft/:id")
  async softDelete(@Param("id") id: string, @Res() res: Response) {
    const response = await this.roomService.softDelete(id);

    res.status(response.statusCode).json(response);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateRoomDto, @Res() res: Response) {
    const response = await this.roomService.update(id, dto);

    res.status(response.statusCode).json(response);
  }
}
