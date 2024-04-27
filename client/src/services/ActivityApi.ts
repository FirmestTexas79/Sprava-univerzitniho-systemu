import { Api } from "./Api.ts";
import { Activity } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const createActivityForm = z.object({
  description: z.string().nullish(),
  name: z.string().min(2),
});

const updateActivityForm = z.object({
  description: z.string().nullish(),
  name: z.string().min(2).nullish(),
});

export type UpdateActivityForm = z.infer<typeof updateActivityForm>;

export type CreateActivityForm = z.infer<typeof createActivityForm>;

export class ActivityApi extends Api<Activity, CreateActivityForm, UpdateActivityForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.ACTIVITY, {
      create: createActivityForm,
      update: updateActivityForm,
    });
  }
}
