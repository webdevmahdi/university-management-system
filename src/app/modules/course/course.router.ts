import express from 'express';
import validateData from '../../middlewares/validationSchema';
import { courseValidationSchemas } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post('/create-course', validateData(courseValidationSchemas.courseValidationSchema), CourseControllers.createCourseController)
router.get('/', CourseControllers.getAllCoursesController);
router.get('/:id', CourseControllers.getSingleCourseController);
router.delete('/:id', CourseControllers.deleteCourseController);

export const CourseRouters = router;