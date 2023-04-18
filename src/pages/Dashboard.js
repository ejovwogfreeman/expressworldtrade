import React, { useEffect, useReducer } from "react";
import Background from "../components/Background";
import "../css/General2.css";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import { Helmet } from "react-helmet";
import { FaRecycle, FaRegMoneyBillAlt } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { UserContext } from "../context/UserContext";
import { transactionContext } from "../context/transactionContext";
import { ToastifyContext } from "../context/ToastifyContext";
import { getUser } from "../data";
import { TbArrowsDownUp } from "react-icons/tb";
import Loader from "../components/Loader";
// import loaderimg from "../assets/icons8-combo-chart.gif";

const Dashboard = () => {
  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [UserState, setUserState] = React.useContext(UserContext);
  const { transaction, withdrawal, deposit, investment } =
    React.useContext(transactionContext);
  const [loading, setLoading] = React.useState(false);

  const [transactionState, setTransactionState] = transaction;

  const [depositState, setDepositState] = deposit;

  const [investmentState, setInvestmentState] = investment;

  const [withdrawalState, setWithdrawalState] = withdrawal;

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(async () => {
  //   setLoading(true);
  //   let user = await getUser(UserState.token);

  //   if (user.error) {
  //     setLoading(false);
  //     setToastifyState({
  //       ...ToastifyState,
  //       message: user.message,
  //       variant: "error",
  //       open: true,
  //     });
  //     return navigate("/login");
  //   }
  //   localStorage.setItem("user", JSON.stringify(user));
  //   setUserState(user);

  //   setLoading(false);
  //   location.state = null;

  //   if (!user.username) {
  //     return navigate("/login");
  //   }
  // }, [location.state]);

  return (
    <>
      {!transactionState ||
      !depositState ||
      !investmentState ||
      !withdrawalState ||
      loading ? (
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
        </div>
      ) : (
        <>
          <Helmet>
            <title>FFInvestment | Dashboard</title>
          </Helmet>
          <Nav />
          <div className="general-container2">
            <Background text="YOUR DASHBOARD" />
            <div className="body">
              <div className="content">
                <div className="account-stats">
                  <h3>Account Statistics</h3>
                  <div className="card-show">
                    <div className="card">
                      <div className="card-head">
                        <FaRegMoneyBillAlt className="icon" />
                        <h5>$ {UserState.balance}</h5>
                      </div>
                      <div className="card-tail">
                        <small>Total Deposits / Current Balance</small>
                        <BsArrowRightCircleFill />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-head">
                        <FaRecycle className="icon" />
                        <h5>
                          {investmentState.length}
                          {/* $
                          {withdrawalState && withdrawalState.length > 0
                            ? withdrawalState.reduce(
                                (a, b) => Number(a.amount) + Number(b.amount),
                                0
                              )
                            : 0} */}
                        </h5>
                      </div>
                      <div className="card-tail">
                        <small>Total no. of investments</small>
                        <BsArrowRightCircleFill />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-head">
                        <FaRecycle className="icon" />
                        <h5>
                          {withdrawalState.length}
                          {/* $
                          {withdrawalState && withdrawalState.length > 0
                            ? withdrawalState.reduce(
                                (a, b) => Number(a.amount) + Number(b.amount),
                                0
                              )
                            : 0} */}
                        </h5>
                      </div>
                      <div className="card-tail">
                        <small>Total no. of Withdraws</small>
                        <BsArrowRightCircleFill />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="account-stats scroll-x">
                  <h3>Reference User</h3>
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
                    <table>
                      <thead>
                        <td>#&nbsp;ID</td>
                        <td>
                          <TbArrowsDownUp />
                          &nbsp;Register Date
                        </td>
                        <td>
                          <TbArrowsDownUp />
                          &nbsp;Username
                        </td>
                        <td>
                          <TbArrowsDownUp />
                          &nbsp;Name
                        </td>
                        <td>
                          <TbArrowsDownUp />
                          &nbsp;Email
                        </td>
                        <td>
                          <TbArrowsDownUp />
                          &nbsp;Phone Number
                        </td>
                        <td>
                          <TbArrowsDownUp />
                          &nbsp;Status
                        </td>
                      </thead>
                    </table>
                    <small className="division">
                      No data available in table
                    </small>
                    <br />
                    <div className="form">
                      <div>
                        <small>showing 0 of 0 entries</small>
                      </div>
                      <div>
                        <BsArrowLeftCircleFill />
                        &nbsp;&nbsp;
                        <BsArrowRightCircleFill />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="account-stats">
                  <h3>
                    Number Of Your Referral: {UserState.referrals} <br /> Your
                    Referral Link:
                  </h3>
                  <div className="card-show">
                    <form action="">
                      <input
                        type="text"
                        value={`https://expressworldtrade.com/register/${UserState.referralId}`}
                        disabled
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(
                            `https://expressworldtrade.com/register/${UserState.referralId}`
                          );
                          setToastifyState({
                            ...ToastifyState,
                            message: "Link copied to clipboard",
                            variant: "success",
                            open: true,
                          });
                        }}
                      >
                        COPY TO CLIPBOARD
                      </button>
                    </form>
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

export default Dashboard;
