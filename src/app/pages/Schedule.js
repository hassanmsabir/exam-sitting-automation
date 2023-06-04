import React, { useEffect, useRef, useState } from "react";
import { actionAPI, useSharedDispatcher, useSharedSelector } from "../shared";
import { Modal, Spin } from "antd";
import SeatingArrangementTable from "../components/TeacherView/SeatingArrangementTable";
import ReactToPrint from "react-to-print";

const Schedule = () => {
  const {
    ExamSchedulesListing,
    ExamSchedulesListingLoading,
    ExamSchedulesListingSuccess,
  } = useSharedSelector((state) => state.ListAllExamSchedules);
  const [totalStudents, setTotalStudents] = useState(0);
  const [isViewSeatingPlanModalOpen, setIsViewSeatingPlanModalOpen] =
    useState(false);
  const [selectedSeatingPlan, setSelectedSeatingPlan] = useState([]);

  const apiDispatcher = useSharedDispatcher();
  useEffect(() => {
    apiDispatcher(actionAPI.getAllExamSchedules());
  }, []);
  useEffect(() => {
    if (ExamSchedulesListing) {
      let totalStudentsCount = totalStudents;
    }
  }, [ExamSchedulesListing]);
  const componentRef = useRef();
  return (
    <>
      <h3>View The Scheduled Exams here</h3>
      <hr />
      <div className="d-flex flex-wrap">
        {!ExamSchedulesListingLoading ? (
          ExamSchedulesListing ? (
            ExamSchedulesListing?.entry?.map((item) => {
              return (
                <div className="exam-card m-3">
                  <div className="card-header bg-success d-flex flex-wrap justify-content-between p-2">
                    <p className="exam-name text-light fs-6 fw-bold m-0">
                      {item?.examName}
                    </p>
                    <p className="exam-date text-light fs-6 fw-bold m-0">
                      {item?.examDate} - {item?.examTime}
                    </p>
                  </div>
                  <div className="card-body d-flex flex-wrap justify-content-between bg-light p-2">
                    <div className="card-body-right">
                      <p className="">
                        <span className="fw-bold me-1">Teacher:</span>
                        <span className="fs-6 me-1">
                          {item?.classesData?.map(
                            (classData) => `${classData?.teacherName}, `
                          )}
                        </span>
                      </p>
                      <p className="">
                        <span className="fw-bold me-1">Class/es:</span>
                        <span className="fs-6 me-1">
                          {item?.classesData?.map(
                            (classData) => `${classData?.batchName}, `
                          )}
                        </span>
                      </p>
                      <p className="">
                        <span className="fw-bold me-1">Student/s:</span>
                        <span className="fs-6 me-1">
                          {item?.classesData?.map(
                            (classData) => `${classData?.batchName}, `
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="card-body-center">
                      <p className="">
                        <span className="fw-bold me-1">Seats:</span>
                      </p>
                      <p className="">
                        <span className="fw-bold me-1">Room:</span>
                        <span className="fs-6 me-1">{item?.hallName}</span>
                      </p>
                    </div>
                    <div className="card-body-left">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setIsViewSeatingPlanModalOpen(true);
                          setSelectedSeatingPlan(item);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Exam Schedule Data</p>
          )
        ) : (
          <div className="w-100 d-flex justify-content-center p-4">
            <Spin />
          </div>
        )}
      </div>

      <Modal
        open={isViewSeatingPlanModalOpen}
        onOk={() => setIsViewSeatingPlanModalOpen(false)}
        onCancel={() => setIsViewSeatingPlanModalOpen(false)}
        // cancelButtonProps={{ style: { display: "none" } }}
        title="View Seating Plan"
        width={1000}
        style={{ height: 700 }}
      >
        <SeatingArrangementTable
          resultSchedule={{ seating: selectedSeatingPlan?.seatingArrangement }}
          data={selectedSeatingPlan}
        />
      </Modal>
    </>
  );
};

export default Schedule;
