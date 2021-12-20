import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import "./Naavbar.scss";

import { ReactComponent as Avatar } from "../avatar.svg";

const Naavbar = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const [userType, setUserType] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(userType);
    //console.log(user.username);
  }, []);

  let navigate = useNavigate();

  const logout = () => {
    setUser({});
    localStorage.clear();
    console.log("CLEARED AND LOGGED OUT");
    navigate("/login");
  };

  if (userType === "Recruiter") {
    return (
      <div>
        <section className="container-nav row nav">
          <Link to="/" className="logo nav">
            Job Portal
          </Link>
          <nav className="navigation row menulink">
            <ul class="row">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/findjobs"
                >
                  Find Jobs
                </NavLink>
              </li>
              <li>
                <Link className="link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="link" to="/myjobs">
                  My Jobs
                </Link>
              </li>
              <li>
                <Link className="link" to="/acceptedemployees">
                  Accepted Employees
                </Link>
              </li>
              <li>{user.username}</li>
              <li>
                <Link className="nav-btn-2" to="postjob">
                  Post Job
                </Link>
              </li>
              <li>
                <Link className="nav-btn-1" onClick={logout} to="/#">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
          <div className="toggle">
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </section>
      </div>
    );
  }
  if (userType === "applicant") {
    return (
      <div>
        <section className="container-nav row nav">
          <Link to="/" className="logo nav">
            Job Portal
          </Link>
          <nav className="navigation row menulink">
            <ul class="row">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="/findjobs"
                >
                  Find Jobs
                </NavLink>
              </li>
              <li>
                <Link className="link" to="/about">
                  About
                </Link>
              </li>

              <li>
                <Link className="link" to="/myapplications">
                  My Applications
                </Link>
              </li>
              <li>{user.username}</li>
              <li>
                <Link className="nav-btn-1" onClick={logout} to="#">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
          <div className="toggle">
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <section className="container-nav row nav">
          <Link to="/" className="logo nav">
            Job Portal
          </Link>
          <nav className="navigation row menulink">
            <ul class="row">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "link")}
                  to="findjobs"
                >
                  Find Jobs
                </NavLink>
              </li>
              <li>
                <Link className="link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-btn-1" to="/register">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="nav-btn-2" to="postjob">
                  Post Job
                </Link>
              </li>
            </ul>
          </nav>
          <div className="toggle">
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </section>
      </div>
    );
  }
  // return (
  //   <div>
  //     <section className="container-nav row nav">
  //       <Link to="#" className="logo nav">
  //         Job Portal
  //       </Link>
  //       <nav className="navigation row menulink">
  //         <ul class="row">
  //           <li>
  //             <Link className="link" to="/">
  //               Find Jobs
  //             </Link>
  //           </li>
  //           <li>
  //             <Link className="link" to="/about">
  //               About Us
  //             </Link>
  //           </li>
  //           <li>
  //             <Link className="link" to="/login">
  //               Login
  //             </Link>
  //           </li>
  //           <li>
  //             <Link className="nav-btn-1" to="/register">
  //               Sign Up
  //             </Link>
  //           </li>
  //           <li>
  //             <Link className="nav-btn-2" to="postjob">
  //               Post Job
  //             </Link>
  //           </li>
  //         </ul>
  //       </nav>
  //       <div className="toggle">
  //         {!menuOpen ? (
  //           <BiMenuAltRight onClick={menuToggleHandler} />
  //         ) : (
  //           <AiOutlineClose onClick={menuToggleHandler} />
  //         )}
  //       </div>
  //     </section>
  //   </div>
  // );
};

export default Naavbar;
