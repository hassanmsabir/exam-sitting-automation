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
          <hr/>
          <div className="services">

          <div className='service-box box1'>
            <div className="service-heading">
              Exam sittting arrangement
            </div>
            <div className="searvice-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut deserunt, veritatis blanditiis, assumenda impedit vitae laborum velit, dolor enim commodi praesentium deleniti eligendi repudiandae nemo necessitatibus a magni architecto at!
            </div>
          </div>
          <div className='service-box box2'>
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