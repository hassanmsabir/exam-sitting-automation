import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import SeatingArrangementTable from "./SeatingArrangementTable";
import ExamScheduleForm from "./ExamScheduleForm";
import TeacherCoursesList from "./TeacherCoursesList";
import Settings from "../../shared/redux/config/Settings";

const TeacherDashboardView = () => {
  const [coursesTeachingList, setCoursesTeachingList] = useState(null);
  const [resultSchedule, setResultSchedule] = useState(null);

  const listDownCourses = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      Settings.apiUrl +
        "listAllCoursesWithATeacher/" +
        JSON.parse(localStorage.getItem("userToken")).userId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCoursesTeachingList(result);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    // list down the courses registered with This teacher.
    listDownCourses();
  }, []);
  useEffect(() => {
    console.log(coursesTeachingList);
  }, [coursesTeachingList]);
  return (
    <div className="main-box p-2">
      <h3 className="mb-5">
        Welcome, {JSON.parse(localStorage.getItem("userToken"))?.fullname}
      </h3>
      <TeacherCoursesList coursesData={coursesTeachingList} />
      <hr />
      <ExamScheduleForm
        coursesData={coursesTeachingList}
        resultSchedule={resultSchedule}
        setResultSchedule={setResultSchedule}
      />

      <hr />
      {resultSchedule && (
        <SeatingArrangementTable
          resultSchedule={resultSchedule}
          setResultSchedule={setResultSchedule}
        />
      )}
    </div>
  );
};

export default TeacherDashboardView;
