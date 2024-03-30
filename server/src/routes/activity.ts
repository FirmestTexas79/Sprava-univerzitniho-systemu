import {Router} from "express"
import {deleteActivity, getActivityById, getActivities, postActivity, putActivity} from "../controllers/activity"


export const activityRouter = Router()

activityRouter.get("/", getActivities)
activityRouter.post("/",postActivity)
activityRouter.get("/:id",getActivityById)
activityRouter.put("/:id",putActivity)
activityRouter.delete("/:id",deleteActivity)