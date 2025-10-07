import React, { useRef, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import httpClient from "../../_util/api";
import { useDispatch } from "react-redux";
import CustomizedSnackbars from "../../shared-component/Snackbar/SnackBar";
import { hideLoader, showLoader } from "../../Store/mainSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import JOptimanLogo3d from "../../assets/JOptimanlogo.png";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const snackbar_Ref = useRef(null);
  const dispatch = useDispatch();

  const [isForgetPassword, setIsForgetPassword] = useState(true);
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    OTP: "",
  });

  // urls
  const registerUrl =
    "https://link.joptimanconsultancy.com/widget/form/ziWPHtzQiDL1oa5rlRcu";

  const handleInputChange = (data, field) => {
    setUserCredentials((prevFormData) => ({ ...prevFormData, [field]: data }));
  };

  const nextHandler = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .post("/user/forgetPassword", userCredentials)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response?.data?.message,
          "",
          "i-chk-circle"
        );
      });

    if (res?.status === 200) {
      dispatch(hideLoader());
      snackbar_Ref.current.showMessage(
        "success",
        res?.data?.message,
        "",
        "i-chk-circle"
      );
      setIsForgetPassword(false);
      setIsVerifyOTP(true);
    }
  };

  const verifyOTPHandler = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .post("/user/verifyOTP", userCredentials)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response?.data?.message,
          "",
          "i-chk-circle"
        );
      });

    if (res?.status === 200) {
      dispatch(hideLoader());
      snackbar_Ref.current.showMessage(
        "success",
        res?.data?.message,
        "",
        "i-chk-circle"
      );
      setIsVerifyOTP(false);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100%", minHeight: "100%", backgroundColor: "white" }}
        className=""
      >
        <CustomizedSnackbars ref={snackbar_Ref} />

        <Stack className="Login-container" style={{ width: "380px" }}>
          <Stack
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ width: "100%" }}
          >
            <Stack sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {isForgetPassword
                  ? "Forgot Password"
                  : isVerifyOTP
                  ? "Forgot Password"
                  : "Forgot Password"}
              </Typography>
              <p>
                Don’t have a Joptiman account?{" "}
                <Link
                  to={registerUrl}
                  //   onClick={() => setIsFlipped(false)}
                >
                  <span style={{ color: "#F78B2B" }}>Register Here*</span>
                </Link>
              </p>

              {/* Step 1: Enter Email */}
              <div
                style={{
                  width: "100%",
                  display: isForgetPassword && !isVerifyOTP ? "flex" : "none",
                  marginTop: "30px",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <div
                  className=""
                  style={{
                    mb: 2,
                    width: "100%",
                    height: "max-content !important",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography>Email</Typography>
                  <TextField
                    id="outlined-basic"
                    placeholder="Email Address"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleInputChange(e.target.value, "email")}
                  />
                </div>

                <button
                  style={{
                    backgroundColor: "#0c0544",
                    color: "white",
                    width: "100%",
                    height: "42px",
                    fontSize: "12px",
                    borderRadius: 5,
                    transition: ".5s",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F08613";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0c0544";
                    e.currentTarget.style.color = "white";
                  }}
                  onClick={nextHandler}
                >
                  Next
                </button>
              </div>

              {/* Step 2: Enter OTP and New Password */}
              <Stack
                justifyContent={"space-between"}
                style={{
                  width: "100%",
                  display: isVerifyOTP ? "flex" : "none",
                }}
              >
                <Stack
                  justifyContent={"space-between"}
                  className="textField-container"
                  sx={{ mb: 2 }}
                >
                  <Typography>OTP</Typography>
                  <TextField
                    id="otp-input"
                    placeholder="OTP"
                    variant="outlined"
                    sx={{}}
                    onChange={(e) => handleInputChange(e.target.value, "OTP")}
                  />
                </Stack>

                <Stack
                  justifyContent={"space-between"}
                  className="textField-container"
                  sx={{ mb: 2 }}
                >
                  <Typography>New Password</Typography>
                  <TextField
                    id="password-input"
                    placeholder="Password"
                    variant="outlined"
                    sx={{}}
                    type="password"
                    onChange={(e) =>
                      handleInputChange(e.target.value, "password")
                    }
                  />
                </Stack>

                <LoadingButton
                  variant="contained"
                  style={{
                    backgroundColor: "#0c0544",
                    color: "white",
                    width: "100%",
                    height: "42px",
                    fontSize: "12px",
                    borderRadius: 5,
                    transition: ".5s",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F08613";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0c0544";
                    e.currentTarget.style.color = "white";
                  }}
                  onClick={verifyOTPHandler}
                >
                  Verify OTP
                </LoadingButton>
                <div>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "#F78B2B",
                      marginTop: "10px",
                    }}
                  >
                    Back to Login
                  </Link>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

const ForgetPasswordPage = () => {
  const snackbar_Ref = useRef(null);

  return (
    <div className="registerForm__mianWrapper">
      <div className="registerForm_Container">
        {/* Flip Card Container */}
        <div className="registerForm_firstBox">
          <ForgetPassword />
        </div>
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
export default ForgetPasswordPage;
