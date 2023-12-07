import { Student } from "./student.model"

const getAllStudents = async () => {
    const result = await Student.find();
    return result;
}
const getSingleStudents = async (id: string) => {
    const result = await Student.aggregate([
        {$match: {id}}
    ])
    return result;
}
// const getSingleStudents = async (id: string) => {
//     const result = await Student.findOne({id});
//     return result;
// }
const deleteStudent = async ( id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
}

export const StudentService = {
    getAllStudents, 
    getSingleStudents,
    deleteStudent
}
