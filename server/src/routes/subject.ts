import {Router} from "express"
import {deleteSubject, getSubjectById, getSubjects, postSubject, putSubject} from "../controllers/subject"
import {validate} from "../middlewares/validate"
import {postSubjectSchema} from "../../../lib/src/schemas/subject/SubjectDto"


export const subjectRouter = Router()

subjectRouter.get("/", getSubjects)
subjectRouter.post("/",validate(postSubjectSchema),postSubject)
subjectRouter.get("/:id",getSubjectById)
subjectRouter.put("/:id",putSubject)
subjectRouter.delete("/:id",deleteSubject)