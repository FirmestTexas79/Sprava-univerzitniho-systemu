import {Router} from "express"
import {deleteActivity, getActivityById, getActivities, postActivity, putActivity} from "../controllers/activity"
import {validate} from "../middlewares/validate"
import {postActivitySchema} from "../../../lib/src/schemas/activity/ActivityDto"


export const activityRouter = Router()

activityRouter.get("/", getActivities)
activityRouter.post("/",validate(postActivitySchema),postActivity)
activityRouter.get("/:id",getActivityById)
activityRouter.put("/:id",putActivity)
activityRouter.delete("/:id",deleteActivity)