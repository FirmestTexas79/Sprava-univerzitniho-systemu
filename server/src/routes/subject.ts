import {Router} from "express"
import {deleteSubject, getSubjectById, getSubjects, postSubject, putSubject} from "../controllers/subject"


export const subjectRouter = Router()

subjectRouter.get("/", getSubjects)
subjectRouter.post("/",postSubject)
subjectRouter.get("/:id",getSubjectById)
subjectRouter.put("/:id",putSubject)
subjectRouter.delete("/:id",deleteSubject)