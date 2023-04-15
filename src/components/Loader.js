import React from "react";
import logo from "../assets/logo.png";
import loader from "../assets/loading.gif";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <img
        src={logo}
        alt=""
        width="100px"
        style={{ display: "block", margin: "auto" }}
      />
      <img
        src={loader}
        alt="loading"
        width="50px"
        style={{ display: "block", margin: "auto" }}
      />
    </div>
  );
};

export default Loader;
