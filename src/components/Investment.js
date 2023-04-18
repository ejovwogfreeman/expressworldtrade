import React from "react";
import { Link } from "react-router-dom";
import "../css/Investment.css";
import logo from "../assets/logo.png";
import { UserContext } from "../context/UserContext";
import { FaAward, FaTools, FaFunnelDollar } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const Investment = () => {
  const [UserState] = React.useContext(UserContext);

  return (
    <div className="investment-container">
      {UserState.username ? (
        <div className="access">
          <h2>GO TO DASHBOARD</h2>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      ) : (
        <div className="access">
          <h2>JOIN TODAY</h2>
          <Link to="/login">SIGN IN</Link>
          <Link to="/register">REGISTER</Link>
        </div>
      )}
      <div className="how">
        <h2>
          <div>
            <img src={logo} />
          </div>
          <span>Join millions of Trade and Earn Everyday</span>
        </h2>
        <div className="how-grid">
          <div>
            <span className="icon">
              <FaAward />
            </span>
            <h3>Best Execution</h3>
            <p>Best Precision from 0.5 pips on</p>
          </div>
          <div>
            <span className="icon">
              <FaTools />
            </span>
            <h3>980,000+ Clients</h3>
            <p>We satisfy clients we let them invest continiously</p>
          </div>
          <div>
            <span className="icon">
              <MdGroups />
            </span>
            <h3>Customer Experience</h3>
            <p>Award winning support in different languages</p>
          </div>
          <div>
            <span className="icon">
              <FaFunnelDollar />
            </span>
            <h3>Funds Protection</h3>
            <p>Balance protection and enhanced insurance</p>
          </div>
        </div>
      </div>
      <div className="track">
        <h1>JOIN TODAY</h1>
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
