import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Room, Visibility } from "@prisma/client";
import { CreateRoomDto, UpdateRoomDto } from "../room/dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class RoomService implements RestService<Room, CreateRoomDto, UpdateRoomDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(RoomService.name),
  ) {
  }

  async create(dto: CreateRoomDto): Promise<ResponseData<Room>> {
    const response = { statusCode: 201, message: "Room created" } as ResponseData<Room>;
    const data = await this.prismaService.room.create({
      data: {
        name: dto.name,
        description: dto.description,
        floor: dto.floor,
        capacity: dto.capacity,
        type: dto.type,
      },
    });

    response.data = data;

    this.logger.log(response);
    return response;
  }

  async delete(id: string): Promise<ResponseData> {
    const response = { statusCode: 200, message: "Deleted" } as ResponseData;
    await this.prismaService.room.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Room>): Promise<ResponseData<Room[]>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Room[]>;
    const queryOffset = query.offset || ((query.page || 1) - 1) * query.limit;
    const queryLimit = query.limit || 100;
    const querySortBy = query.sortBy || ("startTime" as keyof Room);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.room.findMany({
      skip: queryOffset,
      take: queryLimit,
      orderBy: {
        [querySortBy]: querySortOrder,
      },
      where: {
        visibility: Visibility.VISIBLE,
        [queryFilterBy]: queryFilterValue,
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }

  async findOne(id: string): Promise<ResponseData<Room>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Room>;
    const data = await this.prismaService.room.findUnique({
      where: {
        id: id,
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }

  async softDelete(id: string): Promise<ResponseData> {
    const response = { statusCode: 200, message: "Soft Deleted" } as ResponseData;
    await this.prismaService.room.update({
      where: {
        id: id,
      },
      data: {
        visibility: Visibility.HIDDEN,
      },
    });

    this.logger.log(response);

    return response;
  }

  async update(id: string, dto: UpdateRoomDto): Promise<ResponseData<Room>> {
    const response = { statusCode: 200, message: "Updated" } as ResponseData<Room>;
    const data = await this.prismaService.room.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }
}
