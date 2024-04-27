import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import axios from "../api/axios.ts";
import { ResponseData } from "../../../lib/src/persistance/response-data.ts";
import { UserToken } from "../../../lib/src/persistance/user-token.ts";
import { z, ZodObject, ZodRawShape } from "zod";
import { Sex, UserRoles } from "@prisma/client";
import { AxiosRequestConfig } from "axios";

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
  titleAfter: z.string().nullish(),
  titleBefore: z.string().nullish(),
  phone: z.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).nullish(),
  year: z.number().int().min(1).nullish(),
  fieldOfStudy: z.string().cuid().nullish(),
  sex: z.nativeEnum(Sex),
  role: z.nativeEnum(UserRoles),
});

export type RegisterForm = z.infer<typeof registerFormData>;

const resetPasswordFormData = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number"),
  token: z.string(),
});

export type ResetPasswordForm = z.infer<typeof resetPasswordFormData>;

const changePasswordFormData = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type ChangePasswordForm = z.infer<typeof changePasswordFormData>;

export class AuthApi {
  protected config: AxiosRequestConfig = {};
  protected path: RoutePath;

  constructor(token: string | null = null) {
    this.config = { headers: { Authorization: `Bearer ${token}` } };
    this.path = RoutePath.AUTH;
  }

  /**
   * Login
   * @param form
   */
  async login(form: LoginForm) {
    this.validate(loginFormData, form);
    const { data } = await axios.post<any, {
      data: ResponseData<UserToken>
    }>(RoutePath.AUTH + "login", form, this.config);
    return data;
  }

  /**
   * Register
   * @param form
   */
  async register(form: RegisterForm) {
    const { data } = await axios.post<any, {
      data: ResponseData<UserToken>
    }>(RoutePath.AUTH + "register", form, this.config);
    return data;
  }

  /**
   * Logout
   */
  async logout() {
    const { data } = await axios.post<any, { data: ResponseData }>(RoutePath.AUTH + "logout", null, this.config);
    return data;
  }

  /**
   * Get user info
   */
  async forgotPassword(form: AuthForm) {
    this.validate(authFormData, form);
    const { data } = await axios.post<any, {
      data: ResponseData
    }>(RoutePath.AUTH + "forgot-password", form, this.config);
    return data;
  }

  /**
   * Reset password
   * @param form
   */
  async resetPassword(form: ResetPasswordForm) {
    this.validate(resetPasswordFormData, form);
    const { data } = await axios.post<any, {
      data: ResponseData
    }>(RoutePath.AUTH + "reset-password", form, this.config);
    return data;
  }

  /**
   * Change password
   * @param form
   */
  async changePassword(form: ChangePasswordForm) {
    this.validate(changePasswordFormData, form);
    const { data } = await axios.post<any, {
      data: ResponseData
    }>(RoutePath.AUTH + "change-password", form, this.config);
    return data;
  }

  /**
   * Validate form
   * @param schema
   * @param form
   */
  protected validate<T extends ZodRawShape>(schema: ZodObject<T>, form: object): asserts form is T {
    try {
      schema.parse(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw error;
      } else {
        throw new Error("Validation failed");
      }
    }
  }
}

