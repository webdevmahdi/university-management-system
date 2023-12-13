import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { CourseServices } from "./course.service";

const createCourseController = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has created Successfully!",
        data: result
    })
})

const getAllCoursesController = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourseFromDb(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Here are all the courses.",
        data: result
    })
})

const getSingleCourseController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Here is your course.",
        data: result
    })
})

const updateCourseController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDb(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is updated successfully",
        data: result
    })
})

const deleteCourseController = catchAsync(async(req, res)=>{
    const {id} = req.params;
    const result = await CourseServices.deleteCourseFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course deleted successfully",
        data: result
    })
    return result;
})

export const CourseControllers = {
    createCourseController,
    getAllCoursesController,
    getSingleCourseController,
    updateCourseController,
    deleteCourseController
}