import httpStatus from "http-status";
import sendResponse from "../../utils/response";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import catchAsync from "../../utils/catchAsync";


const createAcademicDepartmentController = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department has created successfully.',
        data: result,
    })
});
const getAllAcademicDepartmentController = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Departments are retrieved successfully.',
        data: result,
    })
});
const getSingleAcademicDepartmentController = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department has retrieved successfully.',
        data: result,
    })
});
const updateAcademicDepartmentController = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department has updated successfully.',
        data: result,
    })
});


export const AcademicDepartmentControllers = {
    createAcademicDepartmentController,
    getAllAcademicDepartmentController,
    updateAcademicDepartmentController,
    getSingleAcademicDepartmentController,
}