import express from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validateData from "../../middlewares/validationSchema";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

router.post('/create-student', validateData(createStudentValidationSchema), UserControllers.createStudent);
router.post(
    '/create-faculty',
    validateData(createFacultyValidationSchema),
    UserControllers.createFaculty,
  );
  
  router.post(
    '/create-admin',
    validateData(createAdminValidationSchema),
    UserControllers.createAdmin,
  );
export const userRouters = router;