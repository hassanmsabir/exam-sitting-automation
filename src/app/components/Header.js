import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { actionAPI, useSharedDispatcher, useSharedSelector } from "../shared";

const Header = () => {
  const { LoginUserData, LoginUserDataSuccess } = useSharedSelector(
    (state) => state.LoginUserData
  );
  const apiDispatcher = useSharedDispatcher();

  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Exam Sitting
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" role="button">
                About
              </Link>
            </li>
            {localStorage.getItem("userToken") && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {localStorage.getItem("userToken") && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/schedule"
                >
                  Exam Schedules
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            {localStorage.getItem("userToken") ? (
              <button
                className="btn btn-outline-success mx-2"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();
                  apiDispatcher(actionAPI.loginUserResetData());
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-outline-success mx-2"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
