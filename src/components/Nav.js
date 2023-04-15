import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import { AiOutlineMenu } from "react-icons/ai";
import MobileNav from "./MobileNav";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import { MdCall } from "react-icons/md";

const Nav = () => {
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
          <li>
            <div className="dropdown">
              <span
                to="/about"
                className="d-flex align-items-center"
                style={{ cursor: "pointer", color: "white" }}
              >
                <span>ACCOUNT</span> <IoMdArrowDropdown />
              </span>
              <ul className="dropdown-items">
                <li>
                  <Link to="/login">REGISTER</Link>
                </li>
                <li>
                  <Link to="/register">LOGIN</Link>
                </li>
              </ul>
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
