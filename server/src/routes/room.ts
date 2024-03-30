import {Router} from "express"
import {deleteRoom, getRoomById, getRooms, postRoom, putRoom} from "../controllers/room"


export const roomRouter = Router()

roomRouter.get("/", getRooms)
roomRouter.post("/",postRoom)
roomRouter.get("/:id",getRoomById)
roomRouter.put("/:id",putRoom)
roomRouter.delete("/:id",deleteRoom)