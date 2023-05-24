import React from "react";

const ContactUs = () => {
  return (
    <div className="main-box p-2">
      <div className="about-section">
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
      </div>
    </div>
  );
};

export default ContactUs;
