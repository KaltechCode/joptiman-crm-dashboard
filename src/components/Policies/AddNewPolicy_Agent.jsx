import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Stack,
  Typography,
  Switch,
  filledInputClasses,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import httpClient from "../../_util/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CustomizedSnackbars from "../../shared-component/Snackbar/SnackBar";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../Store/mainSlice";
import dayjs from "dayjs";
import Calendar from "../../shared-component/Calender/Calender";
import PoliciesDropdown from "../../shared-component/PoliciesDropdown";
import "./style.scss";

const AddNewPolicy_Agent = () => {
  const { id } = useParams();
  const { policyNumber } = useParams();
  const navigate = useNavigate();
  const snackbar_Ref = useRef(null);
  const dispatch = useDispatch();

  const [policyData, setPolicyData] = useState({
    isSplit: false,
    policySubmissionDate: "",
    policyCarrier: "",
    policyType: "",
    policyNumber: 0,
    agentCode: localStorage.getItem("agentCode"),
    agentCarrierNumber: localStorage.getItem("agentCarrierNumber"),
    contractLevel: localStorage.getItem("contractLevel"),
    overwrittingAgentFirstName: "",
    overwrittingAgentLastName: "",
    policyValue: 0,
    insuredFirstName: "",
    insuredLastName: "",

    split1_AgentFirstName: "",
    split1_AgentLastName: "",
    split1_AgentCode: "",
    split1_ContractLevel: "",
    split1_AgentCarrierNumber: "",
    split1_splitRatio: "",

    split2_AgentFirstName: "",
    split2_AgentLastName: "",
    split2_AgentCode: "",
    split2_ContractLevel: "",
    split2_AgentCarrierNumber: "",
    split2_splitRatio: "",
  });

  const handleInputChange = (data, field) => {
    setPolicyData((prevFormData) => ({ ...prevFormData, [field]: data }));
  };

  const handleDateChange = (date, field) => {
    const formattedDate = dayjs(date).format("M/D/YYYY");
    setPolicyData((prevFormData) => ({
      ...prevFormData,
      [field]: formattedDate,
    }));
  };

  const addNewPolicyHandler = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .post("/policies/addNewPolicy", policyData)
      .catch((error) => {
        dispatch(hideLoader());
        console.log("error", error);
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle",
        );
      });

    if (res?.status === 200) {
      dispatch(hideLoader());
      snackbar_Ref.current.showMessage(
        "success",
        res?.data.message,
        "",
        "i-chk-circle",
      );
      setTimeout(() => {
        navigate("/policies");
      }, 6000);
    }
  };

  const getPolicyDetail = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(
        id
          ? `/policies/getPolicyByID/${id}`
          : `/policies/getPolicyByPolicyNumber/${policyNumber}`,
      )
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle",
        );
      });

    if (res.status === 200) {
      dispatch(hideLoader());
      setPolicyData(res?.data);
    }
  };

  const handleToggle = () => {
    setPolicyData((prevState) => ({
      ...prevState,
      isSplit: !prevState.isSplit,
    }));
  };

  const handleAutocompleteValue = (data, field) => {
    setPolicyData((prevValue) => ({ ...prevValue, [field]: data }));
  };

  const carriers = [
    "TransAmerica",
    "Athene",
    "NationWide",
    "NorthAmerican",
    "Oscar",
    "Aetna",
    "BlueCross BlueShield",
    "United Healthcare",
    "LSPN",
    "Cigna",
    "National Life",
    "American General Life",
    "Lincoln National",
    "Pruco Life",
    "Allianz life",
    "Fidelity & Guaranty Life",
    "Pacific Life",
    "Symetra Life",
    "Amfirst/Axonic",
  ];

  const policyTypes = ["Life", "Health", "Annuities"];

  useEffect(() => {
    console.log("agentCode", policyData.agentCode);
    if (id) {
      getPolicyDetail();
    }
  }, []);

  useEffect(() => {
    console.log("agentCode", policyData.agentCode);
    if (policyNumber) {
      getPolicyDetail();
    }
  }, [policyNumber]);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "59px" }}>
        <div
          style={{
            display: "flex",
            height: "91.6vh",
            // overflowY: 'hidden'
          }}
        >
          <SideBar />
          <CustomizedSnackbars ref={snackbar_Ref} />
          <Stack
            sx={{
              width: "81.8%",
              marginLeft: "18%",
              height: policyData.isSplit ? "127vh" : "91vh",
            }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: "100%",
                marginTop: "10px",
                height: policyData.isSplit ? "141vh" : "105vh",
              }}
            >
              <Stack
                alignItems={"center"}
                sx={{
                  width: "96%",
                  height: "97%",
                  backgroundColor: "#F2F2F2",
                  borderRadius: "20px",
                }}
              >
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ width: "81%", height: "100%" }}
                >
                  <Stack
                    className="addNewPolicyTextField"
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    sx={{ width: "100%", height: "59%" }}
                  >
                    <Calendar
                      value={policyData.policySubmissionDate}
                      onDateChange={(date) =>
                        handleDateChange(date, "policySubmissionDate")
                      }
                    />

                    <PoliciesDropdown
                      value={policyData.policyCarrier}
                      options={carriers}
                      label="Policy Carrier"
                      origin="addPolicy"
                      onSelectValue={(data) =>
                        handleAutocompleteValue(data, "policyCarrier")
                      }
                    />

                    <PoliciesDropdown
                      value={policyData.policyType}
                      options={policyTypes}
                      label="Policy Type"
                      origin="addPolicy"
                      onSelectValue={(data) =>
                        handleAutocompleteValue(data, "policyType")
                      }
                    />
                    <TextField
                      disabled={id ? true : policyNumber ? true : false}
                      sx={{ width: "30%" }}
                      label="Policy Number:"
                      variant="filled"
                      value={policyData.policyNumber}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "policyNumber");
                      }}
                    />
                    <TextField
                      disabled={id ? true : policyNumber ? true : false}
                      sx={{ width: "30%" }}
                      label="Agent Carrier Number:"
                      variant="filled"
                      value={policyData.agentCarrierNumber}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "agentCarrierNumber");
                      }}
                    />

                    <TextField
                      disabled={true}
                      label="Agent Code:"
                      variant="filled"
                      sx={{ width: "30%" }}
                      value={policyData.agentCode}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "agentCode");
                      }}
                    />

                    <TextField
                      disabled={true}
                      label="Contract Level:"
                      variant="filled"
                      sx={{ width: "30%" }}
                      value={policyData.contractLevel}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "contractLevel");
                      }}
                    />
                    <TextField
                      disabled={id ? true : policyNumber ? true : false}
                      label="Premium:"
                      variant="filled"
                      sx={{ width: "30%" }}
                      value={policyData.policyValue}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "policyValue");
                      }}
                    />
                    <TextField
                      disabled={id ? true : policyNumber ? true : false}
                      label="Insured First Name:"
                      variant="filled"
                      sx={{ width: "30%" }}
                      value={policyData.insuredFirstName}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "insuredFirstName");
                      }}
                    />
                    <TextField
                      disabled={id ? true : policyNumber ? true : false}
                      label="Insured Last Name:"
                      variant="filled"
                      sx={{ width: "30%" }}
                      value={policyData.insuredLastName}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "insuredLastName");
                      }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      width: "100%",
                      height: policyData.isSplit ? "68%" : "8%",
                    }}
                  >
                    <Stack direction={"row"}>
                      <Typography>Is there any split</Typography>
                      <Switch
                        checked={policyData.isSplit}
                        onChange={handleToggle}
                        // color="primary" // You can customize the color if needed
                        sx={{ marginTop: "-8px", color: "#003478" }}
                      />
                    </Stack>

                    {policyData.isSplit ? (
                      <>
                        {/* Split1 details */}
                        <Typography className="details-heading">
                          SPLIT1 DETAILS:
                        </Typography>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          flexWrap={"wrap"}
                          sx={{ width: "100%", height: "59%" }}
                        >
                          <TextField
                            disabled={id ? true : policyNumber ? true : false}
                            label="Split1 Agent First Name:"
                            variant="filled"
                            sx={{ width: "30%" }}
                            value={policyData.split1_AgentFirstName}
                            onChange={(e) => {
                              handleInputChange(
                                e.target.value,
                                "split1_AgentFirstName",
                              );
                            }}
                          />
                          <TextField
                            disabled={id ? true : policyNumber ? true : false}
                            className="text-field"
                            label="Split1 Agent Last Name"
                            variant="filled"
                            value={policyData.split1_AgentLastName}
                            sx={{ width: "30%" }}
                            onChange={(e) => {
                              handleInputChange(
                                e.target.value,
                                "split1_AgentLastName",
                                "text",
                              );
                            }}
                          />
                          <TextField
                            disabled={id ? true : policyNumber ? true : false}
                            label="Split1 Agent Code"
                            variant="filled"
                            sx={{ width: "30%" }}
                            value={policyData.split1_AgentCode}
                            onChange={(e) => {
                              handleInputChange(
                                e.target.value,
                                "split1_AgentCode",
                                "text",
                              );
                            }}
                          />
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            sx={{ width: "65%" }}
                          >
                            <TextField
                              disabled={id ? true : policyNumber ? true : false}
                              label="Split1 Contract Level"
                              variant="filled"
                              sx={{ width: "46.3%" }}
                              value={policyData.split1_ContractLevel}
                              onChange={(e) => {
                                handleInputChange(
                                  e.target.value,
                                  "split1_ContractLevel",
                                );
                              }}
                            />
                            <TextField
                              disabled={id ? true : policyNumber ? true : false}
                              label="Split1 Split Ratio:"
                              variant="filled"
                              sx={{ width: "46%" }}
                              value={policyData.split1_splitRatio}
                              onChange={(e) => {
                                handleInputChange(
                                  e.target.value,
                                  "split1_splitRatio",
                                );
                              }}
                            />
                          </Stack>
                        </Stack>

                        {/* Split2 Details */}
                        <Typography className="details-heading">
                          SPLIT2 DETAILS:
                        </Typography>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          flexWrap={"wrap"}
                          sx={{ width: "100%", height: "59%" }}
                        >
                          <TextField
                            disabled={id ? true : policyNumber ? true : false}
                            label="Split2 Agent First Name"
                            className="text-field"
                            variant="filled"
                            value={policyData.split2_AgentFirstName}
                            sx={{ width: "30%" }}
                            onChange={(e) => {
                              handleInputChange(
                                e.target.value,
                                "split2_AgentFirstName",
                                "text",
                              );
                            }}
                          />
                          <TextField
                            disabled={id ? true : policyNumber ? true : false}
                            label="Split2 Agent Last Name"
                            className="text-field"
                            variant="filled"
                            value={policyData.split2_AgentLastName}
                            sx={{ width: "30%" }}
                            onChange={(e) => {
                              handleInputChange(
                                e.target.value,
                                "split2_AgentLastName",
                                "text",
                              );
                            }}
                          />
                          <TextField
                            disabled={id ? true : policyNumber ? true : false}
                            label="Split2 Agent Code:"
                            variant="filled"
                            value={policyData.split2_AgentCode}
                            sx={{ width: "30%" }}
                            onChange={(e) => {
                              handleInputChange(
                                e.target.value,
                                "split2_AgentCode",
                                "text",
                              );
                            }}
                          />
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            sx={{ width: "65%" }}
                          >
                            <TextField
                              disabled={id ? true : policyNumber ? true : false}
                              label="Split2 Contract Level"
                              variant="filled"
                              value={policyData.split2_ContractLevel}
                              sx={{ width: "46.3%" }}
                              onChange={(e) => {
                                handleInputChange(
                                  e.target.value,
                                  "split2_ContractLevel",
                                );
                              }}
                            />
                            <TextField
                              disabled={id ? true : policyNumber ? true : false}
                              label="Split2 Split Ratio"
                              variant="filled"
                              value={policyData.split2_splitRatio}
                              sx={{ width: "46%" }}
                              onChange={(e) => {
                                handleInputChange(
                                  e.target.value,
                                  "split2_splitRatio",
                                );
                              }}
                            />
                          </Stack>
                        </Stack>
                      </>
                    ) : (
                      <></>
                    )}
                  </Stack>

                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ width: "90%", height: "13vh" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        display: id ? "none" : policyNumber ? "none" : "",
                        backgroundColor: "#F08613",
                        color: "white",
                        width: "186px",
                        height: "5vh",
                        fontSize: "12px",
                        "&:hover": {
                          backgroundColor: "#F08613",
                        },
                      }}
                      onClick={addNewPolicyHandler}
                    >
                      Save
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#003478",
                        color: "white",
                        width: "186px",
                        height: "5vh",
                        fontSize: "12px",
                        "&:hover": {
                          backgroundColor: "#003478",
                        },
                      }}
                      onClick={() => navigate("/policies")}
                    >
                      Close
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AddNewPolicy_Agent;
