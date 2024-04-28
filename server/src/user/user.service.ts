import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { User, Visibility } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from "argon2";
import { generateRandomPassword } from "../utils/utils";
import { RestService } from "../utils/rest.service";
import { ResponseData } from "../utils/response-data";
import { ListAllEntitiesQuery } from "../utils/list-all-entities.query";
import { SortType } from "../utils/sort-type.enum";
import { MultiFilterUserDto } from "./dto/multi-filter-user.dto";

@Injectable()
export class UserService implements RestService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    private prismaService: PrismaService,
    private logger: Logger = new Logger(UserService.name),
  ) {
  }

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
    const querySortBy = query.sortBy || "firstname";
    const querySortOrder = query.sortOrder || SortType.ASC;
    const queryFilterBy = query.filterBy;
    const queryFilterValue = query.filterValue;

    const users = await this.prismaService.user.findMany({
      orderBy: { [querySortBy]: querySortOrder },
      where: {
        [queryFilterBy]: queryFilterValue,
      },
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

  async findOne(id: string): Promise<ResponseData<User | undefined>> {
    const response = {
      statusCode: 200,
      message: "User found",
    } as ResponseData<User>;

    const userData = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userData) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = "User not found";
      return response;
    }

    delete userData.password;
    this.logger.log(userData);

    response.data = userData;

    return response;
  }

  async update(id: string, dto: UpdateUserDto): Promise<ResponseData<User>> {
    this.logger.log("Update user: " + JSON.stringify(dto));
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

  async multiFilter(dto: MultiFilterUserDto) {
    const users = await this.prismaService.user.findMany({
      where: {
        AND: dto.filter.map((f) => ({
          [f.key]: f.value,
        })),
      },
    });

    users.forEach((user) => {
      delete user.password;
    });

    this.logger.log(users);
    return {
      statusCode: 200,
      message: "Users found",
      data: users,
    };
  }

  async teacherWithoutGuarantorSubject() {
    const response = {
      statusCode: 201,
      message: "Users found",
    } as ResponseData<User[]>;

    this.logger.debug("Teacher without guarantor subject");

    const users = await this.prismaService.user.findMany({
      where: {
        role: "TEACHER",
        guarantorSubject: null,
      },
    });

    users.forEach((user) => {
      delete user.password;
    });

    this.logger.debug(users);

    response.data = users;
    this.logger.log(response);

    return response;
  }
}
