import React, { useEffect, useRef, useState } from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import profilePhoto from "../../assets/profilePhotoCRM.png";
import "./style.scss";
import httpClient from "../../_util/api";
import { useNavigate, useParams } from "react-router-dom";
import CustomSnackbar from "../../shared-component/Snackbar/SnackBar";
import { hideLoader, showLoader } from "../../Store/mainSlice";
import { useDispatch } from "react-redux";
import PoliciesDropdown from "../../shared-component/PoliciesDropdown";

const AddNewAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const snackbar_Ref = useRef(null);
  const dispatch = useDispatch();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const recruitingAgentCode = localStorage.getItem("userId");
  const [agentData, setAgentData] = useState({
    firstName: "",
    lastName: "",
    level: 0,
    agentCarrierNumber: "",
    agentTitle: "",
    agentRole: "",
    recruitmentDate: "",
    recruits: 0,
    commissionEarned: 0,
    email: "",
  });

  const agentTitle = [
    "Associate in Training",
    "Associate",
    "Director",
    "Executive President",
  ];

  const handleInputChange = (data, field) => {
    setAgentData((prevFormData) => ({ ...prevFormData, [field]: data }));
  };

  const handleAutocompleteValue = (data, field) => {
    setAgentData((prevValue) => ({ ...prevValue, [field]: data }));
    if (data === "Associate in Training") {
      setAgentData((prevValue) => ({ ...prevValue, level: 0.0 }));
    } else if (data === "Associate") {
      setAgentData((prevValue) => ({ ...prevValue, level: 0.5 }));
    } else if (data === "Director") {
      setAgentData((prevValue) => ({ ...prevValue, level: 0.7 }));
    } else {
      setAgentData((prevValue) => ({ ...prevValue, level: 0.9 }));
    }
  };

  const submitHandler = async () => {
    dispatch(showLoader());
    if (id) {
      const res = await httpClient
        .post(`/agents/editAgent/${id}`, agentData)
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
        console.log("Add new agent res", res);
        navigate(`/agent`);
      }
    } else if (isAdmin === true) {
      const res = await httpClient
        .post("/agents/addNewAgent", agentData)
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
        setTimeout(() => {
          navigate("/recruits");
        }, 6000);
      }
    } else {
      const res = await httpClient
        .post(`/agents/addNewAgent/${recruitingAgentCode}`, agentData)
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
        setTimeout(() => {
          navigate("/recruits");
        }, 6000);
      }
    }
  };

  const LoadAgentData = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(`/agents/getAgentByID/${id}`)
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
      console.log("Detail res", res);
      setAgentData(res.data.agentDetails);
    }
  };

  useEffect(() => {
    if (id) {
      LoadAgentData();
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ marginTop: "56px" }}>
        <div
          style={{
            display: "flex",
            height: "92vh",
            overflowY: "hidden",
          }}
        >
          <SideBar />
          <CustomSnackbar ref={snackbar_Ref} />
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ width: "100%", height: "92vh", marginLeft: "18%" }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: "98%",
                height: "95%",
                backgroundColor: "#F2F2F2",
                borderRadius: "15px",
              }}
            >
              <Stack
                alignItems={"center"}
                sx={{ width: "100%", height: "73%" }}
              >
                <Stack
                  flexDirection={"row"}
                  justifyContent={"center"}
                  sx={{ width: "97%", height: "68%" }}
                >
                  <Stack
                    alignItems={"center"}
                    sx={{
                      width: "58%",
                      height: "42vh",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                  >
                    <Box sx={{ width: "22%", height: "12vh" }}>
                      <img
                        src={profilePhoto}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <Stack>
                      <Typography>Name:{agentData.firstName}</Typography>
                      <Typography>Level:{agentData.level}</Typography>
                      <Typography>Agent Code:{agentData.agentCode}</Typography>
                      <Typography>
                        Agent Title:{agentData.agentTitle}
                      </Typography>
                      <Typography>Agent Role:{agentData.agentRole}</Typography>
                      <Typography>
                        Recruitment Date:{agentData.recruitmentDate}
                      </Typography>
                      <Typography>
                        Recruits:{agentData.recruitmentDate}
                      </Typography>
                      <Typography>
                        Commision Earned:{agentData.commissionEarned}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    alignItems={"center"}
                    sx={{ width: "100%", height: "45vh", marginLeft: "23px" }}
                  >
                    <Stack
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      sx={{ width: "100%", height: "98%" }}
                    >
                      <TextField
                        className="Account-Textfield"
                        label="First Name:"
                        variant="filled"
                        sx={{
                          width: "30%",
                          height: "10vh",
                          marginLeft: "23px",
                        }}
                        value={agentData.firstName}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "firstName");
                        }}
                      />
                      <TextField
                        className="Account-Textfield"
                        label="Last Name:"
                        variant="filled"
                        sx={{
                          width: "30%",
                          height: "10vh",
                          marginLeft: "23px",
                        }}
                        value={agentData.lastName}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "lastName");
                        }}
                      />
                      <TextField
                        label="Level:"
                        variant="filled"
                        disabled={true}
                        sx={{ width: "30%", marginLeft: "23px" }}
                        value={agentData.level}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "level");
                        }}
                      />

                      <PoliciesDropdown
                        value={agentData.agentTitle}
                        options={agentTitle}
                        label="Agent Title:"
                        origin="addAgent"
                        onSelectValue={(data) =>
                          handleAutocompleteValue(data, "agentTitle")
                        }
                      />

                      <TextField
                        label="Recruitment Date:"
                        variant="filled"
                        sx={{ width: "30%", marginLeft: "23px" }}
                        value={agentData.recruitmentDate}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "recruitmentDate");
                        }}
                      />

                      <TextField
                        label="Recruits"
                        variant="filled"
                        sx={{ width: "30%", marginLeft: "23px" }}
                        value={agentData.recruits}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "recruits");
                        }}
                      />

                      <TextField
                        label="Commission Earned:"
                        variant="filled"
                        sx={{ width: "30%", marginLeft: "23px" }}
                        value={agentData.commissionEarned}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "commissionEarned");
                        }}
                      />

                      <TextField
                        label="Email:"
                        variant="filled"
                        sx={{ width: "30%", marginLeft: "23px" }}
                        value={agentData.email}
                        onChange={(e) => {
                          handleInputChange(e.target.value, "email");
                        }}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  justifyContent={"flex-end"}
                  alignItems={"flex-end"}
                  sx={{ width: "97%", height: "20vh" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#003478",
                      color: "white",
                      width: "170px",
                      height: "5vh",
                      fontSize: "12px",
                      "&:hover": {
                        backgroundColor: "#003478",
                      },
                    }}
                    onClick={submitHandler}
                  >
                    Promote
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default AddNewAgent;
