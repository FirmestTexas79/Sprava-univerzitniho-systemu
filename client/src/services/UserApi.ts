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
  titleAfter: z.string().optional(),
  titleBefore: z.string().optional(),
  phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).optional(),
  sex: z.nativeEnum(Sex),
  role: z.nativeEnum(UserRoles),
});

export type UserForm = z.infer<typeof userForm>;

export class UserApi extends Api<User, UserForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.USER);
  }

  async getMe() {
    const { data } = await axios.get<any, { data: ResponseData<User> }>(this.path + "me", this.config);
    return data;
  }
}
