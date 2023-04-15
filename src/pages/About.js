import React from "react";
import Background from "../components/Background";
import "../css/General.css";
import Nav from "../components/Nav";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>FFInvestment | About</title>
      </Helmet>
      <Nav />
      <div className="general-container">
        <Background text="ABOUT" />
        <div className="body">
          <p>
            A Revolution in the Making{" "}
            <strong>Financial Freedom Investment Company</strong> is a young
            force in the Forex and CFD markets, committed to delivering a
            powerful, accessible and fair trading Experience. Led by a team of
            professionals with years of experience in the field, we have always
            put innovation, speed and agility at the core of our business.{" "}
            <br /> <br />
            As we grow our reach and cement ourselves as a online broker on the
            rise, we look forward to further providing our clients with the
            right tools and services to assist their trading needs, leading the
            charge towards the future of trading.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
