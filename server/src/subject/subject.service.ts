import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Subject, Visibility } from "@prisma/client";
import { CreateSubjectDto, GetSubjectsByIdsDto, UpdateSubjectDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class SubjectService implements RestService<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(SubjectService.name),
  ) {
  }

  async create(dto: CreateSubjectDto): Promise<ResponseData<Subject>> {
    const response = {
      statusCode: 201,
      message: "Subject created",
    } as ResponseData<Subject>;

    const data = await this.prismaService.subject.create({
      data: {
        department: dto.department,
        name: dto.name,
        shortName: dto.shortName,
        description: dto.description,
        category: dto.category,
        credits: dto.credits,
        guarantorId: dto.guarantorId,
        fieldOfStudies: {
          connect: dto.fieldOfStudies.map((fos) => {
            return {
              id: fos,
            };
          }),
        },
        teachers: {
          connect: dto.teachers.map((teacherId) => {
            return {
              id: teacherId,
            };
          }),
        },
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
    await this.prismaService.subject.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Subject>): Promise<ResponseData<Subject[]>> {
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<Subject[]>;
    const querySortBy = query.sortBy || ("startTime" as keyof Subject);
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const data = await this.prismaService.subject.findMany({
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
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<Subject>;
    const data: Subject = await this.prismaService.subject.findUnique({
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
    const response = {
      statusCode: 200,
      message: "Updated",
    } as ResponseData<Subject>;

    const teachers = dto.teachers || [];
    if (dto.guarantorId && !teachers.includes(dto.guarantorId)) {
      teachers.push(dto.guarantorId);
    }

    const data = await this.prismaService.subject.update({
      where: {
        id: id,
      },
      data: {
        department: dto.department,
        name: dto.name,
        shortName: dto.shortName,
        description: dto.description,
        category: dto.category,
        credits: dto.credits,
        guarantorId: dto.guarantorId,
        fieldOfStudies: {
          set: dto.fieldOfStudies.map((fos) => {
            return {
              id: fos,
            };
          }),
        },
        teachers: {
          set: teachers.map((tr) => {
            return {
              id: tr,
            };
          }),
        },
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }

  async getSubjectsByIds(dto: GetSubjectsByIdsDto) {
    const response = {
      statusCode: 200,
      message: "Subjects found",
    } as ResponseData<Subject[]>;
    const data = await this.prismaService.subject.findMany({
      where: {
        id: {
          in: dto.ids,
        },
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }

  async getSubjectsByFieldOfStudy(id: string) {
    const response = {
      statusCode: 200,
      message: "Subjects found",
    } as ResponseData<Subject[]>;
    const data = await this.prismaService.subject.findMany({
      where: {
        fieldOfStudies: {
          some: {
            id: id,
          },
        },
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }
}
