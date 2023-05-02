import React, { useEffect, useState } from "react";
import AdminViewMainList from "./AdminViewMainList";
import { Checkbox, DatePicker, Input, Modal, Select, notification } from "antd";
import TitlesList from "../../shared/constant/TitlesList";
import moment from "moment/moment";
import {
  actionAPI,
  useSharedDispatcher,
  useSharedSelector,
} from "../../shared";
import AdminTableView from "./AdminTableView";
import Settings from "../../shared/redux/config/Settings";
import { Option } from "antd/es/mentions";
import GPAList from "../../shared/constant/GpaList";

const AdminDashboardView = () => {
  const apiDispatcher = useSharedDispatcher();
  const { TeacherListing, TeacherListingSuccess, TeacherListingLoading } =
    useSharedSelector((state) => state.ListAllTeachers);
  const { CourseListing, CourseListingSuccess, CourseListingLoading } =
    useSharedSelector((state) => state.ListAllCourses);
  const { StudentsListing, StudentsListingSuccess, StudentsListingLoading } =
    useSharedSelector((state) => state.ListAllStudents);

  const {
    BatchesWithSectionsListing,
    BatchesWithSectionsListingSuccess,
    BatchesWithSectionsListingLoading,
  } = useSharedSelector((state) => state.ListAllBatchesWithSections);
  const { BatchesListing, BatchesListingSuccess, BatchesListingLoading } =
    useSharedSelector((state) => state.ListAllBatches);
  const { CourseMapListing, CourseMapListingSuccess, CourseMapListingLoading } =
    useSharedSelector((state) => state.ListAllCourseMaps);
  const [addNewTeacherModalOpen, setAddNewTeacherModalOpen] = useState(false);
  const [addNewCourseModalOpen, setAddNewCourseModalOpen] = useState(false);
  const [addNewStudentModalOpen, setAddNewStudentModalOpen] = useState(false);
  const [addNewBatchModalOpen, setAddNewBatchModalOpen] = useState(false);
  const [addNewCourseMapModalOpen, setAddNewCourseMapModalOpen] =
    useState(false);

  const [newTeacherTitle, setNewTeacherTitle] = useState("Mr");
  const [newTeacherTitleErrMsg, setNewTeacherTitleErrMsg] = useState("");
  const [newTeacherFirstName, setNewTeacherFirstName] = useState("");
  const [newTeacherFirstNameErrMsg, setNewTeacherFirstNameErrMsg] =
    useState("");
  const [newTeacherLastName, setNewTeacherLastName] = useState("");
  const [newTeacherGender, setNewTeacherGender] = useState("Male");
  const [newTeacherGenderErrMsg, setNewTeacherGenderErrMsg] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherEmailErrMsg, setNewTeacherEmailErrMsg] = useState("");
  const [newTeacherUsername, setNewTeacherUsername] = useState("");
  const [newTeacherUsernameErrMsg, setNewTeacherUsernameErrMsg] = useState("");
  const [newTeacherPassword, setNewTeacherPassword] = useState("");
  const [newTeacherPasswordErrMsg, setNewTeacherPasswordErrMsg] = useState("");
  const [newTeacherConfirmPassword, setNewTeacherConfirmPassword] =
    useState("");
  const [newTeacherConfirmPasswordErrMsg, setNewTeacherConfirmPasswordErrMsg] =
    useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseCodeErrMsg, setNewCourseCodeErrMsg] = useState("");

  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseTitleErrMsg, setNewCourseTitleErrMsg] = useState("");
  const [newCourseCreditHours, setNewCourseCreditHours] = useState(3);
  const [newCourseCreditHoursErrMsg, setNewCourseCreditHoursErrMsg] =
    useState("");
  const [newCourseAbreviation, setNewCourseAbreviation] = useState("");

  const [newBatchName, setNewBatchName] = useState("SP");
  const [newBatchNameErrMsg, setNewBatchNameErrMsg] = useState("");

  const [newBatchYear, setNewBatchYear] = useState();
  const [newBatchYearErrMsg, setNewBatchYearErrMsg] = useState("");

  const [newBatchStartDate, setNewBatchStartDate] = useState(null);
  const [newBatchStartDateErrMsg, setNewBatchStartDateErrMsg] = useState("");

  const [newBatchEndDate, setNewBatchEndDate] = useState(null);
  const [newBatchEndDateErrMsg, setNewBatchEndDateErrMsg] = useState("");
  const [newBatchSectionAChecked, setNewBatchSectionAChecked] = useState(false);
  const [newBatchSectionBChecked, setNewBatchSectionBChecked] = useState(false);
  const [newBatchSectionCChecked, setNewBatchSectionCChecked] = useState(false);

  const [totalTeachersCount, setTotalTeachersCount] = useState(0);
  const [courseMappingCourseId, setCourseMappingCourseId] = useState(null);
  const [courseMappingCourseIdErrMsg, setCourseMappingCourseIdErrMsg] =
    useState("");
  const [courseMappingTeacherId, setCourseMappingTeacherId] = useState(null);
  const [courseMappingTeacherIdErrMsg, setCourseMappingTeacherIdErrMsg] =
    useState("");
  const [courseMappingBatchId, setCourseMappingBatchId] = useState(null);
  const [courseMappingBatchIdErrMsg, setCourseMappingBatchIdErrMsg] =
    useState("");
  const [courseMappingSectionId, setCourseMappingSectionId] = useState(null);
  const [courseMappingSectionIdErrMsg, setCourseMappingSectionIdErrMsg] =
    useState("");
  const [courseMappingCurrentStatus, setCourseMappingCurrentStatus] =
    useState("active");
  const [
    courseMappingCurrentStatusErrMsg,
    setCourseMappingCurrentStatusErrMsg,
  ] = useState("");
  const [sectionsListFromAPI, setSectionsListFromAPI] = useState(null);
  const [activeType, setActiveType] = useState("teachersTable");

  const [addNewStudentData, setAddNewStudentData] = useState({
    firstname: "",
    lastname: "",
    title: "Mr",
    gender: "male",
    program: "",
    semesterType: "",
    regNo: "",
    gpa: 3.5,
    batchId: "",
    sectionId: "",
    subjectIds: [],
  });
  const [addNewStudentDataErrMsg, setAddNewStudentDataErrMsg] = useState({
    firstname: "",
    lastname: "",
    title: "",
    gender: "",
    program: "",
    semesterType: "",
    regNo: "",
    gpa: "",
    batchId: "",
    sectionId: "",
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement,
    type,
    message = "",
    description = ""
  ) => {
    api[type]({
      message: message,
      description: description,
      placement,
    });
  };
  const validateRegisterNewStudent = () => {
    let errCaught = false;

    if (addNewStudentData.firstname.trim() === "") {
      // setNewTeacherTitleErrMsg("Firstname cannot be empty");
      errCaught = true;
    }
    if (addNewStudentData.title.trim() === "") {
      // setNewTeacherFirstNameErrMsg("First Name cannot be empty");
      errCaught = true;
    }
    if (addNewStudentData.batchId.trim() === "") {
      // setNewTeacherEmailErrMsg("Please select a Batch");
      errCaught = true;
    }
    if (addNewStudentData.gender.trim() === "") {
      // setNewTeacherPasswordErrMsg("Please select a gender");
      errCaught = true;
    }
    if (addNewStudentData.gpa === 0) {
      // setNewTeacherPasswordErrMsg("Student GPA is required");
      errCaught = true;
    }
    if (addNewStudentData.program.trim() === "") {
      // setNewTeacherUsernameErrMsg("Program cannot be empty");
      errCaught = true;
    }
    if (addNewStudentData.semesterType.trim() === "") {
      // setNewTeacherGenderErrMsg("Please select a Batch");
      errCaught = true;
    }

    return errCaught;
  };

  const handleRegisterNewStudent = () => {
    if (validateRegisterNewStudent()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstname: addNewStudentData.firstname,
      lastname: addNewStudentData.lastname,

      fullname: `${addNewStudentData.firstname} ${addNewStudentData.lastname}`,
      gender: addNewStudentData.gender,
      program: addNewStudentData.program,
      semesterType: addNewStudentData.semesterType,
      fullReg: `${addNewStudentData.semesterType}-${addNewStudentData.program}-${addNewStudentData.regNo}`,

      batchId: addNewStudentData.batchId,
      sectionId: addNewStudentData.sectionId,
      subjectIds: addNewStudentData.subjectIds,
      gpa: addNewStudentData.gpa,
      regNo: addNewStudentData.regNo,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "newstudent", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result === "Student Registered Successfully") {
          openNotification("topRight", "success", "Student Added", result);
          apiDispatcher(actionAPI.getAllStudentsAPI());
          setAddNewTeacherModalOpen(false);
        } else if (result?.error) {
          openNotification("topRight", "error", "Failed", result.error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const validateNewTeacherReq = () => {
    let errCaught = false;

    if (newTeacherTitle.trim() === "") {
      setNewTeacherTitleErrMsg("Title cannot be empty");
      errCaught = true;
    }
    if (newTeacherFirstName.trim() === "") {
      setNewTeacherFirstNameErrMsg("First Name cannot be empty");
      errCaught = true;
    }
    if (newTeacherEmail.trim() === "") {
      setNewTeacherEmailErrMsg("Email cannot be empty");
      errCaught = true;
    }
    if (newTeacherPassword.trim() === "") {
      setNewTeacherPasswordErrMsg("Password cannot be empty");
      errCaught = true;
    }
    if (newTeacherConfirmPassword.trim() === "") {
      errCaught = true;
    }
    if (newTeacherUsername.trim() === "") {
      setNewTeacherUsernameErrMsg("Username cannot be empty");
      errCaught = true;
    }
    if (newTeacherGender.trim() === "") {
      setNewTeacherGenderErrMsg("Please select a Gender to proceed");
      errCaught = true;
    }
    if (newTeacherPassword !== newTeacherConfirmPassword) {
      setNewTeacherConfirmPasswordErrMsg("Passwords do not match");
      errCaught = true;
    }
    return errCaught;
  };

  const handleNewTeacherSubmit = () => {
    if (validateNewTeacherReq()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: newTeacherTitle,
      firstName: newTeacherFirstName,
      lastName: newTeacherLastName,
      gender: newTeacherGender,
      email: newTeacherEmail,
      username: newTeacherUsername,
      password: newTeacherPassword,
      role: "teacher",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "addTeacher", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result === "New teacher Registered Successfully") {
          openNotification("topRight", "success", "Teacher Added", result);
          apiDispatcher(actionAPI.getAllTeachersAPI());
          setAddNewTeacherModalOpen(false);
        } else if (result?.error) {
          openNotification("topRight", "error", "Failed", result.error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const validateNewCourseReq = () => {
    let errCaught = false;

    if (newCourseTitle.trim() === "") {
      setNewCourseTitleErrMsg("Title cannot be empty");
      errCaught = true;
    }
    if (newCourseCode.trim() === "") {
      setNewCourseCodeErrMsg("Course Code cannot be empty");
      errCaught = true;
    }
    return errCaught;
  };

  const handleNewCourseSubmit = () => {
    if (validateNewCourseReq()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      courseCode: newCourseCode.toUpperCase(),
      courseTitle: newCourseTitle,
      courseCreditHours: newCourseCreditHours,
      courseAbreviation: newCourseAbreviation.toUpperCase(),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "addCourse", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result === "New Course Registered Successfully") {
          openNotification("topRight", "success", "Teacher Added", result);
          apiDispatcher(actionAPI.getAllCoursesAPI());
          setAddNewCourseModalOpen(false);
        } else if (result?.error) {
          openNotification("topRight", "error", "Failed", result.error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const validateNewBatchReq = () => {
    let errCaught = false;

    if (newBatchName.trim() === "") {
      setNewBatchNameErrMsg("Batch Name cannot be empty");
      errCaught = true;
    }
    if (newBatchYear.trim() === "") {
      newBatchYearErrMsg("Batch Year cannot be empty");
      errCaught = true;
    }
    return errCaught;
  };
  const handleNewBatchSubmit = () => {
    if (validateNewBatchReq()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      batchName: newBatchName + newBatchYear.charAt(2) + newBatchYear.charAt(3),
      batchStartDate: "",
      batchEndDate: "",
      sectionA: true,
      sectionB: newBatchSectionBChecked,
      sectionC: newBatchSectionCChecked,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "addBatch", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result === "New Batch Registered Successfully") {
          openNotification("topRight", "success", "Created", result);
          apiDispatcher(actionAPI.getAllBatchesWithSectionsAPI());
          setAddNewBatchModalOpen(false);
        } else {
          openNotification("topRight", "error", "Failed", result?.error);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const validateRegisterNewCourseWithTeacher = () => {
    let errCaught = false;

    if (!courseMappingCourseId) {
      setCourseMappingCourseIdErrMsg("Please select a Course");
      errCaught = true;
    }
    if (!courseMappingBatchId) {
      setCourseMappingBatchIdErrMsg("Batch is required");
      errCaught = true;
    }
    if (!courseMappingSectionId) {
      setCourseMappingSectionIdErrMsg("Section is required");
      errCaught = true;
    }
    if (!courseMappingTeacherId) {
      setCourseMappingTeacherIdErrMsg("Teacher is required");
      errCaught = true;
    }
    if (!courseMappingCurrentStatus) {
      setCourseMappingCurrentStatusErrMsg("Status is required");
      errCaught = true;
    }

    return errCaught;
  };
  const handleRegisterNewCourseWithTeacher = () => {
    if (validateRegisterNewCourseWithTeacher()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      courseId: courseMappingCourseId,
      teacherId: courseMappingTeacherId,
      batchId: courseMappingBatchId,
      sectionId: courseMappingSectionId,
      currentStatus: courseMappingCurrentStatus,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "addCourseMap", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result === "New Course Map Registered Successfully") {
          openNotification("topRight", "success", "Created", result);
          apiDispatcher(actionAPI.getAllCourseMapsAPI());
          setAddNewCourseMapModalOpen(false);
        } else {
          openNotification("topRight", "error", "Failed", result?.error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleBatchChangeInCourseMapModal = (e, semesterType = "") => {
    setCourseMappingBatchId(e);
    setSectionsListFromAPI(null);
    setCourseMappingSectionId(null);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "listAllSectionsWithABatch/" + e, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSectionsListFromAPI(result);
        setAddNewStudentData({
          ...addNewStudentData,
          batchId: e,
          semesterType: semesterType,
          sectionId: result?.entry[0]?._id,
        });
      })
      .catch((error) => {
        setSectionsListFromAPI(null);
      });
  };
  useEffect(() => {
    apiDispatcher(actionAPI.getAllTeachersAPI());
    apiDispatcher(actionAPI.getAllCoursesAPI());
    apiDispatcher(actionAPI.getAllBatchesWithSectionsAPI());
    apiDispatcher(actionAPI.getAllBatchesAPI());
    apiDispatcher(actionAPI.getAllCourseMapsAPI());
    apiDispatcher(actionAPI.getAllStudentsAPI());
  }, []);
  useEffect(() => {
    if (TeacherListingSuccess && TeacherListing.total) {
      setTotalTeachersCount(TeacherListing?.total);
    }
  }, [TeacherListingLoading]);
  useEffect(() => {
    if (
      addNewStudentData.batchId !== "" &&
      addNewStudentData.sectionId !== ""
    ) {
    }
  }, [addNewStudentData]);
  return (
    <>
      {contextHolder}
      <div className="main-box p-2">
        <h3 className="mb-5">
          Welcome, {JSON.parse(localStorage.getItem("userToken"))?.fullname}
        </h3>
        <div className="top-row d-flex flex-wrap gap-4 justify-content-center">
          <div className="top-row-item">
            <div
              className="counter-box bg-success d-flex flex-column align-items-center justify-content-center p-3"
              onClick={() => setAddNewTeacherModalOpen(true)}
            >
              <span className="fs-3 fw-bolder text-light">
                {totalTeachersCount}
              </span>
              <span className="fs-5 text-light">Teachers Registered </span>
            </div>
            <div className="item-details mt-2 bg-success">
              <AdminViewMainList
                data={
                  TeacherListing
                    ? TeacherListing?.entry?.map((item) => item.name)
                    : []
                }
                buttonColor="warning"
                setActiveType={setActiveType}
                activeType={activeType}
                listType="teachersTable"
              />
            </div>
          </div>
          <div className="top-row-item">
            <div>
              <div className="top-row-item h-420px d-flex flex-column justify-content-between">
                <div>
                  <div
                    className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-primary"
                    onClick={() => setAddNewCourseModalOpen(true)}
                  >
                    <span className="fs-3 fw-bolder text-light">
                      {CourseListing ? CourseListing.total : 0}
                    </span>
                    <span className="fs-5 text-light">Courses Booked </span>
                  </div>
                  <div className="mt-0 bg-primary p-2 d-flex justify-content-center">
                    <button
                      className="btn btn-warning w-100 mt-3"
                      onClick={() => setActiveType("coursesTable")}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-purple"
                    onClick={() => setAddNewCourseMapModalOpen(true)}
                  >
                    <span className="fs-3 fw-bolder text-light">
                      {CourseMapListing ? CourseMapListing?.total : 0}
                    </span>
                    <span className="fs-5 text-light">Course Mappings</span>
                  </div>
                  <div className="mt-0 bg-purple p-2 d-flex justify-content-center">
                    <button
                      className="btn btn-warning w-100 mt-3"
                      onClick={() => setActiveType("courseMapsTable")}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="top-row-item">
            <div className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-danger">
              <span className="fs-3 fw-bolder text-light">37</span>
              <span className="fs-5 text-light">Exams Taken</span>
            </div>
            <div className="item-details mt-2 bg-danger">
              <AdminViewMainList
                data={[
                  "Dr. Fahad",
                  "Mr. Salah ud Din",
                  "Dr. Farman Marwat",
                  "Mr. Kamran Khan",
                  "Dr. Fahad",
                  "Mr. Salah ud Din",
                  "Dr. Farman Marwat",
                  "Mr. Kamran Khan",
                ]}
                buttonColor="warning"
                buttonText="View Details"
                setActiveType={setActiveType}
                activeType={activeType}
                listType="examsTable"
              />
            </div>
          </div>
          <div className="top-row-item h-420px d-flex flex-column justify-content-between">
            <div>
              <div
                className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-info"
                onClick={() => setAddNewBatchModalOpen(true)}
              >
                <span className="fs-3 fw-bolder text-light">
                  {BatchesWithSectionsListing
                    ? BatchesWithSectionsListing?.entry?.length
                    : 0}
                </span>
                <span className="fs-5 text-light">Batches / Sections</span>
              </div>
              <div className="mt-0 bg-info p-2 d-flex justify-content-center">
                <button
                  className="btn btn-warning w-100 mt-3"
                  onClick={() => setActiveType("batchesTable")}
                >
                  View Details
                </button>
              </div>
            </div>

            <div>
              <div
                className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-secondary"
                onClick={() => setAddNewStudentModalOpen(true)}
              >
                <span className="fs-3 fw-bolder text-light">
                  {StudentsListing ? StudentsListing?.entry?.length : 0}
                </span>
                <span className="fs-5 text-light">Students</span>
              </div>
              <div className="mt-0 bg-secondary p-2 d-flex justify-content-center">
                <button
                  className="btn btn-warning w-100 mt-3"
                  onClick={() => setActiveType("studentsTable")}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="second-row">
          <AdminTableView
            teacherData={TeacherListing ? TeacherListing.entry : []}
            coursesData={CourseListing ? CourseListing.entry : []}
            batchesData={
              BatchesWithSectionsListing ? BatchesWithSectionsListing.entry : []
            }
            courseMapsData={CourseMapListing ? CourseMapListing?.entry : []}
            studentsData={StudentsListing ? StudentsListing?.entry : []}
            activeType={activeType}
          />
        </div>
      </div>
      <Modal
        title="Register New Teacher"
        open={addNewTeacherModalOpen}
        onOk={handleNewTeacherSubmit}
        onCancel={() => setAddNewTeacherModalOpen(false)}
        width={700}
        closable={false}
        maskClosable={false}
      >
        <hr />
        <div className="d-flex flex-wrap w-100 ">
          <div className="w-50 px-2">
            <p className="fw-bold">
              Title<span className="text-danger ms-1">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Title"
              value={newTeacherTitle}
              onChange={(e) => {
                setNewTeacherTitleErrMsg("");
                setNewTeacherTitle(e);
              }}
            >
              {TitlesList.map((item) => {
                return <Select.Option value={item}>{item}</Select.Option>;
              })}
            </Select>
            <p className="err-msg text-danger">{newTeacherTitleErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold">
              First Name<span className="text-danger ms-1">*</span>
            </p>
            <Input
              placeholder="First Name"
              value={newTeacherFirstName}
              onChange={(e) => {
                setNewTeacherFirstNameErrMsg("");

                setNewTeacherFirstName(e.target.value);
              }}
            />
            <p className="err-msg text-danger">{newTeacherFirstNameErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">Last Name</p>
            <Input
              placeholder="Last Name"
              value={newTeacherLastName}
              onChange={(e) => setNewTeacherLastName(e.target.value)}
            />
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              Username<span className="ms-1 text-danger">*</span>
            </p>
            <Input
              placeholder="Username"
              value={newTeacherUsername}
              onChange={(e) => {
                setNewTeacherUsernameErrMsg("");
                setNewTeacherUsername(e.target.value);
              }}
            />
            <p className="err-msg text-danger">{newTeacherUsernameErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              Email<span className="text-danger ms-1">*</span>
            </p>
            <Input
              placeholder="Email"
              value={newTeacherEmail}
              onChange={(e) => {
                setNewTeacherEmailErrMsg("");
                setNewTeacherEmail(e.target.value);
              }}
            />

            <p className="err-msg text-danger">{newTeacherEmailErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">Gender</p>
            <Select
              className="w-100"
              placeholder="Select Gender"
              value={newTeacherGender}
              onChange={(e) => {
                setNewTeacherGenderErrMsg("");

                setNewTeacherGender(e);
              }}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
            <p className="err-msg text-danger">{newTeacherGenderErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              Password<span className="text-danger ms-1">*</span>
            </p>
            <Input
              placeholder="Login Password"
              type="password"
              value={newTeacherPassword}
              onChange={(e) => {
                setNewTeacherPasswordErrMsg("");

                setNewTeacherPassword(e.target.value);
              }}
            />
            <p className="err-msg text-danger">{newTeacherPasswordErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              Confirm Password<span className="text-danger ms-1">*</span>
            </p>
            <Input
              placeholder="Confirm Password"
              type="password"
              value={newTeacherConfirmPassword}
              onChange={(e) => {
                setNewTeacherConfirmPasswordErrMsg("");
                setNewTeacherConfirmPassword(e.target.value);
              }}
            />
            <p className="err-msg text-danger">
              {newTeacherConfirmPasswordErrMsg}
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        title="Add New Course"
        open={addNewCourseModalOpen}
        onOk={handleNewCourseSubmit}
        onCancel={() => setAddNewCourseModalOpen(false)}
        width={700}
        closable={false}
        maskClosable={false}
      >
        <hr />
        <div className="d-flex flex-wrap w-100 ">
          <div className="w-50 px-2">
            <p className="fw-bold">
              Code<span className="text-danger ms-1">*</span>
            </p>
            <Input
              placeholder="Course Code"
              value={newCourseCode}
              onChange={(e) => {
                setNewCourseCode(e.target.value);
                setNewCourseCodeErrMsg("");
              }}
            />
            <p className="err-msg text-danger">{newCourseCodeErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold">
              Title<span className="text-danger ms-1">*</span>
            </p>
            <Input
              placeholder="Course Title"
              value={newCourseTitle}
              onChange={(e) => {
                setNewCourseTitleErrMsg("");

                setNewCourseTitle(e.target.value);
              }}
            />
            <p className="err-msg text-danger">{newCourseTitleErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">Abreviation</p>
            <Input
              placeholder="Course Abreviation"
              value={newCourseAbreviation}
              onChange={(e) => {
                setNewCourseAbreviation(e.target.value);
              }}
            />
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              Credit Hours<span className="text-danger ms-1">*</span>
            </p>
            <Select
              placeholder="Credit Hours"
              className="w-100"
              value={newCourseCreditHours}
              onChange={(e) => {
                setNewCourseCreditHours(e);
                setNewCourseCreditHoursErrMsg("");
              }}
            >
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
            </Select>
            <p className="err-msg text-danger">{newCourseCreditHoursErrMsg}</p>
          </div>
        </div>
      </Modal>

      <Modal
        title="Add New Batch"
        open={addNewBatchModalOpen}
        onOk={handleNewBatchSubmit}
        onCancel={() => setAddNewBatchModalOpen(false)}
        width={700}
        closable={false}
        maskClosable={false}
      >
        <hr />
        <div className="d-flex flex-wrap w-100 ">
          <div className="w-50 px-2">
            <p className="fw-bold">
              Batch<span className="text-danger ms-1">*</span>
            </p>
            <Select
              placeholder="Select Batch"
              value={newBatchName}
              className="w-100"
              onChange={(e) => setNewBatchName(e)}
            >
              <Select.Option value="SP">SP</Select.Option>
              <Select.Option value="FA">FA</Select.Option>
            </Select>
            <p className="err-msg text-danger">{newBatchNameErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold">
              Year<span className="text-danger ms-1">*</span>
            </p>
            <DatePicker
              placeholder="Select Year"
              className="w-100"
              picker="year"
              onChange={(e, eStr) => setNewBatchYear(eStr)}
            />
            <p className="err-msg text-danger">{newBatchYearErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">Start Date</p>
            <DatePicker
              placeholder="Start Date"
              className="w-100"
              onChange={(e, eStr) => {
                setNewBatchStartDate(e);
              }}
            />
            <p className="err-msg text-danger">{newBatchStartDateErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              End Date<span className="text-danger ms-1">*</span>
            </p>
            <DatePicker
              placeholder="End Date"
              onChange={(e, eStr) => {
                setNewBatchEndDate(e);
              }}
              className="w-100"
            />
            <p className="err-msg text-danger">{newBatchEndDateErrMsg}</p>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold mt-3">
              Select Sections<span className="text-danger ms-1">*</span>
            </p>
            <Checkbox value={"A"} checked={true} disabled>
              Section - A
            </Checkbox>
            <br />
            <Checkbox
              value={"B"}
              checked={newBatchSectionBChecked}
              onChange={() =>
                setNewBatchSectionBChecked(!newBatchSectionBChecked)
              }
            >
              Section - B
            </Checkbox>
            <br />

            <Checkbox
              value={"C"}
              checked={newBatchSectionCChecked}
              onChange={() =>
                setNewBatchSectionCChecked(!newBatchSectionCChecked)
              }
            >
              Section - C
            </Checkbox>
            <p className="err-msg text-danger">{newBatchEndDateErrMsg}</p>
          </div>
        </div>
      </Modal>
      <Modal
        title="Register New Course with Teacher"
        open={addNewCourseMapModalOpen}
        closable={false}
        maskClosable={false}
        onCancel={() => setAddNewCourseMapModalOpen(false)}
        width={700}
        onOk={() => handleRegisterNewCourseWithTeacher()}
      >
        <hr />
        <div className="d-flex flex-wrap">
          <div className="w-50 px-2">
            <p className="fw-bold">
              Course<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Course"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              value={courseMappingCourseId}
              onChange={(e) => {
                setCourseMappingCourseId(e);
                setCourseMappingCourseIdErrMsg("");
              }}
            >
              {CourseListing
                ? CourseListing?.entry?.map((item) => (
                    <Option value={item?._id}>
                      {`${item?.courseTitle} - ${item?.courseAbreviation}`}
                    </Option>
                  ))
                : null}
            </Select>
            <span className="text-danger">{courseMappingCourseIdErrMsg}</span>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold">
              Teacher<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Teacher"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              value={courseMappingTeacherId}
              onChange={(e) => {
                setCourseMappingTeacherId(e);
                setCourseMappingTeacherIdErrMsg("");
              }}
            >
              {TeacherListing
                ? TeacherListing?.entry?.map((item) => (
                    <Option value={item?._id}>{`${item?.name}`}</Option>
                  ))
                : null}
            </Select>
            <span className="text-danger">{courseMappingTeacherIdErrMsg}</span>
          </div>
          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              Batch<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Batch"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              value={courseMappingBatchId}
              onChange={(e) => {
                handleBatchChangeInCourseMapModal(e);
                setCourseMappingBatchIdErrMsg("");
              }}
            >
              {BatchesListing
                ? BatchesListing?.entry?.map((item) => (
                    <Option value={item?._id}>{`${item?.batchName}`}</Option>
                  ))
                : null}
            </Select>
            <span className="text-danger">{courseMappingBatchIdErrMsg}</span>
          </div>
          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              Section<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Section"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              value={courseMappingSectionId}
              onChange={(e) => {
                setCourseMappingSectionId(e);
                setCourseMappingSectionIdErrMsg("");
              }}
            >
              {sectionsListFromAPI
                ? sectionsListFromAPI?.entry?.map((item) => (
                    <Option
                      value={item?._id}
                    >{`Section - ${item?.sectionName}`}</Option>
                  ))
                : null}
            </Select>
            <span className="text-danger">{courseMappingSectionIdErrMsg}</span>
          </div>
          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              Current Status<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Current Status of the Course"
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              value={courseMappingCurrentStatus}
              onChange={(e) => {
                setCourseMappingCurrentStatus(e);
                setCourseMappingCurrentStatusErrMsg("");
              }}
            >
              <Option value="active">Active</Option>
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
            </Select>
            <span className="text-danger">
              {courseMappingCurrentStatusErrMsg}
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        title="Register New Student"
        open={addNewStudentModalOpen}
        closable={false}
        maskClosable={false}
        onCancel={() => setAddNewStudentModalOpen(false)}
        width={700}
        onOk={() => handleRegisterNewStudent()}
      >
        <hr />
        <div className="d-flex flex-wrap">
          <div className="w-50 px-2">
            <p className="fw-bold">
              First Name<span className="ms-1 text-danger">*</span>
            </p>
            <Input
              placeholder="Enter first name"
              value={addNewStudentData.firstname}
              onChange={(e) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  firstname: e.target.value,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  firstname: "",
                });
              }}
            />
            <span className="text-danger">
              {addNewStudentDataErrMsg.firstname}
            </span>
          </div>
          <div className="w-50 px-2">
            <p className="fw-bold">
              Last Name<span className="ms-1 text-danger">*</span>
            </p>
            <Input
              placeholder="Enter Last name"
              value={addNewStudentData.lastname}
              onChange={(e) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  lastname: e.target.value,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  lastname: "",
                });
              }}
            />
            <span className="text-danger">
              {addNewStudentDataErrMsg.lastname}
            </span>
          </div>
          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              Gender<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Gender"
              value={addNewStudentData.gender}
              onChange={(e) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  gender: e,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  gender: "",
                });
              }}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
            <span className="text-danger">
              {addNewStudentDataErrMsg.gender}
            </span>
          </div>

          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              GPA<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100 rounded-0"
              placeholder="Select GPA"
              value={addNewStudentData.gpa}
              onChange={(e) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  gpa: e,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  gpa: "",
                });
              }}
            >
              {GPAList.map((gpa) => (
                <Option value={gpa}>{gpa}</Option>
              ))}
            </Select>
            <span className="text-danger">
              {addNewStudentDataErrMsg.gender}
            </span>
          </div>
          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              Registration Number<span className="ms-1 text-danger">*</span>
            </p>

            <Select
              className="w-33"
              placeholder="Batch"
              value={addNewStudentData.batchId}
              onChange={(e, option) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  semesterType: option.children,
                  batchId: e,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  regNo: "",
                });
                handleBatchChangeInCourseMapModal(e, option.children);
              }}
            >
              <Option value="">Select</Option>

              {BatchesListing?.entry?.map((item) => (
                <Option value={item?._id}>{`${item?.batchName}`}</Option>
              ))}
            </Select>
            <Select
              className="w-33 rounded-0"
              placeholder="Program"
              value={addNewStudentData.program}
              onChange={(e) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  program: e,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  regNo: "",
                });
              }}
            >
              <Option value="">Select</Option>
              <Option value="BCS">BCS</Option>
              <Option value="BSE">BSE</Option>
              <Option value="BEE">BEE</Option>
              <Option value="BCE">BCE</Option>
            </Select>
            <Input
              className="w-33"
              placeholder="000"
              value={addNewStudentData.regNo}
              onChange={(e) =>
                setAddNewStudentData({
                  ...addNewStudentData,
                  regNo: e.target.value,
                })
              }
            />
            <span className="text-danger">{addNewStudentData.regNo}</span>
          </div>

          <div className="w-50 px-2 mt-3">
            <p className="fw-bold">
              Section<span className="ms-1 text-danger">*</span>
            </p>
            <Select
              className="w-100"
              placeholder="Select Section"
              value={addNewStudentData.sectionId}
              onChange={(e) => {
                setAddNewStudentData({
                  ...addNewStudentData,
                  sectionId: e,
                });
                setAddNewStudentDataErrMsg({
                  ...addNewStudentDataErrMsg,
                  sectionId: "",
                });
              }}
            >
              {sectionsListFromAPI
                ? sectionsListFromAPI?.entry?.map((item) => (
                    <Option
                      value={item?._id}
                    >{`Section - ${item?.sectionName}`}</Option>
                  ))
                : null}
            </Select>
            <span className="text-danger">
              {addNewStudentDataErrMsg.sectionId}
            </span>
          </div>
          <div className="w-100 px-2 mt-3">
            <p className="fw-bold">Courses Registered</p>
            <Select
              className="w-100"
              placeholder="Select Courses"
              value={addNewStudentData.subjectIds}
              onChange={(e) => {
                console.log("eeeee", e);
                setAddNewStudentData({
                  ...addNewStudentData,
                  subjectIds: e,
                });
              }}
              maxTagCount={5}
              allowClear
              mode={"multiple"}
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {CourseListing
                ? CourseListing?.entry?.map((item) => (
                    <Option
                      value={item?._id}
                    >{`${item.courseAbreviation} - ${item?.courseTitle}`}</Option>
                  ))
                : null}
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminDashboardView;
