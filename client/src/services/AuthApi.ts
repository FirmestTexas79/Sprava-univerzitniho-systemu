import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import axios from "../api/axios.ts";
import { ResponseData } from "../../../lib/src/persistance/response-data.ts";
import { UserToken } from "../../../lib/src/persistance/user-token.ts";
import { Api } from "./Api.ts";
import { z } from "zod";
import { Sex, UserRoles } from "@prisma/client";

const authFormData = z.object({
  email: z.string().email(),
});

export type AuthForm = z.infer<typeof authFormData>;

const loginFormData = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof loginFormData>;

const registerFormData = z.object({
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

export type RegisterForm = z.infer<typeof registerFormData>;

const resetPasswordFormData = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "Password can contain special characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "Password can contain special characters"),
  token: z.string(),
});

export type ResetPasswordForm = z.infer<typeof resetPasswordFormData>;

const changePasswordFormData = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type ChangePasswordForm = z.infer<typeof changePasswordFormData>;

export class AuthApi extends Api {

  constructor(token: string | null = null) {
    super(token, RoutePath.AUTH);
  }


  /**
   * Login
   * @param form
   */
  async login(form: LoginForm) {
    const { data } = await axios.post<any, { data: ResponseData<UserToken> }>(RoutePath.AUTH_LOGIN, form, this.config);
    return data;
  }

  /**
   * Register
   * @param form
   */
  async register(form: RegisterForm) {
    const { data } = await axios.post<any, {
      data: ResponseData<UserToken>
    }>(RoutePath.AUTH_REGISTER, form, this.config);
    return data;
  }

  /**
   * Logout
   */
  async logout() {
    const { data } = await axios.post<any, { data: ResponseData }>(RoutePath.AUTH_LOGOUT, null, this.config);
    return data;
  }

  /**
   * Get user info
   */
  async forgotPassword(form: AuthForm) {
    const { data } = await axios.post<any, { data: ResponseData }>(RoutePath.AUTH_FORGOT_PASSWORD, form, this.config);
    return data;
  }

  /**
   * Reset password
   * @param form
   */
  async resetPassword(form: ResetPasswordForm) {
    const { data } = await axios.post<any, { data: ResponseData }>(RoutePath.AUTH_RESET_PASSWORD, form, this.config);
    return data;
  }

  /**
   * Change password
   * @param form
   */
  async changePassword(form: ChangePasswordForm) {
    const { data } = await axios.post<any, { data: ResponseData }>(RoutePath.AUTH_CHANGE_PASSWORD, form, this.config);
    return data;
  }
}

