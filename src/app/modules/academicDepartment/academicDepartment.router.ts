import express from "express";
import validateData from "../../middlewares/validationSchema";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post('/create-department', 
// validateData(AcademicDepartmentValidations.academicDepartmentValidationSchema), 
AcademicDepartmentControllers.createAcademicDepartmentController);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartmentController);

router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartmentController);

router.patch('/:departmentId', validateData(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartmentController);

export const AcademicDepartmentRouters = router;