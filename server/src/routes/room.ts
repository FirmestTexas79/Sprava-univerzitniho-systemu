import {Router} from "express"
import {deleteRoom, getRoomById, getRooms, postRoom, putRoom} from "../controllers/room"
import {validate} from "../middlewares/validate"
import {postRoomSchema} from "../../../lib/src/schemas/room/PostRoomBodySchema"


export const roomRouter = Router()

roomRouter.get("/", getRooms)
roomRouter.post("/",validate(postRoomSchema),postRoom)
roomRouter.get("/:id",getRoomById)
roomRouter.put("/:id",putRoom)
roomRouter.delete("/:id",deleteRoom)