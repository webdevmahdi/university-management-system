import express from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validateData from "../../middlewares/validationSchema";

const router = express.Router();

router.post('/create-student', validateData(createStudentValidationSchema), UserControllers.createStudent);

export const userRouters = router;