import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { Sex, User, UserRoles } from "@prisma/client";
import { ResponseData } from "../../../lib/src/persistance/response-data.ts";
import axios from "../api/axios.ts";
import { Api } from "./Api.ts";
import { z } from "zod";

const userForm = z.object({
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  birthdate: z.date(),
  titleAfter: z.string().nullish(),
  titleBefore: z.string().nullish(),
  phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).nullish(),
  sex: z.nativeEnum(Sex),
  role: z.nativeEnum(UserRoles),
});

const userUpdateForm = z.object({
  email: z.string().nullish(),
  firstname: z.string().nullish(),
  lastname: z.string().nullish(),
  birthdate: z.date().nullish(),
  titleAfter: z.string().nullish(),
  titleBefore: z.string().nullish(),
  phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).nullish(),
  sex: z.nativeEnum(Sex).nullish(),
  role: z.nativeEnum(UserRoles).nullish(),
});

export type UpdateUserForm = z.infer<typeof userForm>;

export type CreateUserForm = z.infer<typeof userForm>;

export class UserApi extends Api<User, CreateUserForm, UpdateUserForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.USER, { create: userForm, update: userUpdateForm });
  }

  async getMe() {
    const { data } = await axios.get<any, { data: ResponseData<User> }>(this.path + "me", this.config);
    return data;
  }
}
