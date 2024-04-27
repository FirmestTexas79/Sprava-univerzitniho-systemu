import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Schedule, Visibility } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateScheduleDto, UpdateScheduleDto } from "./dto";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class ScheduleService implements RestService<Schedule, CreateScheduleDto, UpdateScheduleDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(ScheduleService.name),
  ) {
  }

  async create(dto: CreateScheduleDto): Promise<ResponseData<Schedule>> {
    const response = { statusCode: 201, message: "Schedule created" } as ResponseData<Schedule>;
    const data = await this.prismaService.schedule.create({
      data: {
        ...dto,
      },
    });

    response.data = data;

    this.logger.log(response);
    return response;
  }

  async delete(id: string): Promise<ResponseData> {
    const response = { statusCode: 200, message: "Deleted" } as ResponseData;
    await this.prismaService.schedule.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Schedule>): Promise<ResponseData<Schedule[]>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Schedule[]>;
    const querySortBy = query.sortBy || ("startTime" as keyof Schedule);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.schedule.findMany({
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

  async findOne(id: string): Promise<ResponseData<Schedule>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Schedule>;
    const data = await this.prismaService.schedule.findUnique({
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
    await this.prismaService.schedule.update({
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

  async update(id: string, dto: UpdateScheduleDto): Promise<ResponseData<Schedule>> {
    const response = { statusCode: 200, message: "Updated" } as ResponseData<Schedule>;
    const data = await this.prismaService.schedule.update({
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
