import { Input, Modal, Select, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import Settings from "../../shared/redux/config/Settings";
import { actionAPI, useSharedDispatcher } from "../../shared";
import TitlesList from "../../shared/constant/TitlesList";

const AdminTableView = ({ activeType, teacherData, coursesData }) => {
  const apiDispatcher = useSharedDispatcher();
  const [selectedData, setSelectedData] = useState(null);

  const [isEditTeacherDataModalOpen, setIsEditTeacherDataModalOpen] =
    useState(false);
  const [isDeleteTeacherDataModalOpen, setIsDeleteTeacherDataModalOpen] =
    useState(false);

  const [isEditCourseDataModalOpen, setIsEditCourseDataModalOpen] =
    useState(false);
  const [isDeleteCourseDataModalOpen, setIsDeleteCourseDataModalOpen] =
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

  const handleCourseDataEditBtnClick = (record) => {
    setSelectedData(record);
    setNewCourseTitle(record.courseTitle);
    setNewCourseAbreviation(record.courseAbreviation);
    setNewCourseCode(record.courseCode);
    setNewCourseCreditHours(parseInt(record.courseCreditHours));
    setIsEditCourseDataModalOpen(true);
  };
  const handleCourseDataDeleteClick = () => {
    fetch(`${Settings.apiUrl}deleteCourse/${selectedData._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedCourse) => {
        openNotification("topRight", "success", "Course Deleted");
        apiDispatcher(actionAPI.getAllCoursesAPI());
        setIsDeleteCourseDataModalOpen(false);
      })
      .catch((err) => {
        openNotification("topRight", "error", "Error Deleting Data", err);
      });
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
  const handleUpdateCourseData = () => {
    if (validateNewCourseReq()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      courseCode: newCourseCode,
      courseTitle: newCourseTitle,
      courseCreditHours: newCourseCreditHours,
      courseAbreviation: newCourseAbreviation,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(Settings.apiUrl + "updateCourse/" + selectedData._id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        openNotification("topRight", "success", "Course Updated");
        apiDispatcher(actionAPI.getAllCoursesAPI());
        setIsEditCourseDataModalOpen(false);
      })
      .catch((error) => console.log("error", error));
  };

  const handleTeacherDataEditBtnClick = (record) => {
    setSelectedData(record);

    setNewTeacherTitle(record?.title);
    setNewTeacherFirstName(record?.firstName);
    setNewTeacherLastName(record?.lastName);
    setNewTeacherEmail(record?.email);
    setNewTeacherGender(record.gender);
    setNewTeacherPassword(record.password);
    setNewTeacherConfirmPassword(record.password);
    setNewTeacherUsername(record.username);
    setIsEditTeacherDataModalOpen(true);
  };
  const handleTeacherDataDeleteClick = () => {
    fetch(`${Settings.apiUrl}deleteTeacherData/${selectedData._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedTeacher) => {
        openNotification(
          "topRight",
          "success",
          "Teacher Data Deleted",
          deletedTeacher.name + " removed from the list"
        );
        apiDispatcher(actionAPI.getAllTeachersAPI());
        setIsDeleteTeacherDataModalOpen(false);
      })
      .catch((err) => {
        openNotification("topRight", "error", "Error Deleting Data", err);
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
  const handleUpdateTeacherData = () => {
    if (validateNewTeacherReq()) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: newTeacherUsername,
      name: `${newTeacherTitle} ${newTeacherFirstName} ${newTeacherLastName}`,
      gender: newTeacherGender,
      email: newTeacherEmail,
      password: newTeacherPassword,
      role: "teacher",
      title: newTeacherTitle,
      firstName: newTeacherFirstName,
      lastName: newTeacherLastName,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      Settings.apiUrl + "updateTeacherData/" + selectedData._id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        openNotification("topRight", "success", "Teacher Data Updated");
        apiDispatcher(actionAPI.getAllTeachersAPI());
        setIsEditTeacherDataModalOpen(false);
      })
      .catch((error) => console.log("error", error));
  };
  //   ==================================================

  const TeacherColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => {
        return <span className="text-success">{record.role}</span>;
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => {
        return (
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              handleTeacherDataEditBtnClick(record);
            }}
          >
            Edit
          </span>
        );
      },
    },
    {
      title: "Delete",
      key: "Delete",
      render: (_, record) => {
        return (
          <span
            className="text-danger cursor-pointer"
            onClick={() => {
              setSelectedData(record);
              setIsDeleteTeacherDataModalOpen(true);
            }}
          >
            Delete
          </span>
        );
      },
    },
  ];
  const CoursesColumns = [
    {
      title: "Code",
      dataIndex: "courseCode",
    },
    {
      title: "Abreviation",
      dataIndex: "courseAbreviation",
    },
    {
      title: "Title",
      dataIndex: "courseTitle",
    },
    {
      title: "Credit Hours",
      dataIndex: "courseCreditHours",
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => {
        return (
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              handleCourseDataEditBtnClick(record);
            }}
          >
            Edit
          </span>
        );
      },
    },
    {
      title: "Delete",
      key: "Delete",
      render: (_, record) => {
        return (
          <span
            className="text-danger cursor-pointer"
            onClick={() => {
              setSelectedData(record);
              setIsDeleteCourseDataModalOpen(true);
            }}
          >
            Delete
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(coursesData);
  }, [coursesData]);
  return (
    <>
      {contextHolder}
      {activeType === "teachersTable" ? (
        <>
          <div className="mt-3 overflow-auto">
            <h3 className="text-center text-success">Teachers Table</h3>
            <Table columns={TeacherColumns} dataSource={teacherData} />
          </div>
          <Modal
            title="Update Teacher's Data"
            open={isEditTeacherDataModalOpen}
            onOk={() => handleUpdateTeacherData()}
            onCancel={() => setIsEditTeacherDataModalOpen(false)}
            closable={false}
            maskClosable={false}
            width={700}
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
                <p className="err-msg text-danger">
                  {newTeacherFirstNameErrMsg}
                </p>
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
                <p className="err-msg text-danger">
                  {newTeacherUsernameErrMsg}
                </p>
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
                <p className="err-msg text-danger">
                  {newTeacherPasswordErrMsg}
                </p>
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
            open={isDeleteTeacherDataModalOpen}
            onOk={() => handleTeacherDataDeleteClick()}
            onCancel={() => setIsDeleteTeacherDataModalOpen(false)}
          >
            Are you sure you want to remove {selectedData?.name} from Teachers
            list?
          </Modal>
        </>
      ) : activeType === "coursesTable" ? (
        <>
          <div className="mt-3 overflow-auto">
            <h3 className="text-center text-primary">Courses Table</h3>
            <Table columns={CoursesColumns} dataSource={coursesData} />
          </div>

          <Modal
            title="Edit Course Data"
            open={isEditCourseDataModalOpen}
            onOk={handleUpdateCourseData}
            onCancel={() => setIsEditCourseDataModalOpen(false)}
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
                <p className="err-msg text-danger">
                  {newCourseCreditHoursErrMsg}
                </p>
              </div>
            </div>
          </Modal>
          <Modal
            title="Delete Course Data"
            open={isDeleteCourseDataModalOpen}
            onCancel={() => setIsDeleteCourseDataModalOpen(false)}
            onOk={() => {
              handleCourseDataDeleteClick();
            }}
          >
            Are you sure you want to delete this course?
          </Modal>
        </>
      ) : activeType === "examsTable" ? (
        <>
          <div className="mt-3 overflow-auto">
            <h3 className="text-center text-danger">Exams Table</h3>
            <Table columns={CoursesColumns} dataSource={coursesData} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminTableView;
