import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../css/Nav.css";
import { AiOutlineMenu } from "react-icons/ai";
import MobileNav from "./MobileNav";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import { MdCall } from "react-icons/md";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const [UserState, setUserState] = React.useContext(UserContext);
  // const [openButton, setOpenButton] = useState(true);

  const navigate = useNavigate();
  const Auth = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
  };

  const userAuth = Auth();

  const logout = () => {
    localStorage.removeItem("user");
    setUserState({});
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [change, setChange] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setChange(true);
      } else {
        setChange(false);
      }
    });
  }, []);
  return (
    <nav className={change ? "sticky" : "stick"}>
      <div className="top-nav">
        <span className="d-flex align-items-center">
          <CgMail className="icon" />
          <span className="ms-1">mail@expressworldtrade.option.com</span>
        </span>
        <span className="left">
          <MdCall className="icon" />
          +1 (213) 111 - 111
        </span>
      </div>
      <div className="main-nav">
        <div>
          <Link to="/">
            <img src={logo} id="logo" />
          </Link>
        </div>
        <MobileNav open={open} handleOpen={handleOpen} />
        <ul className="links">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          {userAuth ? (
            <>
              <li>
                <div className="dropdown">
                  <span
                    to="/about"
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    <span>INVESTMENT</span> <IoMdArrowDropdown />
                  </span>
                  <ul
                    className="dropdown-items text-center"
                    style={{ left: "-25px" }}
                  >
                    <li>
                      <Link to="/register">INVESTMENT PACKAGE</Link>
                    </li>
                    <li>
                      <Link to="/login">INVESTMENT HISTORY</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <span
                    to="/about"
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    <span>TRANSACTION</span> <IoMdArrowDropdown />
                  </span>
                  <ul
                    className="dropdown-items text-center"
                    style={{ left: "-20px" }}
                  >
                    <li>
                      <Link to="/register">DEPOSIT FUND</Link>
                    </li>
                    <li>
                      <Link to="/register">DEPOSIT HISTORY</Link>
                    </li>
                    <li>
                      <Link to="/register">WITHDRAW FUND</Link>
                    </li>
                    <li>
                      <Link to="/register">WITHDRAWAL HISTORY</Link>
                    </li>
                    <li>
                      <Link to="/login">TRANSACTION LOG</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <></>
          )}
          <li>
            <div className="dropdown">
              {!userAuth ? (
                <>
                  <span
                    to="/about"
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    <span>ACCOUNT</span> <IoMdArrowDropdown />
                  </span>
                  <ul
                    className="dropdown-items text-center"
                    style={{ left: "-40px" }}
                  >
                    <li>
                      <Link to="/register">REGISTER</Link>
                    </li>
                    <li>
                      <Link to="/login">LOGIN</Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <span
                    to="/about"
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    <span>HI {UserState.username}</span> <IoMdArrowDropdown />
                  </span>
                  <ul
                    className="dropdown-items text-center"
                    style={{ left: "-40px" }}
                  >
                    <li>
                      <Link to="/dashboard">DASHBOARD</Link>
                    </li>
                    <li>
                      <Link to="/dashboard">EDIT PROFILE</Link>
                    </li>
                    <li>
                      <Link to="/dashboard">CHANGE PASSWORD</Link>
                    </li>
                    <li>
                      <Link to="/dashboard">GET SUPPORT</Link>
                    </li>
                    <li style={{ background: "black" }}>
                      <span onClick={logout} style={{ cursor: "pointer" }}>
                        <span>LOGOUT</span>
                      </span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </li>
        </ul>
        <div className="menu-icon">
          <AiOutlineMenu onClick={handleOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
