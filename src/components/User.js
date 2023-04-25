// import React from "react";
// import { useParams } from "react-router-dom";

// const User = () => {
//   const params = useParams();
//   console.log(params.id);
//   return (
//     <div>
//       <h1>User's details</h1>
//     </div>
//   );
// };

// export default User;

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
// import loaderimg from "../assets/icons8-combo-chart.gif";
import "../css/Home.css";
import Navbar from "./Navbar";
import { UsersContext } from "../context/UsersContext";
import { Button, Box, Popover, Typography, TextField } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { ToastifyContext } from "../context/ToastifyContext";
import { userFund, getUsers } from "../data";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const User = () => {
  const { users } = React.useContext(UsersContext);

  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [usersState, setUsersState] = users;

  const [userState, setUserState] = React.useContext(UserContext);

  return (
    <div className="home-container">
      <Navbar />
      <h1>User's Profile</h1>
      {/* <div className="general-container">
        <Background text="EDIT PROFILE" />
        <div className="body">
          <form onSubmit={handleSubmit} className="signup-form mb-5">
            <h2>EDIT PROFILE</h2>
            <div
              style={{
                flexDirection: "column",
                width: "200px",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                padding: "0px",
              }}
            >
              <img
                src={
                  userDetails.file.length > 0
                    ? URL.createObjectURL(userDetails.file[0])
                    : UserState.profileImage &&
                      UserState.profileImage.length > 0
                    ? `https://expressworldtrade.onrender.com/${UserState.profileImage[0].link}`
                    : profilepic
                }
                alt=""
                style={{ width: "100%", margin: "0px" }}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                name="img"
                id="img"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    file: e.target.files,
                  })
                }
              />
              <label
                for="img"
                style={{
                  margin: "0px",
                  width: "100%",
                  borderRadius: "0px",
                  color: "white",
                  background: "var(--secondary)",
                  padding: 20,
                  cursor: "pointer",
                }}
              >
                Change Image
              </label>
            </div>
            <div>
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                placeholder="Enter your Name"
              />
              <input
                type="text"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                placeholder="Enter your Username"
              />
            </div>
            <div>
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                placeholder="Enter your Email"
              />
              <input
                type="text"
                value={userDetails.phoneNumber}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: e.target.value,
                  })
                }
                placeholder="Enter your Phone Number"
              />
            </div>
            <button disabled={loading}>
              <FaTelegramPlane />
              &nbsp;{loading ? "LOADING..." : "UPDATE PROFILE"}
            </button>
          </form>
        </div>
      </div>*/}
    </div>
  );
};

export default User;
