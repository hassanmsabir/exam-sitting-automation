import { getMyUserAPI } from "./actions/UserActions/ListUsers";
import { getAllTeachersAPI } from "./actions/TeacherActions/ListAllTeachers";
import { getAllCoursesAPI } from "./actions/CourseActions/ListAllCourses";
import {
  loginUserAPI,
  loginUserResetData,
} from "./actions/AuthenticateUser/Login";
import { getAllBatchesWithSectionsAPI } from "./actions/BatchActions/GetAllBatchesWithSections";
import { getAllBatchesAPI } from "./actions/BatchActions/GetAllBatches";
import { getAllCourseMapsAPI } from "./actions/CourseActions/ListAllCourseMaps";
import { getAllStudentsAPI } from "./actions/StudentActions/ListAllStudents";

export const actionAPI = {
  getMyUserAPI,
  loginUserAPI,
  loginUserResetData,
  getAllTeachersAPI,
  getAllCoursesAPI,
  getAllBatchesWithSectionsAPI,
  getAllBatchesAPI,
  getAllCourseMapsAPI,
  getAllStudentsAPI,
};
