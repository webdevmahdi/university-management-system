import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

const getAllCourseFromDb = async (query: Record<string,unknown>) => {
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
    const result = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {new: true, runValidators: true}
        );

        if(preRequisiteCourses && preRequisiteCourses.length > 0){
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {$pull: {preRequisiteCourses: {course: {$in: deletedPreRequisites}}}}
            )
            console.log(deletedPreRequisites)
        }

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
    deleteCourseFromDb
}