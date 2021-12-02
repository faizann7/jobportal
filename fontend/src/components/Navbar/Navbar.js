import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./navbar.module.scss";
import { ReactComponent as Avatar } from "../../avatar.svg";

import { useNavigate } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className={classes.header}>
        <div className={classes.header__content}>
          <Link to="/" className={classes.header__content__logo}>
            DevOps
          </Link>

          <nav
            className={`${classes.header__content__nav} ${
              menuOpen ? classes.isMenu : ""
            }`}
          >
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/postjob">Post a Job</Link>
              </li>
              <li>
                <Link to="/myjobs">My Jobs</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <Avatar height={30} />
            </ul>
            <button onClick={logout}>Logout</button>
            <div className={classes.header__account}></div>
          </nav>

          <div className={classes.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>
    );
  }
  if (userType === "applicant") {
    return (
      <header className={classes.header}>
        <div className={classes.header__content}>
          <Link to="/" className={classes.header__content__logo}>
            DevOps
          </Link>

          <nav
            className={`${classes.header__content__nav} ${
              menuOpen ? classes.isMenu : ""
            }`}
          >
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <Avatar height={30} />
            </ul>
            <button onClick={logout}>Logout</button>
            <div className={classes.header__account}></div>
          </nav>

          <div className={classes.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className={classes.header}>
        <div className={classes.header__content}>
          <Link to="/" className={classes.header__content__logo}>
            DevOps
          </Link>

          <nav
            className={`${classes.header__content__nav} ${
              menuOpen ? classes.isMenu : ""
            }`}
          >
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Regsier</Link>
              </li>
            </ul>
            {/* <button>CTA Page</button> */}
            <div className={classes.header__account}></div>
          </nav>

          <div className={classes.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>
    );
  }

  // return (
  //   <header className={classes.header}>
  //     <div className={classes.header__content}>
  //       <Link to="/" className={classes.header__content__logo}>
  //         DevOps
  //       </Link>

  //       <nav
  //         className={`${classes.header__content__nav} ${
  //           menuOpen ? classes.isMenu : ""
  //         }`}
  //       >
  //         <ul>
  //           <li>
  //             <Link to="/home">Home</Link>
  //           </li>
  //           <li>
  //             <Link to="/about">About</Link>
  //           </li>
  //           <li>
  //             <Link to="/page-two">Post a Job</Link>
  //           </li>
  //           <li>
  //             <Link to="/login">Login</Link>
  //           </li>

  //           {/* <img src={avatar} alt="avatar" /> */}
  //           <Avatar height={30} />
  //         </ul>
  //         {/* <button>CTA Page</button> */}
  //         <div className={classes.header__account}></div>
  //       </nav>

  //       <div className={classes.header__content__toggle}>
  //         {!menuOpen ? (
  //           <BiMenuAltRight onClick={menuToggleHandler} />
  //         ) : (
  //           <AiOutlineClose onClick={menuToggleHandler} />
  //         )}
  //       </div>
  //     </div>
  //   </header>
  // );
};

// const Navbar = () => {

//     const [isActive, setIsActive] = useState(false)

//   return (
//     <>
//     <div>
//     <nav class="navbar" on>
//         <div class="content">
//             <div class="logo">
//                 <Link to="/">DevOps</Link>
//             </div>

//             <ul
//                 class="menu-list"
//                 onClick={() => { setIsActive(!isActive)}}
//                 >
//                 <div class="icon cancel-btn">
//                     <i class="fas fa-times"></i>
//                 </div>
//                 <li><Link to="/">Sign Up</Link></li>
//                 <li><Link to="/signup">Sign Up</Link></li>
//                 <li><Link to="/about">About</Link></li>
//             </ul>
//             <div
//                 className="icon menu-btn"
//                 onClick={() => { setIsActive(!isActive)}}
//             >
//                 <FaBars/>
//             </div>
//         </div>
//     </nav>
//     </div>

//     </>
//   );
// };

export default Navbar;
