import mongoose from "mongoose";
import { Student } from "./student.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./student.constant";

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
    // const queryObj = { ...query };
    // let searchTerm = '';
    // if (query?.searchTerm) {
    //     searchTerm = query.searchTerm as string;
    // }
    // const searchQuery = Student.find({
    //     $or: searchableFields.map((field) => ({
    //         [field]: { $regex: searchTerm, $options: 'i' }
    //     }))
    // });

    // const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludedFields.forEach(el => {
    //     delete queryObj[el]
    // });
    // console.log({ query }, { queryObj })

    // const filterQuery = searchQuery.find(queryObj)
    //     .populate('admissionSemester')
    //     .populate({
    //         path: 'academicDepartment',
    //         populate: {
    //             path: 'academicFaculty'
    //         }
    //     });

    // let sort = '-createdAt';
    // if (query.sort) {
    //     sort = query.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort)

    // let page = 1;
    // let skip = 0;
    // let limit = 1;

    // if (query.limit) {
    //     limit = Number(query.limit);
    // }
    // if (query.page) {
    //     page = Number(query.page)
    //     skip = (page - 1) * limit;
    // }
    // const paginateQuery = sortQuery.skip(skip);
    // const limitedQuery = paginateQuery.limit(limit);

    // let fields = '-__v';
    // if (query.fields) {
    //     fields = (query.fields as string).split(',').join(' ');
    //     console.log({ fields })
    // }

    // const fieldQuery = await limitedQuery.select(fields)
    // return fieldQuery;

    const studentQuery = new QueryBuilder(Student.find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        }), query).search(searchableFields).filter().sort().paginate().fields();
    const result = await studentQuery.modelQuery;
    return result;
}
const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findById(id)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
    return result;
}
const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {

    const { name, localGuardian, guardian, ...remainingStudentData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }


    const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidator: true
    })
    return result;
}
const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await Student.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
        }

        const userId = deletedStudent.user;
        const deletedUser = await User.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }
};

export const StudentService = {
    getAllStudentsFromDb,
    getSingleStudentFromDb,
    updateStudentIntoDb,
    deleteStudentFromDB
}
