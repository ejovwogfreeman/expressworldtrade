import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

const MobileNav = ({ open, handleOpen }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const handleShow2 = () => {
    setShow2(!show2);
  };
  return (
    <ul className={open ? "mobile-nav" : "hide"}>
      <div className="close-icon">
        <MdOutlineClose className="close" onClick={handleOpen} />
      </div>
      <li onClick={() => handleOpen()}>
        <Link to="/">HOME</Link>
      </li>
      <li onClick={() => handleOpen()}>
        <Link to="/about">ABOUT</Link>
      </li>
      <li onClick={() => handleOpen()}>
        <Link to="/contact">CONTACT</Link>
      </li>
      <li>
        <div className="dropdown-mobile" onClick={handleShow}>
          <span
            className="d-flex align-items-center justify-content-center span"
            style={{ padding: "20px" }}
          >
            <span style={{ marginRight: "5px" }}>ACCOUNT</span>
            <IoMdArrowDropdown />
          </span>
          <ul
            className={
              show ? "dropdown-items-mobile-block" : "dropdown-items-mobile"
            }
          >
            <li onClick={() => handleOpen()}>
              <Link to="/register">REGISTER</Link>
            </li>
            <li onClick={() => handleOpen()}>
              <Link to="/login">LOGIN</Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default MobileNav;
