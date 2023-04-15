import React, { useEffect } from "react";
import "../css/Modal.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { UserContext } from "../context/UserContext";
import { ToastifyContext } from "../context/ToastifyContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { makeInvestment, getUser } from "../data";

const Modalinveststarter = () => {
  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [loading, setLoading] = React.useState(false);
  const [UserState, setUserState] = React.useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();

  const [planDetails, setPlanDetails] = React.useState({
    plan: params.plan ? params.plan : "Starter Plan",
    amount: null,
  });

  const handleSubmit = async () => {
    setLoading(true);

    let Investment = await makeInvestment(UserState.token, planDetails);

    if (Investment.error) {
      setLoading(false);
      return setToastifyState({
        ...ToastifyState,
        message: Investment.message,
        variant: "error",
        open: true,
      });
    }

    setToastifyState({
      ...ToastifyState,
      message: "Investment Successful, an email has been sent to you.",
      variant: "success",
      open: true,
    });

    setLoading(false);
    setPlanDetails({ ...planDetails, amount: null });
    navigate("/", { state: "reload" });
  };

  useEffect(() => {
    if (params.plan) {
      setPlanDetails({ ...planDetails, plan: params.plan });
    }
  }, [params]);

  return (
    <div className="modal-container">
      <Link to="/investment-package" className="nav-icon">
        <BsFillArrowLeftCircleFill />
      </Link>
      <div className="modal-box deposit">
        <h2>Investment On {planDetails.plan}</h2>
        <div>
          <h3>Your Balance</h3>
          <p>${UserState.balance}</p>
        </div>
        <form>
          <h3>Investment Range</h3>
          <p>
            {planDetails.plan.toLowerCase().includes("starter") && (
              <>300.00 USD - 75000.00 USD</>
            )}
            {planDetails.plan.toLowerCase().includes("silver") && (
              <>75000.00 USD - 100000.00 USD</>
            )}
            {planDetails.plan.toLowerCase().includes("gold") && (
              <>100000.00 USD - 1250000.00 USD</>
            )}
          </p>
          <div>
            <h3>Amount To Invest</h3>
            <input
              type="number"
              placeholder="Amount To Invest"
              value={planDetails.amount}
              onChange={(e) =>
                setPlanDetails({ ...planDetails, amount: e.target.value })
              }
              required
            />{" "}
            <br /> <br />
            <select
              onChange={(e) => {
                navigate(`/investment/${e.target.value}`);
              }}
              value={params.plan ? params.plan : "Starter Plan"}
            >
              <option value={"Starter Plan"}>Starter Plan</option>
              <option value={"Silver Plan"}>Silver Plan</option>
              <option value={"Gold Plan"}>Gold Plan</option>
            </select>
          </div>
          <br />
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.3)",
              borderRadius: "5px",
              width: "90%",
              margin: "auto",
              padding: "0",
            }}
          >
            <h5
              style={{
                background: "rgb(8, 5, 34)",
                color: "rgb(35, 201, 216)",
                margin: "0px",
                padding: "10px",
              }}
            >
              Your Investment Details
            </h5>
            <p
              style={{
                padding: "5px",
                borderBottom: "1px solid rgba(0,0,0,0.3)",
                margin: "0px",
              }}
            >
              <GiCheckMark />
              &nbsp;Comission -{" "}
              {planDetails.plan.toLowerCase().includes("starter") && <>150%</>}
              {planDetails.plan.toLowerCase().includes("silver") && <>200%</>}
              {planDetails.plan.toLowerCase().includes("gold") && <>300%</>}
            </p>
            <p
              style={{
                padding: "5px",
                borderBottom: "1px solid rgba(0,0,0,0.3)",
                margin: "0px",
              }}
            >
              <GiCheckMark />
              &nbsp;Compound Weekly - 200
            </p>
            <p
              style={{
                padding: "5px",
                margin: "0px",
              }}
            >
              <GiCheckMark />
              &nbsp;Term Monthly - 300
            </p>
          </div>
          <br />
          <button onClick={handleSubmit} disabled={loading}>
            <FaTelegramPlane /> {loading ? "LOADING..." : "INVEST"}
          </button>
        </form>
        <br />
        {/* <Link to="/investment-package" style={{ marginTop: "0px" }}>
          Go back
        </Link> */}
      </div>
    </div>
  );
};

export default Modalinveststarter;
