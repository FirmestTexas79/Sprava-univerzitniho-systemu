import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Rating, Visibility } from "@prisma/client";
import { CreateRatingDto, UpdateRatingDto } from "../rating/dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class RatingService implements RestService<Rating, CreateRatingDto, UpdateRatingDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(RatingService.name),
  ) {}

  async create(dto: CreateRatingDto): Promise<ResponseData<Rating>> {
    const response = { statusCode: 201, message: "Rating created" } as ResponseData<Rating>;
    const data = await this.prismaService.rating.create({
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
    await this.prismaService.rating.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Rating>): Promise<ResponseData<Rating[]>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Rating[]>;
    const queryOffset = query.offset || ((query.page || 1) - 1) * query.limit;
    const queryLimit = query.limit || 100;
    const querySortBy = query.sortBy || ("startTime" as keyof Rating);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.rating.findMany({
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

  async findOne(id: string): Promise<ResponseData<Rating>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Rating>;
    const data = await this.prismaService.rating.findUnique({
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
    await this.prismaService.rating.update({
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

  async update(id: string, dto: UpdateRatingDto): Promise<ResponseData<Rating>> {
    const response = { statusCode: 200, message: "Updated" } as ResponseData<Rating>;
    const data = await this.prismaService.rating.update({
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
