import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Activity, Visibility } from "@prisma/client";
import { CreateActivityDto, UpdateActivityDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";
import { ResponseData } from "../utils/response-data";

@Injectable()
export class ActivityService implements RestService<Activity, CreateActivityDto, UpdateActivityDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(ActivityService.name),
  ) {
  }

  async create(dto: CreateActivityDto): Promise<ResponseData<Activity>> {
    const response = { statusCode: 201, message: "Activity created" } as ResponseData<Activity>;
    const data = await this.prismaService.activity.create({
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
    await this.prismaService.activity.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Activity>): Promise<ResponseData<Activity[]>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Activity[]>;
    const querySortBy = query.sortBy || ("startTime" as keyof Activity);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.activity.findMany({
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

  async findOne(id: string): Promise<ResponseData<Activity>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Activity>;
    const data = await this.prismaService.activity.findUnique({
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
    await this.prismaService.activity.update({
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

  async update(id: string, dto: UpdateActivityDto): Promise<ResponseData<Activity>> {
    const response = { statusCode: 200, message: "Updated" } as ResponseData<Activity>;
    const data = await this.prismaService.activity.update({
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
