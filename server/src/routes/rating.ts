import {Router} from "express"
import {deleteRating, getRatingById, getRatings, postRating, putRating} from "../controllers/rating"


export const ratingRouter = Router()

ratingRouter.get("/", getRatings)
ratingRouter.post("/",postRating)
ratingRouter.get("/:id",getRatingById)
ratingRouter.put("/:id",putRating)
ratingRouter.delete("/:id",deleteRating)