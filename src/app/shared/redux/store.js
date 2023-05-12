import { configureStore } from "@reduxjs/toolkit";
import {
  ListUsers,
  LoginUserData,
  ListAllTeachers,
  ListAllCourses,
  ListAllBatchesWithSections,
  ListAllBatches,
  ListAllCourseMaps,
  ListAllStudents,
  ListAllExamHalls,
  ListAllExamSchedules,
} from "./actions";

export const store = configureStore({
  reducer: {
    ListUsers,
    LoginUserData,
    ListAllTeachers,
    ListAllCourses,
    ListAllBatchesWithSections,
    ListAllBatches,
    ListAllCourseMaps,
    ListAllStudents,
    ListAllExamHalls,
    ListAllExamSchedules,
  },
});
