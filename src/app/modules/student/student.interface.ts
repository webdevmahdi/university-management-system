import { Model, Types } from "mongoose";

export type TStudentName = {
    firstName: string;
    middleName?: string;
    lastName: string
};
export type TGuardian = {
    fathersName: string;
    fathersOccupation: string;
    fathersContactNo: string
    mothersName: string;
    mothersOccupation: string;
    mothersContactNo: string
}
export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export type TStudent = {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: TStudentName;
    gender: "Male" | "Female" | "Others";
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    admissionSemester: Types.ObjectId;
    isDeleted: boolean;
    academicDepartment: Types.ObjectId;
}


export interface StudentModel extends Model<TStudent> {
    // eslint-disable-next-line no-unused-vars
    isStudentExists(id: string): Promise<TStudent | null>
}


// For custom instance
// export type StudentMethods = {
//     isStudentExists(id: string) : Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>