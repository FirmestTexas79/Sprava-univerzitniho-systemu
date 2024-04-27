import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Subject, Visibility } from "@prisma/client";
import { CreateSubjectDto, UpdateSubjectDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class SubjectService implements RestService<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(SubjectService.name),
  ) {}

  async create(dto: CreateSubjectDto): Promise<ResponseData<Subject>> {
    const response = { statusCode: 201, message: "Subject created" } as ResponseData<Subject>;
    const data = await this.prismaService.subject.create({
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
    await this.prismaService.subject.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Subject>): Promise<ResponseData<Subject[]>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Subject[]>;
    const queryOffset = query.offset || ((query.page || 1) - 1) * query.limit;
    const queryLimit = query.limit || 100;
    const querySortBy = query.sortBy || ("startTime" as keyof Subject);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.subject.findMany({
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

  async findOne(id: string): Promise<ResponseData<Subject>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Subject>;
    const data = await this.prismaService.subject.findUnique({
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
    await this.prismaService.subject.update({
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

  async update(id: string, dto: UpdateSubjectDto): Promise<ResponseData<Subject>> {
    const response = { statusCode: 200, message: "Updated" } as ResponseData<Subject>;
    const data = await this.prismaService.subject.update({
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