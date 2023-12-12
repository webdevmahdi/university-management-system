import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student'
        }, {
        id: 1,
        _id: 0,
    })
    .sort({
        createdAt: -1
    })
    .lean();
    return lastStudent?.id ? lastStudent.id : undefined;
}
export const generateStudentId = async (payload: TAcademicSemester) => {
    const lastStudentId = await findLastStudent();
    const lastStudentYear = lastStudentId?.substring(0,4);
    const lastStudentSemesterCode = lastStudentId?.substring(4,6);
    const currentStudentYear = payload.year;
    const currentStudentSemesterCode = payload.code;
    
    let currentId = (0).toString().padStart(4, '0');
    if(lastStudentId && lastStudentSemesterCode === currentStudentSemesterCode && lastStudentYear === currentStudentYear){
        currentId = lastStudentId.substring(6)
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
}

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
