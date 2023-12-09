import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateData from '../../middlewares/validationSchema';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester', validateData(AcademicSemesterValidations.AcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
router.get('/:semesterId', AcademicSemesterControllers.getSingleSemester)

export const AcademicSemesterRouters = router;