import { Api } from "./Api.ts";
import { Rating } from "@prisma/client";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";
import { z } from "zod";

const createRatingForm = z.object({
  date: z.date(),
  rating: z.number().min(1).max(5),
  studentId: z.string().cuid(),
  examId: z.string().cuid(),
});

const updateRatingForm = z.object({
  date: z.date().nullish(),
  rating: z.number().min(1).max(5).nullish(),
  studentId: z.string().cuid().nullish(),
  examId: z.string().cuid().nullish(),
});

export type UpdateRatingForm = z.infer<typeof createRatingForm>;

export type CreateRatingForm = z.infer<typeof createRatingForm>;

export class RatingApi extends Api<Rating, CreateRatingForm, UpdateRatingForm> {

  constructor(token: string | null = null) {
    super(token, RoutePath.RATING, {
      create: createRatingForm,
      update: updateRatingForm,
    });
  }
}
