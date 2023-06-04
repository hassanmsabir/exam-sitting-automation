import React from "react";

const PrintHeader = ({
  examName = "",
  examClasses = "",
  examTeachers = "",
  examDate = "",
  examHall = "",
  examTime = "",
  examCourses = "",
  printActive = false,
}) => {
  return (
    <div
      className={"print-header p-5 " + (printActive ? " d-block " : " d-none ")}
    >
      <h4 className="print-main-heading text-center">
        A visual Analytic System For Examination
      </h4>
      <div className="print-rest-header">
        <div className="d-flex justify-content-between">
          <p className="text-secondary">
            <b>Exam Name: </b> <span>{examName}</span>
          </p>
          <p className="text-secondary">
            <b>Classes: </b> <span>{examClasses}</span>
          </p>
          <p className="text-secondary">
            <b>Date/Time: </b>{" "}
            <span>
              {examDate} - {examTime}
            </span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-secondary">
            <b>Hall: </b> <span>{examHall}</span>
          </p>
          <p className="text-secondary">
            <b>Course: </b> <span>{examCourses}</span>
          </p>
          <p className="text-secondary">
            <b>Teachers: </b> <span>{examTeachers}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintHeader;
