import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-banner">
        <div className="text-cover">
          <div className="project-name w-100">
            A visual Analytic System For Examination
          </div>

          <p className="banner-text ms-sm-5">
            The <span> Best </span> solution to minimise cheating in exams
          </p>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </button>
        </div>
      </div>
      {/* <div className="services-section">
        <h2>Our Services</h2>
        <hr className="heading-hr" />
        <div className="services">
          <div className="service-box box1 p-3 w-50 w-sm-75 w-md-50 w-lg-25">
            <div className="service-heading">Exam sittting arrangement</div>
            <hr />
            <div className="searvice-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
              deserunt, veritatis blanditiis, assumenda impedit vitae laborum
              velit, dolor enim commodi praesentium deleniti eligendi
              repudiandae nemo necessitatibus a magni architecto at!
            </div>
          </div>
          <div className="service-box box2 p-3 w-50 w-sm-75 w-md-50 w-lg-25">
            <div className="service-heading">Exam sittting arrangement 2</div>
            <div className="searvice-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
              deserunt, veritatis blanditiis, assumenda impedit vitae laborum
              velit, dolor enim commodi praesentium deleniti eligendi
              repudiandae nemo necessitatibus a magni architecto at!
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="about-section">
        <h2>About</h2>
        <hr className="heading-hr" />
        <div className="about-body">
          <div className="about-card">
            <h3 className="text-center">Abstract</h3>
            <hr />
            It’s extremely important to control cheating in exams, which is the
            foremost duty of management of the organization. Management mainly
            relies on invigilation staff to control cheating in exams. Seating
            plans are very important to help invigilators in controlling
            cheating. In the manual system, assigning seat numbers to hundreds
            of students is hectic and requires considerable time, effort, and
            colossal examination staff. Still, there are few chances of
            error/mistake in it. Automated systems help to overcome the
            limitations of the manual seating plans.
          </div>
          <div className="about-card">
            <h3 className="text-center">Objectives</h3>
            <hr />

            <p>
              • Automated system for generating seating plan for examination.
            </p>
            <p>
              • Generate seating plan according to the current situation of the
              exam and course as and when required.
            </p>
          </div>
          <div className="about-card">
            <h3 className="text-center">Benefits</h3>
            <hr />
            <p>
              • This is an efficient system to develop seating plan while
              comparing with manual seating plan which need staff, considerable
              amount of time and human intelligence. This system will help staff
              to get varied seating plans for a single exam. Instructor can then
              select which they think is most appropriate.
            </p>
            <p>
              • Another objective is to achieve an interactive system that will
              facilitate user to view simple but meaningful visual seating
              plans. This system will also help in controlling cheating in exam.
            </p>
            <p>
              • It will save time for management to manually generate seating
              plan
            </p>
          </div>
        </div>
      </div> */}
      <div className="contact-us-section d-flex flex-column align-items-center">
        <h2 className="text-center mt-4">A Project By</h2>
        <hr className="heading-hr" />
        <div className="contact-body">
          <div className="contact-card">
            <div className="contact-img">
              <img src="" />
            </div>
            <div className="contact-rest">
              <div className="name d-flex justify-content-between">
                <span className="contact-heading fw-bold">Name:</span>
                <span className="contact-label ms-3">
                  Muhammad Muzammil Hassan
                </span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Role:</span>
                <span className="contact-label ms-3">
                  Frontend + BackEnd Developer
                </span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Reg No:</span>
                <span className="contact-label ms-3">SP19-BCS-001</span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Email:</span>
                <span className="contact-label ms-3">
                  muzammil.pgc.fj898@gmail.com
                </span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Contact Info:</span>
                <span className="contact-label ms-3">+92 347 7803437</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-img" id="pic2">
              <img src="" />
            </div>
            <div className="contact-rest">
              <div className="name d-flex justify-content-between">
                <span className="contact-heading fw-bold">Name:</span>
                <span className="contact-label ms-3">Muhammad Zakriya</span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Role:</span>
                <span className="contact-label ms-3">
                  Database Handler + UI Designer
                </span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Reg No:</span>
                <span className="contact-label ms-3">SP19-BCS-001</span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Email:</span>
                <span className="contact-label ms-3">
                  muzammil.pgc.fj898@gmail.com
                </span>
              </div>
              <div className="name d-flex justify-content-between mt-3">
                <span className="contact-heading fw-bold">Contact Info:</span>
                <span className="contact-label ms-3">+92 347 7803437</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
