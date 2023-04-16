import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>Exam Sitting</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
       
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/services" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Services
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/services">Service 1</Link></li>
            <li><Link className="dropdown-item" to="/services">Service 2</Link></li>
          </ul>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <button className="btn btn-outline-success mx-2" type="submit">Login</button>
        <button className="btn btn-success mx-2" type="submit">Signup</button>
      </form>
    </div>
  </div>
</nav>

  )
}

export default Header