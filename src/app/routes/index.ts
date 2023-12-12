import { Router } from "express";
import { userRouters } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.router";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.router";
import { AcademicFacultyRouters } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouters } from "../modules/academicDepartment/academicDepartment.router";
import { FacultyRouters } from "../modules/faculty/faculty.router";
import { AdminRouters } from "../modules/Admin/admin.route";
import { CourseRouters } from "../modules/course/course.router";

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
        path: '/faculties',
        route: FacultyRouters,
      },
      {
        path: '/admins',
        route: AdminRouters,
      },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRouters,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRouters,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRouters,
    },
    {
        path: '/courses',
        route: CourseRouters,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;