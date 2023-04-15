import React from "react";
import Background from "./Background";
import "../css/General.css";
import Nav from "./Nav";
import { Helmet } from "react-helmet";

const Faq = () => {
  return (
    <>
      <Helmet>
        <title>FFInvestment | FAQ</title>
      </Helmet>
      <Nav />
      <div className="general-container">
        <Background text="FAQ" />
        <div className="body">
          <p>
            <strong>Who are we?</strong> <br />
            We are a registered company for cryptocurrency investments solution.
            We give a chance to new, dynamically developing ICO projects that
            bring huge profits in an amazing short time. Join Us by choosing one
            of our plans today.
          </p>
          <p>
            <strong>How do I start?</strong> <br />
            You can start by signing up for an account, depositing into your
            account, making profit based on the plan you choose and withdraw
            while trading session is completed
          </p>
          <p>
            <strong>What are the available plans?</strong> <br />
            As stated on the landing page of this website, we have the Starter
            plan, Silver plan and the Gold plan. And all plans comes with
            benefits.
          </p>
        </div>
      </div>
    </>
  );
};

export default Faq;
