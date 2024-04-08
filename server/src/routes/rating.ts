import {Router} from "express"
import {deleteRating, getRatingById, getRatings, postRating, putRating} from "../controllers/rating"
import {validate} from "../middlewares/validate"
import {postRatingSchema} from "../../../lib/src/schemas/rating/PostRatingBodySchema"


export const ratingRouter = Router()

ratingRouter.get("/", getRatings)
ratingRouter.post("/",validate(postRatingSchema),postRating)
ratingRouter.get("/:id",getRatingById)
ratingRouter.put("/:id",putRating)
ratingRouter.delete("/:id",deleteRating)