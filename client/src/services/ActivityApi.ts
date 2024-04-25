import { Api } from "./Api.ts";
import { Activity } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const activityForm = z.object({
  description: z.string().optional(),
  name: z.string().min(2),
});

export type ActivityForm = z.infer<typeof activityForm>;

export class ActivityApi extends Api<Activity, ActivityForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.ACTIVITY);
  }
}
