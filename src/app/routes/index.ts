import { Router } from "express";
import { userRouters } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.router";

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;