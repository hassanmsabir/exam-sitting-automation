import { DatePicker, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import Settings from "../../shared/redux/config/Settings";
import {
  actionAPI,
  useSharedDispatcher,
  useSharedSelector,
} from "../../shared";

const ExamScheduleForm = ({
  coursesData,
  resultSchedule,
  setResultSchedule,
}) => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("Morning");
  const [batchId, setBatchId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [hallId, setHallId] = useState("");
  const [noOfSeats, setNoOfSeats] = useState(0);
  const apiDispatcher = useSharedDispatcher();
  const { ExamHallsListing, ExamHallsListingSuccess, ExamHallsListingFailed } =
    useSharedSelector((state) => state.ListAllExamHalls);
  const handleScheduleBtnClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      batchId,
      sectionId,
      hallId,
      examName,
      courseId,
      examDate,
      examTime,
      teacherId: JSON.parse(localStorage.getItem("userToken")).userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "seating-arrangement-mylogic2", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResultSchedule(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    apiDispatcher(actionAPI.getAllExamHalls());
  }, []);
  useEffect(() => {
    if (ExamHallsListing) {
      setHallId(ExamHallsListing[0]._id);
      setNoOfSeats(ExamHallsListing[0].numRows * ExamHallsListing[0].numCols);
    }
  }, [ExamHallsListing]);
  return (
    <>
      <p className="text-center fs-3">Schedule an Exam</p>
      <div className="d-flex flex-wrap">
        <div className="w-100 p-4">
          <p className="fs-6 fw-bold">Course with Class</p>
          <Select
            className="w-100"
            defaultValue={""}
            onChange={(e) => {
              console.log(coursesData);
              setSectionId(coursesData.entry[e]?.sectionId);
              setBatchId(coursesData.entry[e]?.batchId);
              setCourseId(coursesData.entry[e]?.courseId);
            }}
          >
            <Option value="">Select</Option>
            {coursesData &&
              coursesData?.entry?.map((data, index) => (
                <Option value={index}>
                  {data.courseAbreviation +
                    " - " +
                    data.batchName +
                    " - " +
                    data.programName +
                    " - Section " +
                    data.sectionName}
                </Option>
              ))}
          </Select>
        </div>

        <div className="w-50 p-4">
          <p className="fs-6 fw-bold">Exam Name</p>
          <Input
            placeholder="Enter Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>
        <div className="w-50 p-4">
          <p className="fs-6 fw-bold">Exam Hall Name</p>
          <Select
            className="w-100"
            value={hallId}
            onChange={(e) => {
              setHallId(e);
              ExamHallsListing.map((item) => {
                if (item._id === e) {
                  setNoOfSeats(item.numRows * item.numCols);
                }
              });
            }}
          >
            <Option value="">Select</Option>
            {ExamHallsListing &&
              ExamHallsListing?.map((hall) => (
                <Option value={hall._id}>{hall.hallName}</Option>
              ))}
          </Select>
          <p className="">Seats: {noOfSeats}</p>
        </div>
        <div className="w-50 p-4">
          <p className="fs-6 fw-bold">Exam Date</p>
          <DatePicker
            className="w-100"
            format={"DD-MM-YYYY"}
            onChange={(e, eStr) => setExamDate(eStr)}
          />
        </div>
        <div className="w-50 p-4">
          <p className="fs-6 fw-bold">Exam Time</p>
          <Select
            className="w-100"
            value={examTime}
            onChange={(e) => setExamTime(e)}
          >
            <Option value="Morning">Morning (9:00/9:30 - 12:00/12:30)</Option>
            <Option value="Evening">Evening (2:00/2:30 - 5:00/5:30)</Option>
          </Select>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button onClick={handleScheduleBtnClick} className="btn btn-primary">
            Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamScheduleForm;
