import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/response";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFacultyController = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty has created Successfully!",
        data: result
    })
})
const getAllAcademicFacultiesController = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Here are all the academic faculties.",
        data: result
    })
})
const getSingleAcademicFacultyController = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Here is a single faculty.",
        data: result
    })
})
const updateSingleAcademicFacultyController = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateSingleAcademicFacultyIntoDb(facultyId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Here is a single faculty.",
        data: result
    })
})


export const AcademicFacultyControllers = {
    createAcademicFacultyController,
    getAllAcademicFacultiesController,
    getSingleAcademicFacultyController,
    updateSingleAcademicFacultyController
}