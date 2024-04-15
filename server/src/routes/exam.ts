import {Router} from "express"
import {deleteExam, getExamById, getExams, postExam, putExam} from "../controllers/exam"
import {validate} from "../middlewares/validate"
import {postExamSchema} from "../../../lib/src/schemas/exam/ExamDto"


export const examRouter = Router()

examRouter.get("/", getExams)
examRouter.post("/",postExam)
examRouter.get("/:id",validate(postExamSchema),getExamById)
examRouter.put("/:id",putExam)
examRouter.delete("/:id",deleteExam)