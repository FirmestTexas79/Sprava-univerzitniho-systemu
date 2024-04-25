import { Injectable, Logger } from "@nestjs/common";
import { User, Visibility } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from "argon2";
import { generateRandomPassword } from "../utils/utils";
import { RestService } from "../utils/rest.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";

@Injectable()
export class UserService implements RestService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(UserService.name),
  ) {}

  /**
   * Get the user
   * @param user User object
   */
  async getMe(user: User): Promise<ResponseData<User>> {
    const userData = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });
    delete userData.password;
    this.logger.log(userData);
    return {
      statusCode: 200,
      message: "User found",
      data: userData,
    };
  }

  async create(dto: CreateUserDto): Promise<ResponseData<User>> {
    const password = generateRandomPassword(8, 1, 1, 1, 0);

    const hash = await argon.hash(password);

    const userData = await this.prismaService.user.create({
      data: {
        sex: dto.sex,
        email: dto.email,
        password: hash,
        firstname: dto.firstname,
        lastname: dto.lastname,
        birthdate: dto.birthdate,
        phone: dto.phone,
        role: dto.role,
        titleAfter: dto.titleAfter,
        titleBefore: dto.titleBefore,
      },
    });
    delete userData.password;
    this.logger.log(userData);
    return {
      statusCode: 201,
      message: "User created",
      data: userData,
    };
  }

  async findAll(query: ListAllEntitiesQuery<User>): Promise<ResponseData<User[]>> {
    const queryOffset = query.offset || ((query.page || 1) - 1) * query.limit;
    const queryLimit = query.limit || 100;
    const querySortBy = query.sortBy || "firstname";
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const users = await this.prismaService.user.findMany({
      skip: queryOffset,
      take: queryLimit,
      orderBy: { [querySortBy]: querySortOrder },
    });

    const filteredUsers = users.filter((user) => {
      if (queryFilterBy && queryFilterValue) {
        return user[queryFilterBy as keyof User] === queryFilterValue;
      }
      return true;
    });

    filteredUsers.forEach((user) => {
      delete user.password;
    });

    this.logger.log(filteredUsers);
    return {
      statusCode: 200,
      message: "Users found",
      data: filteredUsers,
    };
  }

  async findOne(id: string): Promise<ResponseData<User>> {
    const userData = await this.prismaService.user.findUnique({
      where: { id },
    });
    delete userData.password;
    this.logger.log(userData);
    return {
      statusCode: 200,
      message: "User found",
      data: userData,
    };
  }

  async update(id: string, dto: UpdateUserDto): Promise<ResponseData<User>> {
    const userData = await this.prismaService.user.update({
      where: { id },
      data: { ...dto },
    });
    delete userData.password;
    this.logger.log(userData);
    return {
      statusCode: 200,
      message: "User updated",
      data: userData,
    };
  }

  async delete(id: string): Promise<ResponseData> {
    const userData = await this.prismaService.user.delete({
      where: { id },
    });
    delete userData.password;
    this.logger.log(userData);
    return {
      statusCode: 200,
      message: "User deleted",
    };
  }

  async softDelete(id: string): Promise<ResponseData> {
    const userData = await this.prismaService.user.update({
      where: { id },
      data: { visibility: Visibility.HIDDEN },
    });
    delete userData.password;
    this.logger.log(userData);
    return {
      statusCode: 200,
      message: "User soft deleted",
    };
  }
}
