import React, { useState } from "react";
import Background from "../components/Background";
import "../css/General2.css";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { Helmet } from "react-helmet";
import { GiCheckMark } from "react-icons/gi";
import { FaTelegramPlane } from "react-icons/fa";
// import Modals from "../components/Modalinveststarter.js.js";

const InvestmentPackage = ({ modal, openModal }) => {
  return (
    <>
      <Helmet>
        <title>FFInvestment | Investment Package</title>
      </Helmet>
      <Nav />
      <div className="general-container2">
        <Background text="INVESTMENT PACKAGE" />
        <div className="body investment">
          <div className="plan-box">
            <h3>STARTER</h3>
            <div>
              <h6>300.00 USD - 75000.00 USD</h6>
              <p>
                <GiCheckMark />
                &nbsp;Commission - 150%
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Repeat - 1 times
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Compound - Weekly
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Term - Monthly
              </p>
              <p className="last">
                <Link to="/investment/Starter Plan">
                  <FaTelegramPlane />
                  &nbsp;Invest Under This Package
                </Link>
              </p>
            </div>
          </div>
          <div className="plan-box">
            <h3>SILVER</h3>
            <div>
              <h6>75000.00 USD - 100000.00 USD</h6>
              <p>
                <GiCheckMark />
                &nbsp;Commission - 200%
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Repeat - 1 times
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Compound - Weekly
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Term - Monthly
              </p>
              <p className="last">
                <Link to="/investment/Silver Plan">
                  <FaTelegramPlane />
                  &nbsp;Invest Under This Package
                </Link>
              </p>
            </div>
          </div>
          <div className="plan-box">
            <h3>GOLD</h3>
            <div>
              <h6>100000.00 USD - 1250000.00 USD</h6>
              <p>
                <GiCheckMark />
                &nbsp;Commission - 300%
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Repeat - 1 times
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Compound - Weekly
              </p>
              <p>
                <GiCheckMark />
                &nbsp;Term - Monthly
              </p>
              <p className="last">
                <Link to="/investment/Gold Plan">
                  <FaTelegramPlane />
                  &nbsp;Invest Under This Package
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentPackage;
