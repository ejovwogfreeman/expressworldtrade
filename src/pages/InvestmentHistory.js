import React from "react";
import Background from "../components/Background";
import "../css/General2.css";
// import { Link } from 'react-router-dom'
import Nav from "../components/Nav";
import { Helmet } from "react-helmet";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { TbArrowsDownUp } from "react-icons/tb";
import { transactionContext } from "../context/transactionContext";
// import loaderimg from "../assets/icons8-combo-chart.gif";
import Loader from "../components/Loader";

const InvestmentHistory = () => {
  const { investment } = React.useContext(transactionContext);

  const [investmentState, setInvestmentState] = investment;

  console.log(investment);
  return (
    <>
      {!investmentState ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            background: "#fff",
            zIndex: 100,
          }}
        >
          <Loader />
          {/* <p>
            <img src={loaderimg} />
          </p>
          <h2>Fetching Transacions</h2> */}
        </div>
      ) : (
        <>
          <Helmet>
            <title>ET-Options | Investment History</title>
          </Helmet>
          <Nav />
          <div className="general-container2">
            <Background text="INVESTMENT HISTORY" />
            <div className="body">
              <div className="content">
                <div className="account-stats scroll-x">
                  <h3>INVESTMENT HISTORY</h3>
                  <div className="card-show ref-user">
                    <div className="form">
                      <div>
                        Show entries:&nbsp;
                        <select>
                          <option value="">10</option>
                          <option value="">25</option>
                          <option value="">50</option>
                          <option value="">100</option>
                        </select>
                      </div>
                      <div>
                        Search:&nbsp;
                        <input type="text" />
                      </div>
                    </div>
                    <br />
                    {investmentState.length > 0 ? (
                      <table>
                        <thead>
                          <td>#&nbsp;S/N</td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Date
                          </td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Transaction ID
                          </td>
                          {/* <td>
                            <TbArrowsDownUp />
                            &nbsp;Investment Method
                          </td> */}
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Investment Plan
                          </td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Amount Invested
                          </td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Comission
                          </td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Compound Weekly
                          </td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Term Monthly
                          </td>
                          <td>
                            <TbArrowsDownUp />
                            &nbsp;Status
                          </td>
                        </thead>
                        {investmentState.map((x, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{new Date(x.createdAt).toDateString()}</td>
                                <td>{x._id}</td>
                                <td>{x.plan}</td>
                                <td>{x.amount}</td>
                                <td>
                                  {x.plan === "Starter Plan" && "150%"}
                                  {x.plan === "Silver Plan" && "200%"}
                                  {x.plan === "Goldr Plan" && "300%"}
                                </td>
                                <td>200</td>
                                <td>300</td>
                                <td>
                                  <small
                                    style={{
                                      padding: "3px",
                                      borderRadius: "5px",
                                      fontSize: "10px",
                                      color: "white",
                                      background:
                                        x.status === "pending"
                                          ? "gold"
                                          : x.status === "confirmed"
                                          ? "green"
                                          : x.status === "processing"
                                          ? "orange"
                                          : "red",
                                    }}
                                  >
                                    {x.status}
                                  </small>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    ) : (
                      <small className="division">
                        No data available in table
                      </small>
                    )}
                    <br />
                    <div className="form">
                      <small>showing {investmentState.length} entries</small>
                      <div>
                        <BsArrowLeftCircleFill />
                        &nbsp;&nbsp;
                        <BsArrowRightCircleFill />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InvestmentHistory;
