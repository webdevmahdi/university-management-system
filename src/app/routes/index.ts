import { Router } from "express";
import { userRouters } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.router";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.router";
import { AcademicFacultyRouters } from "../modules/academicFaculty/academicFaculty.router";

const router = Router();


const moduleRoutes = [
    {
        path: '/users',
        route: userRouters
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRouters,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRouters,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;