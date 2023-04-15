import React from "react";
import { Link } from "react-router-dom";
import "../css/Investment.css";
import logo from "../assets/logo.png";
import { UserContext } from "../context/UserContext";

const Investment = () => {
  const [UserState] = React.useContext(UserContext);

  return (
    <div className="investment-container">
      <div className="access">
        <h2>GET ACCESS TO YOUR ACCOUNT</h2>
        <div>
          {UserState.username ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link to="/login">SIGN IN</Link>
              <Link to="/register">REGISTER</Link>
            </>
          )}
        </div>
      </div>
      <div className="how">
        <h2>
          <div>
            <img src={logo} />
          </div>
          <span>Join millions of Trade an Earn Everyday</span>
        </h2>
        <div className="how-grid">
          <div>
            <h3>Best Execution</h3>
            <p>Best Precision from 0.5 pips on</p>
          </div>
          <div>
            <h3>980,000+ Clients</h3>
            <p>We satisfy clients we let them invest continiously</p>
          </div>
          <div>
            <h3>Customer Experience</h3>
            <p>Award winning support in different languages</p>
          </div>
          <div>
            <h3>Funds Protection</h3>
            <p>Balance protection and enhanced insurance</p>
          </div>
        </div>
      </div>
      <div className="track">
        <h1>
          Fast-track <br /> your success
        </h1>
        <div>
          {UserState.username ? (
            <>
              <p>Go to your dashboard and track your earnings</p> <br />
            </>
          ) : (
            <>
              <p>Register with us to start earning more</p> <br />
            </>
          )}
          {UserState.username ? (
            <Link to="/dashboard">GO TO DASHBOARD</Link>
          ) : (
            <Link to="/register">CREATE AN ACCOUNT</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Investment;
