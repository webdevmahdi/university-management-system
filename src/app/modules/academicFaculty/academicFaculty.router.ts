import express from "express";
import validateData from "../../middlewares/validationSchema";
import { AcademicFacultyValidations } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post('/create-faculty', validateData(AcademicFacultyValidations.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFacultyController);

router.get('/', AcademicFacultyControllers.getAllAcademicFacultiesController);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFacultyController);

router.patch('/:facultyId', validateData(AcademicFacultyValidations.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateSingleAcademicFacultyController);

export const AcademicFacultyRouters = router;