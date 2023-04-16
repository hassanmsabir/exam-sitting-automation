import React from 'react'

const Home = () => {
  return (
    <>
        <div className="main-banner">
          <div className="text-cover">
          <p className='banner-text ms-sm-5'>
            The <span> Best </span> solution to minimise cheating in exams
          </p>
          </div>
        </div>
        <div className="services-section">
          <h2>Our Services</h2>
          <hr className='heading-hr'/>
          <div className="services">

          <div className='service-box box1 p-3 w-50 w-sm-75 w-md-50 w-lg-25'>
            <div className="service-heading">
              Exam sittting arrangement
            </div>
            <hr />
            <div className="searvice-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut deserunt, veritatis blanditiis, assumenda impedit vitae laborum velit, dolor enim commodi praesentium deleniti eligendi repudiandae nemo necessitatibus a magni architecto at!
            </div>
          </div>
          <div className='service-box box2 p-3 w-50 w-sm-75 w-md-50 w-lg-25'>
            <div className="service-heading">
              Exam sittting arrangement 2
            </div>
            <div className="searvice-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut deserunt, veritatis blanditiis, assumenda impedit vitae laborum velit, dolor enim commodi praesentium deleniti eligendi repudiandae nemo necessitatibus a magni architecto at!
            </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Home