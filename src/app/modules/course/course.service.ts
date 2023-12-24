import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.modelQuery;
    return result;
}

const getSingleCourseFromDb = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    // use transaction and rollback
    const session = await mongoose.startSession();

    try {
        await session.startTransaction()
        const updateRemainingCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            { new: true, runValidators: true, session }
        );
        if (!updateRemainingCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, `Failed to update ${courseRemainingData}`)
        }
        
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course);
            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                { $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } } },
                { new: true, runValidators: true, session }
            )
            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, `Failed to delete pre requisite course`)
            }

            const newPreRequisite = preRequisiteCourses.filter(el => el.course && !el.isDeleted);
            const addPreRequisiteCourse = await Course.findByIdAndUpdate(
                id,
                { $addToSet: { preRequisiteCourses: { $each: newPreRequisite } } },
                { new: true, runValidators: true, session }
            )
            if (!addPreRequisiteCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, `Failed to add pre requisite course`)
            }
        }

        await session.commitTransaction()
        await session.endSession()
        const result = await Course.findById(id).populate('preRequisiteCourses.course')
        return result;
    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course.')
    }

}

const assignFacultyWithCourseIntoDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } },
        },
        {
            upsert: true,
            new: true,
        },
    );
    return result;
}

const removeFacultyFromCourseFromDb = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } }
        },
        {
            new: true,
        },
    );
    return result;
}

const deleteCourseFromDb = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};


export const CourseServices = {
    createCourseIntoDb,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    updateCourseIntoDb,
    assignFacultyWithCourseIntoDb,
    removeFacultyFromCourseFromDb,
    deleteCourseFromDb
}