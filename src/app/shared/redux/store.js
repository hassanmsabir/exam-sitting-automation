import { configureStore } from "@reduxjs/toolkit";
import {
  ListUsers,
  LoginUserData,
  ListAllTeachers,
  ListAllCourses,
} from "./actions";

export const store = configureStore({
  reducer: {
    ListUsers,
    LoginUserData,
    ListAllTeachers,
    ListAllCourses,
  },
});
