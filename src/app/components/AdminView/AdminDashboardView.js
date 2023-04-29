import React, { useEffect, useState } from "react";
import AdminViewMainList from "./AdminViewMainList";
import { DatePicker, Input, Modal, Select, notification } from "antd";
import TitlesList from "../../shared/constant/TitlesList";
import moment from "moment/moment";
import {
  actionAPI,
  useSharedDispatcher,
  useSharedSelector,
} from "../../shared";
import AdminTableView from "./AdminTableView";
import Settings from "../../shared/redux/config/Settings";

const AdminDashboardView = () => {
  const apiDispatcher = useSharedDispatcher();
  const { TeacherListing, TeacherListingSuccess, TeacherListingLoading } =
    useSharedSelector((state) => state.ListAllTeachers);
  const { CourseListing, CourseListingSuccess, CourseListingLoading } =
    useSharedSelector((state) => state.ListAllCourses);
  const [addNewTeacherModalOpen, setAddNewTeacherModalOpen] = useState(false);
  const [addNewCourseModalOpen, setAddNewCourseModalOpen] = useState(false);
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

  const [totalTeachersCount, setTotalTeachersCount] = useState(0);
  const [activeType, setActiveType] = useState("teachersTable");

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
    if (newTeacherPassword != newTeacherConfirmPassword) {
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

  useEffect(() => {
    apiDispatcher(actionAPI.getAllTeachersAPI());
    apiDispatcher(actionAPI.getAllCoursesAPI());
  }, []);
  useEffect(() => {
    if (TeacherListingSuccess && TeacherListing.total) {
      setTotalTeachersCount(TeacherListing?.total);
    }
  }, [TeacherListingLoading]);
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
            <div
              className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-primary"
              onClick={() => setAddNewCourseModalOpen(true)}
            >
              <span className="fs-3 fw-bolder text-light">
                {CourseListing ? CourseListing.total : null}
              </span>
              <span className="fs-5 text-light">Courses Booked </span>
            </div>
            <div className="item-details mt-2 bg-primary">
              <AdminViewMainList
                data={
                  CourseListing
                    ? CourseListing?.entry?.map((item) => item.courseTitle)
                    : []
                }
                buttonColor="warning"
                buttonText="View Details"
                setActiveType={setActiveType}
                activeType={activeType}
                listType="coursesTable"
              />
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
          <div className="top-row-item">
            <div className="counter-box d-flex flex-column align-items-center justify-content-center p-3 bg-info">
              <span className="fs-3 fw-bolder text-light">30</span>
              <span className="fs-5 text-light">Batches / Sections</span>
            </div>
            <div className="item-details mt-2 bg-info">
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
                listType="batchesTable"
              />
            </div>
          </div>
        </div>
        <div className="second-row">
          <AdminTableView
            teacherData={TeacherListing ? TeacherListing.entry : []}
            coursesData={CourseListing ? CourseListing.entry : []}
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
    </>
  );
};

export default AdminDashboardView;
