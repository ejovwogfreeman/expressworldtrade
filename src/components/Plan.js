import React from "react";
import { CgMail } from "react-icons/cg";
import { MdCall } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Plan.css";

const Plan = () => {
  return (
    <div className="plan-container">
      <h2>
        <span>
          OUR AWESOME <span style={{ color: "rgb(35, 201, 216)" }}>PLANS</span>{" "}
          <br /> <img src={logo} width="100px" />
        </span>
      </h2>
      <p>
        The site is owned by financial freedom investment company. A registered
        company for cryptocurrency investments solution. We give a chance to
        new, dynamically developing ICO projects that bring huge profits in an
        amazing short time. Join Us by choosing one of our plans today.
      </p>
      <div className="plan">
        <div className="plan-box">
          <h2>MINI</h2>
          <p>WEEKLY 150% FOR 1 TIMES</p>
          <h3>$ 37650</h3>
          <div>
            <span>
              <p>Minimum</p>
              <p>$300.00</p>
            </span>
            <span>
              <p>Maximum</p>
              <p>$75000.00</p>
            </span>
            <span>
              <p>Per time</p>
              <p>$56475.00</p>
            </span>
            <span>
              <p>Total Return</p>
              <p>$56475.00</p>
            </span>
          </div>
        </div>
        <div className="plan-box">
          <h2>SILVER</h2>
          <p>WEEKLY 200% FOR 1 TIMES</p>
          <h3>$ 87500</h3>
          <div>
            <span>
              <p>Minimum</p>
              <p>$75000.00</p>
            </span>
            <span>
              <p>Maximum</p>
              <p>$100000.00</p>
            </span>
            <span>
              <p>Per time</p>
              <p>$175000.00</p>
            </span>
            <span>
              <p>Total Return</p>
              <p>$175000.00</p>
            </span>
          </div>
        </div>
        <div className="plan-box">
          <h2>GOLD</h2>
          <p>WEEKLY 300% FOR 1 TIMES</p>
          <h3>$ 675000</h3>
          <div>
            <span>
              <p>Minimum</p>
              <p>$10000.00</p>
            </span>
            <span>
              <p>Maximum</p>
              <p>$1250000.00</p>
            </span>
            <span>
              <p>Per time</p>
              <p>$2025000.00</p>
            </span>
            <span>
              <p>Total Return</p>
              <p>$2025000.00</p>
            </span>
          </div>
        </div>
        <div className="plan-box">
          <h2>PLATINUM</h2>
          <p>WEEKLY 300% FOR 1 TIMES</p>
          <h3>$ 675000</h3>
          <div>
            <span>
              <p>Minimum</p>
              <p>$10000.00</p>
            </span>
            <span>
              <p>Maximum</p>
              <p>$1250000.00</p>
            </span>
            <span>
              <p>Per time</p>
              <p>$2025000.00</p>
            </span>
            <span>
              <p>Total Return</p>
              <p>$2025000.00</p>
            </span>
          </div>
        </div>
      </div>
      <div className="question">
        <div className="first">
          <div>
            <h3>HAVE A QUESTION?</h3>
            <p>WE ARE HERE TO HELP!</p>
            <div>
              <Link to="/">
                <CgMail className="icon" />
                financialfreedom680@gmail.com
              </Link>
              <Link to="/">
                <MdCall className="icon" />
                +2779 985 8789
              </Link>
            </div>
          </div>
        </div>
        <div className="second">
          <h1>
            10% <br />
            REFERRAL <br />
            COMMISSION <br />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Plan;
