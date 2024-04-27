import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { FieldOfStudy, Visibility } from "@prisma/client";
import { CreateFieldOfStudyDto, UpdateFieldOfStudyDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class FieldOfStudyService implements RestService<FieldOfStudy, CreateFieldOfStudyDto, UpdateFieldOfStudyDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(FieldOfStudyService.name),
  ) {
  }

  async create(dto: CreateFieldOfStudyDto): Promise<ResponseData<FieldOfStudy>> {
    const response = {
      statusCode: 201,
      message: "FieldOfStudy created",
    } as ResponseData<FieldOfStudy>;

    const data = await this.prismaService.fieldOfStudy.create({
      data: {
        ...dto,
      },
    });

    response.data = data;

    this.logger.log(response);
    return response;
  }

  async delete(id: string): Promise<ResponseData> {
    const response = {
      statusCode: 200,
      message: "Deleted",
    } as ResponseData;
    await this.prismaService.fieldOfStudy.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<FieldOfStudy>): Promise<ResponseData<FieldOfStudy[]>> {
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<FieldOfStudy[]>;
    const querySortBy = query.sortBy || ("startTime" as keyof FieldOfStudy);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.fieldOfStudy.findMany({
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

  async findOne(id: string): Promise<ResponseData<FieldOfStudy>> {
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<FieldOfStudy>;
    const data = await this.prismaService.fieldOfStudy.findUnique({
      where: {
        id: id,
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }

  async softDelete(id: string): Promise<ResponseData> {
    const response = {
      statusCode: 200,
      message: "Soft Deleted",
    } as ResponseData;
    await this.prismaService.fieldOfStudy.update({
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

  async update(id: string, dto: UpdateFieldOfStudyDto): Promise<ResponseData<FieldOfStudy>> {
    const response = {
      statusCode: 200,
      message: "Updated",
    } as ResponseData<FieldOfStudy>;
    const data = await this.prismaService.fieldOfStudy.update({
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
