import { Spin } from "antd";
import React, { useEffect } from "react";

const TeacherCoursesList = ({ coursesData }) => {
  console.log("coursessssss", coursesData?.entry);
  return (
    <>
      <h5>Your Current Courses include</h5>

      <div className="courses-list container d-flex flex-wrap gap-4 justify-content-center">
        {coursesData ? (
          coursesData?.total > 0 ? (
            coursesData.entry?.map((item) => {
              return (
                <div className="card " style={{ width: "18rem" }}>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <p className="d-flex justify-content-between">
                      <span className="fw-bold ">{item.courseAbreviation}</span>
                      <span className="subject-card-batchName">
                        {item.batchName} - {item.sectionName}
                      </span>
                    </p>
                    <h6 className="card-title">{item.courseTitle}</h6>
                    <hr />
                    <h6 className="text-center">50 total students</h6>
                    <h6 className="text-center">2 Classes</h6>
                    <span className="btn btn-primary w-100">Register Exam</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Data Found</p>
          )
        ) : (
          <Spin />
        )}
      </div>
    </>
  );
};

export default TeacherCoursesList;
