import {Router} from "express"
import {deleteExam, getExamById, getExams, postExam, putExam} from "../controllers/exam"


export const examRouter = Router()

examRouter.get("/", getExams)
examRouter.post("/",postExam)
examRouter.get("/:id",getExamById)
examRouter.put("/:id",putExam)
examRouter.delete("/:id",deleteExam)