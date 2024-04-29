import { Injectable, Logger } from "@nestjs/common";
import { RestService } from "../utils/rest.service";
import { Schedule, Visibility } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateScheduleDto,
  ScheduleCountsDto,
  SelectUserFromScheduleDto,
  UnselectUserFromScheduleDto,
  UpdateScheduleDto,
} from "./dto";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";
import { Serializable } from "../utils/serializable";

@Injectable()
export class ScheduleService implements RestService<Schedule, CreateScheduleDto, UpdateScheduleDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(ScheduleService.name),
  ) {
  }

  async create(dto: CreateScheduleDto): Promise<ResponseData<Schedule>> {
    const response = {
      statusCode: 201,
      message: "Schedule created",
    } as ResponseData<Schedule>;
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
    const response = {
      statusCode: 200,
      message: "Deleted",
    } as ResponseData;
    await this.prismaService.schedule.delete({
      where: {
        id: id,
      },
    });

    this.logger.log(response);

    return response;
  }

  async findAll(query: ListAllEntitiesQuery<Schedule>): Promise<ResponseData<Schedule[]>> {
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<Schedule[]>;
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
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<Schedule>;
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
    const response = {
      statusCode: 200,
      message: "Soft Deleted",
    } as ResponseData;
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
    const response = {
      statusCode: 200,
      message: "Updated",
    } as ResponseData<Schedule>;
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

  async getSchedulesBySubjectId(id: string) {
    const response = {
      statusCode: 200,
      message: "Found",
    } as ResponseData<Schedule[]>;
    const data = await this.prismaService.schedule.findMany({
      where: {
        subjectId: id,
      },
    });

    response.data = data;
    this.logger.log(response);

    return response;
  }

  /**
   * Get the count of schedule instances where students have logged into the schedule in subject ids
   * @param dto ScheduleCountsDto
   */
  async scheduleCounts(dto: ScheduleCountsDto) {
    const response = {
      statusCode: 200,
      message: "Counts",
    } as ResponseData<Serializable<number>[]>;

    const data = await this.prismaService.schedule.findMany({
      where: {
        id: {
          in: dto.ids,
        },
      },
      select: {
        id: true,
        students: true,
      },
    });

    response.data = data.map((schedule) => ({
      key: schedule.id,
      value: schedule.students.length,
    }));

    this.logger.log(response);

    return response;
  }

  /**
   * Select user from schedule
   * @param dto SelectUserFromScheduleDto
   */
  async selectUserFromSchedule(dto: SelectUserFromScheduleDto) {
    const response = {
      statusCode: 200,
      message: "Selected",
    } as ResponseData<Schedule>;

    try {
      const data = await this.prismaService.schedule.update({
        where: {
          id: dto.scheduleId,
        },
        data: {
          students: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });

      response.data = data;

      this.logger.log(response);

      return response;
    } catch (e) {
      response.statusCode = 400;
      response.message = e.message;
      return response;
    }
  }

  /**
   * Unselect user from schedule
   * @param dto UnselectUserFromScheduleDto
   */
  async unselectUserFromSchedule(dto: UnselectUserFromScheduleDto) {
    const response = {
      statusCode: 200,
      message: "Unselected",
    } as ResponseData<Schedule>;

    try {
      const data = await this.prismaService.schedule.update({
        where: {
          id: dto.scheduleId,
        },
        data: {
          students: {
            disconnect: {
              id: dto.userId,
            },
          },
        },
      });

      response.data = data;

      this.logger.log(response);

      return response;
    } catch (e) {
      response.statusCode = 400;
      response.message = e.message;
      return response;
    }
  }
}
