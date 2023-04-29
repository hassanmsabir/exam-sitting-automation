import { getMyUserAPI } from "./actions/UserActions/ListUsers";
import { getAllTeachersAPI } from "./actions/TeacherActions/ListAllTeachers";
import { getAllCoursesAPI } from "./actions/CourseActions/ListAllCourses";
import {
  loginUserAPI,
  loginUserResetData,
} from "./actions/AuthenticateUser/Login";

export const actionAPI = {
  getMyUserAPI,
  loginUserAPI,
  loginUserResetData,
  getAllTeachersAPI,
  getAllCoursesAPI,
};
