import { Api } from "./Api.ts";
import { Rating } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const ratingForm = z.object({
  date: z.date(),
  rating: z.number().min(1).max(5),
  studentId: z.string().cuid2(),
  examId: z.string().cuid2(),
});

export type RatingForm = z.infer<typeof ratingForm>;

export class RatingApi extends Api<Rating, RatingForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.RATING);
  }
}
