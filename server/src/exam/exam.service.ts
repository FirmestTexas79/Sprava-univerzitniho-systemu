import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Exam, Visibility } from "@prisma/client";
import { CreateExamDto, UpdateExamDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class ExamService implements RestService<Exam, CreateExamDto, UpdateExamDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(ExamService.name),
  ) {}

  async create(dto: CreateExamDto): Promise<ResponseData<Exam>> {
    const response = { statusCode: 201, message: "Exam created" } as ResponseData<Exam>;
    const data = await this.prismaService.exam.create({
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
    await this.prismaService.exam.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Exam>): Promise<ResponseData<Exam[]>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Exam[]>;
    const queryOffset = query.offset || ((query.page || 1) - 1) * query.limit;
    const queryLimit = query.limit || 100;
    const querySortBy = query.sortBy || ("startTime" as keyof Exam);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.exam.findMany({
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

  async findOne(id: string): Promise<ResponseData<Exam>> {
    const response = { statusCode: 200, message: "Found" } as ResponseData<Exam>;
    const data = await this.prismaService.exam.findUnique({
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
    await this.prismaService.exam.update({
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

  async update(id: string, dto: UpdateExamDto): Promise<ResponseData<Exam>> {
    const response = { statusCode: 200, message: "Updated" } as ResponseData<Exam>;
    const data = await this.prismaService.exam.update({
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
