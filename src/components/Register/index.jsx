import React, { useRef, useState } from "react";
import "./SteperFormSection.css";
import JOptimanLogo3d from "../../assets/JOptimanlogo.png";
import httpClient from "../../_util/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomizedSnackbars from "../../shared-component/Snackbar/SnackBar";
import {
  hideLoader,
  setIsLoggedIn,
  setUserDetail,
  showLoader,
} from "../../Store/mainSlice";

const Register = () => {
  const [isFlipped, setIsFlipped] = useState(true);

  const snackbar_Ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.mainSlice.userdetail);
  // const userId = useSelector((state)=>state.mainSlice.userdetail.userId)
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    OTP: "",
  });

  const handleInputChange = (data, field) => {
    setUserCredentials((prevFormData) => ({ ...prevFormData, [field]: data }));
  };

  const forgotPasswordHandler = () => {
    setIsForgetPassword(true);
  };

  const nextHandler = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .post("/user/forgetPassword", userCredentials)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle"
        );
      });

    console.log("status", res);
    if (res?.status === 200) {
      dispatch(hideLoader());
      snackbar_Ref.current.showMessage(
        "success",
        res?.data.message,
        "",
        "i-chk-circle"
      );
      setIsForgetPassword(false);
      setIsVerifyOTP(true);
    }

    // setIsForgetPassword(false)
    // setIsVerifyOTP(true)
  };

  const verifyOTPHandler = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .post("/user/verifyOTP", userCredentials)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle"
        );
      });

    if (res?.status === 200) {
      dispatch(hideLoader());
      snackbar_Ref.current.showMessage(
        "success",
        res?.data.message,
        "",
        "i-chk-circle"
      );
      setIsVerifyOTP(false);
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    dispatch(showLoader());
    const res = await httpClient
      .post("/user/login", userCredentials)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle"
        );
      });

    console.log("login res", res);

    if (res?.status === 200) {
      dispatch(hideLoader());
      const authToken = res.data.token;
      const isAdmin = res.data.isAdmin ? res.data.isAdmin : false;
      const isFinanceUser = res.data.isFinanceUser
        ? res.data.isFinanceUser
        : false;
      const userId = res.data.userId;
      const firstName = res.data.firstName;
      const lastName = res.data.isAdmin
        ? res.data.lastName
        : res.data.isFinanceUser
        ? res.data.lastName
        : "";
      const adminCode = res.data.isAdmin ? res.data.adminCode : "";
      const agentTitle = res.data.isAdmin
        ? ""
        : res.data.isFinanceUser
        ? ""
        : res.data.agentTitle;
      const agentCode = res.data.isAdmin
        ? ""
        : res.data.isFinanceUser
        ? ""
        : res.data.agentCode;
      const contractLevel = res.data.isAdmin
        ? ""
        : res.data.isFinanceUser
        ? ""
        : res.data.contractLevel;
      const profilePic = res.data.profilePic;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("isFinanceUser", isFinanceUser);
      localStorage.setItem("userId", userId);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("adminCode", adminCode);
      localStorage.setItem("agentTitle", agentTitle);
      localStorage.setItem("agentCode", agentCode);
      localStorage.setItem("contractLevel", contractLevel);
      dispatch(setIsLoggedIn(true));
      dispatch(setUserDetail(res.data));
      snackbar_Ref.current.showMessage(
        "success",
        res?.data.message,
        "",
        "i-chk-circle"
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  return (
    <div className="registerForm__mianWrapper">
      <div className="registerForm_Container">
        {/* Flip Card Container */}
        <div className="registerForm_firstBox">
          <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
            {/* Login Back Side */}
            <div className="flip-card-back">
              <div className="registerForm_firstBbox_heading">
                <h1>Agent Login</h1>
                <p>
                  Don’t have a Joptiman account?{" "}
                  <button type="button" onClick={() => setIsFlipped(false)}>
                    <span style={{ color: "#F78B2B" }}>Register Here*</span>
                  </button>
                </p>
              </div>

              <form onSubmit={loginHandler} method="POST">
                <div className="registerForm_wrapper">
                  <div className="registerForm_name">
                    <label htmlFor="">
                      Email/Agent Registration ID{" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id=""
                      onChange={(e) =>
                        handleInputChange(e.target.value, "email")
                      }
                    />
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">
                      Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id=""
                      onChange={(e) =>
                        handleInputChange(e.target.value, "password")
                      }
                    />
                  </div>
                </div>
                <button className="registerForm_btn_login" type="submit">
                  Login
                </button>
              </form>
            </div>

            {/* Registration Front Side */}
            <div className="flip-card-front">
              <div className="registerForm_firstBbox_heading">
                <h1>Agent Registration</h1>
                <p>
                  Already have a Joptiman account?{" "}
                  <button type="button" onClick={() => setIsFlipped(true)}>
                    <span style={{ color: "#F78B2B" }}>Login Here*</span>
                  </button>
                </p>
              </div>

              <form>
                <div className="registerForm_wrapper">
                  <div className="registerForm_Name_wrapper">
                    <div className="registerForm_name">
                      <label htmlFor="">
                        First name <span className="required">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>

                    <div className="registerForm_name">
                      <label htmlFor="">
                        Last name <span className="required">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">
                      Email address <span className="required">*</span>
                    </label>
                    <input type="email" name="" id="" />
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">
                      Phone number <span className="required">*</span>
                    </label>
                    <input type="tel" name="" id="" />
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">
                      Address line 1 <span className="required">*</span>
                    </label>
                    <input type="text" name="" id="" />
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">Address line 2</label>
                    <input type="text" name="" id="" />
                  </div>

                  <div className="registerForm_city">
                    <div className="registerForm_name">
                      <label htmlFor="">
                        City <span className="required">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>

                    <div className="registerForm_name">
                      <label htmlFor="">
                        State <span className="required">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>

                    <div className="registerForm_name">
                      <label htmlFor="">
                        Zip <span className="required">*</span>
                      </label>
                      <input type="text" name="" id="" />
                    </div>
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">Recruiting Agent Number ID</label>
                    <input type="text" name="" id="" />
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">Are you a licensed agent?</label>
                    <select name="" id="">
                      <option value="" disabled>
                        Select one
                      </option>
                    </select>
                  </div>

                  <div className="registerForm_name">
                    <label htmlFor="">Select license state</label>
                    <select name="" id="">
                      <option value="" disabled>
                        Select one
                      </option>
                    </select>
                  </div>
                </div>
                <button className="registerForm_btn">Next</button>
              </form>
            </div>
          </div>
        </div>

        {/* Static Right Side Content */}
        <div className="registerForm_secondBox">
          <CustomizedSnackbars ref={snackbar_Ref} />
          <img src={JOptimanLogo3d} alt="" className="registerForm_logo" />
          <div className="registerForm_secondBox_Text">
            <p>JOptiman Consultancy Agent Registration</p>
            <ul>
              <li>
                Join an innovative, client-focused financial consulting team
              </li>
              <li>
                Access exclusive training and professional development
                opportunities
              </li>
            </ul>
            <p>
              If you are an existing JOptiman Consultancy agent, you can
              register a new agent using your current login credentials. This
              single sign-in allows you to oversee multiple agents, including
              your existing account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
