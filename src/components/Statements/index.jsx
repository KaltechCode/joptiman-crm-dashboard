import React, { useEffect, useRef, useState } from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CRMGrid from "../../shared-component/CRM-Grid.jsx";
import "./style.scss";
import httpClient from "../../_util/api.jsx";
import CustomizedSnackbars from "../../shared-component/Snackbar/SnackBar.jsx";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../Store/mainSlice.js";
import Calendar from "../../shared-component/Calender/Calender.jsx";
import dayjs from "dayjs";
import { MagnifyingGlass } from "phosphor-react";
import DownloadExcel from "./DownloadExcel.js";

const Statements = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isFinanceUser = JSON.parse(localStorage.getItem("isFinanceUser"));
  const agentCode = localStorage.getItem("agentCode");
  const [gridData, setGridData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const snackbar_Ref = useRef(null);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  let date = new Date();
  let currentDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  let currentMonth = `${date.toLocaleString("en-us", {
    month: "long",
  })} ${date.getFullYear()}`;

  const adminGridHeader = [
    {
      field: "paidOutDate",
      headerName: "Paid Out Date",
      width: "20%",
      isLink: true,
    },
    {
      field: "policyCarrier",
      headerName: "Policy Carrier:",
      width: "20%",
      isLink: true,
    },
    {
      field: "policyNumber",
      headerName: "Policy Number:",
      width: "20%",
      isLink: true,
    },
    {
      field: "insuredFirstName",
      headerName: "Insured First Name:",
      width: "20%",
      isLink: true,
    },
    {
      field: "insuredLastName",
      headerName: "Insured Last Name:",
      width: "20%",
      isLink: true,
    },
    {
      field: "agentCarrierNumber",
      headerName: "Agent Carrier Number",
      width: "20%",
      isLink: true,
    },
    {
      field: "premium",
      headerName: "Premium:",
      width: "20%",
      isLink: true,
    },
    {
      field: "balance",
      headerName: "Policy Balance:",
      width: "20%",
      isLink: true,
    },
    {
      field: "agencyCommission",
      headerName: "Agency Commission",
      width: "20%",
    },
    {
      field: "agentCode",
      headerName: "Agent Code",
      width: "20%",
    },
    {
      field: "contractLevel",
      headerName: "Agent Contract Level",
      width: "20%",
    },
    {
      field: "agentCommission",
      headerName: "Agent Commission:",
      width: "20%",
      isLink: true,
    },
    {
      field: "overwrittingAgentCode1",
      headerName: "OW Agent1 Code",
      isLink: true,
    },
    {
      field: "overwrittingAgentContractLevel1",
      headerName: "OW Agent1 Contract Level",
      isLink: true,
    },
    {
      field: "overwrittingAgentCommission1",
      headerName: "OW Agent1 Commission",
      isLink: true,
    },
    {
      field: "overwrittingAgentCode2",
      headerName: "OW Agent2 Code",
      isLink: true,
    },
    {
      field: "overwrittingAgentContractLevel2",
      headerName: "OW Agent2 Contract Level",
      isLink: true,
    },
    {
      field: "overwrittingAgentCommission2",
      headerName: "OW Agent2 Commission",
      isLink: true,
    },
    {
      field: "split1_AgentCode",
      headerName: " Split1 Agent Code",
      isLink: true,
    },
    {
      field: "split1_ContractLevel",
      headerName: " Split1 ContractLevel",
      isLink: true,
    },
    {
      field: "split1_splitRatio",
      headerName: " Split1 Split Ratio",
      isLink: true,
    },
    {
      field: "split1_agentCommission",
      headerName: " Split1 Agent Commission",
      isLink: true,
    },
    {
      field: "split_1_OWAgent1_AgentCode",
      headerName: " Split1 OWAgent1 Code",
      isLink: true,
    },
    {
      field: "split_1_OWAgent1_ContractLevel",
      headerName: "split1 OWAgent1 Contract Level",
      isLink: true,
    },
    {
      field: "split_1_OWAgent1_Commission",
      headerName: "split1 OWAgent1 Commission",
      isLink: true,
    },
    {
      field: "split_1_OWAgent2_AgentCode",
      headerName: " Split1 OWAgent2 Code",
      isLink: true,
    },
    {
      field: "split_1_OWAgent2_ContractLevel",
      headerName: "split1 OWAgent2 Contract Level",
      isLink: true,
    },
    {
      field: "split_1_OWAgent2_Commission",
      headerName: "split1 OWAgent2 Commission",
      isLink: true,
    },
    {
      field: "split2_AgentCode",
      headerName: "Split2 Agent Code",
      isLink: true,
    },
    {
      field: "split2_ContractLevel",
      headerName: " Split2 ContractLevel",
      isLink: true,
    },
    {
      field: "split2_splitRatio",
      headerName: " Split2 Split Ratio",
      isLink: true,
    },
    {
      field: "split2_agentCommission",
      headerName: " Split2 Agent Commission",
      isLink: true,
    },

    {
      field: "split_2_OWAgent1_AgentCode",
      headerName: "Split2 OWAgent1 Code",
      isLink: true,
    },
    {
      field: "split_2_OWAgent1_ContractLevel",
      headerName: "Split2 OWAgent1 Contract Level",
      isLink: true,
    },
    {
      field: "split_2_OWAgent1_Commission",
      headerName: "Split2 OWAgent1 Commission",
      isLink: true,
    },
    {
      field: "split_2_OWAgent2_AgentCode",
      headerName: "Split2 OWAgent2 Code",
      isLink: true,
    },
    {
      field: "split_2_OWAgent2_ContractLevel",
      headerName: "Split2 OWAgent2 Contract Level",
      isLink: true,
    },
    {
      field: "split_2_OWAgent2_Commission",
      headerName: "Split2 OWAgent2 Commission",
      isLink: true,
    },
    {
      field: "status",
      headerName: "Status",
      isLink: true,
    },
  ];

  const gridHeader = [
    {
      field: "paidOutDate",
      headerName: "Paid Out Date",
      width: "20%",
      isLink: true,
    },
    {
      field: "policyCarrier",
      headerName: "Policy Carrier:",
      width: "20%",
      isLink: true,
    },
    {
      field: "policyNumber",
      headerName: "Policy Number:",
      width: "20%",
      isLink: true,
    },
    {
      field: "insuredFirstName",
      headerName: "Insured First Name:",
      width: "20%",
      isLink: true,
    },
    {
      field: "insuredLastName",
      headerName: "Insured Last Name:",
      width: "20%",
      isLink: true,
    },
    {
      field: "agentCarrierNumber",
      headerName: "Agent Carrier Number",
      width: "20%",
      isLink: true,
    },
    {
      field: "premium",
      headerName: "Premium:",
      width: "20%",
      isLink: true,
    },
    {
      field: "splitPercentage",
      headerName: "Split %",
      width: "20%",
      isLink: true,
    },
    {
      field: "contractLevel",
      headerName: "Contract Level",
      width: "20%",
      isLink: true,
    },
    {
      field: "advPaymentPercentage",
      headerName: "Advance Payment%:",
      width: "20%",
      isLink: true,
    },
    {
      field: "agentCommission",
      headerName: "Agent Commission",
      width: "20%",
      isLink: true,
    },
    {
      field: "overwrittingAgentContractLevel1",
      headerName: "OW Agent1 Contract Level",
      isLink: true,
    },
    {
      field: "overwrittingAgentCommission1",
      headerName: "OW Agent1 Commission",
      isLink: true,
    },
    {
      field: "overwrittingAgentContractLevel2",
      headerName: "OW Agent2 Contract Level",
      isLink: true,
    },
    {
      field: "overwrittingAgentCommission2",
      headerName: "OW Agent2 Commission",
      isLink: true,
    },
    {
      field: "split1_ContractLevel",
      headerName: " Split1 ContractLevel",
      isLink: true,
    },
    {
      field: "split1_splitRatio",
      headerName: " Split1 Split Ratio",
      isLink: true,
    },
    {
      field: "split1_agentCommission",
      headerName: " Split1 Agent Commission",
      isLink: true,
    },
    {
      field: "split_1_OWAgent1_ContractLevel",
      headerName: "split1 OWAgent1 Contract Level",
      isLink: true,
    },
    {
      field: "split_1_OWAgent1_Commission",
      headerName: "split1 OWAgent1 Commission",
      isLink: true,
    },
    {
      field: "split_1_OWAgent2_ContractLevel",
      headerName: "split1 OWAgent2 Contract Level",
      isLink: true,
    },
    {
      field: "split_1_OWAgent2_Commission",
      headerName: "split1 OWAgent2 Commission",
      isLink: true,
    },
    {
      field: "split2_ContractLevel",
      headerName: " Split2 ContractLevel",
      isLink: true,
    },
    {
      field: "split2_splitRatio",
      headerName: " Split2 Split Ratio",
      isLink: true,
    },
    {
      field: "split2_agentCommission",
      headerName: " Split2 Agent Commission",
      isLink: true,
    },

    {
      field: "split_2_OWAgent1_ContractLevel",
      headerName: "Split2 OWAgent1 Contract Level",
      isLink: true,
    },
    {
      field: "split_2_OWAgent1_Commission",
      headerName: "Split2 OWAgent1 Commission",
      isLink: true,
    },
    {
      field: "split_2_OWAgent2_ContractLevel",
      headerName: "Split2 OWAgent2 Contract Level",
      isLink: true,
    },
    {
      field: "split_2_OWAgent2_Commission",
      headerName: "Split2 OWAgent2 Commission",
      isLink: true,
    },
    {
      field: "status",
      headerName: "Status",
      isLink: true,
    },
  ];

  const handleInputChange = (data) => {
    setSearchString(data);
  };

  const handleDateChange = (date, field) => {
    const formattedDate = dayjs(date).format("M/D/YYYY");
    setDates((prevFormData) => ({ ...prevFormData, [field]: formattedDate }));
  };

  const LoadGridData = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .post(
        isAdmin
          ? `/policies/statement/?search=${searchString}`
          : isFinanceUser
          ? `/policies/statement/?search=${searchString}`
          : `/policies/statementAgentView/${agentCode}/?search=${searchString}`,
        dates
      )
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
      setGridData(res?.data.statements);
    }
  };

  useEffect(() => {
    if (dates) {
      LoadGridData();
    }
  }, [searchString, dates]);
  return (
    <div>
      <Header />
      <div style={{ marginTop: "50px", paddingTop: "70px" }}>
        <div
          style={{
            display: "flex",
            height: "91.6vh",
            overflowY: "hidden",
          }}
        >
          <SideBar />
          <CustomizedSnackbars ref={snackbar_Ref} />
          <Stack
            className="statement-container"
            sx={{ width: "80.8%", marginLeft: "18%" }}
          >
            <Stack alignItems={"flex-end"}>
              <Stack className="statement-top-bar">
                {/* <Stack>
                  <h3 style={{ color: "#003478", lineHeight: "1px" }}>
                    {currentMonth}
                  </h3>
                  <p style={{ lineHeight: "0px" }}>
                    <b>Date:{currentDate}</b>
                  </p>
                </Stack> */}

                <div style={{ width: "100%" }}>
                  <h2
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    Statement
                  </h2>
                </div>

                <Box className="searchbox-button-container">
                  <TextField
                    classsName="textfield"
                    id="outlined-basic"
                    placeholder="Search"
                    variant="outlined"
                    sx={{ width: "245px", height: "5vh" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MagnifyingGlass size={16} weight="light" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      handleInputChange(e.target.value);
                    }}
                  />
                  <DownloadExcel
                    isAdmin={isAdmin}
                    agentCode={agentCode}
                    searchString={searchString}
                    isFinanceUser={isFinanceUser}
                    dates={dates}
                  />
                </Box>
              </Stack>
            </Stack>
            <Stack sx={{ height: "81vh" }}>
              <Stack
                sx={{
                  width: "99.9%",
                  height: isAdmin ? "23vh" : "31vh",
                  marginLeft: "10px",
                  marginTop: isAdmin ? "0" : "-27px",
                  marginBottom: "-118px",
                  backgroundColor: "#DBDBDB",
                  borderTopLeftRadius: "64px",
                  borderTopRightRadius: "64px",
                }}
              >
                <Stack
                  flexDirection={"row"}
                  justifyContent={"center"}
                  sx={{ width: "100%" }}
                >
                  <Stack flexDirection={"row"}>
                    <Stack>
                      <Typography>Start Date:</Typography>
                      <div className="DateField">
                        <Calendar
                          value={dates.startDate}
                          onDateChange={(date) =>
                            handleDateChange(date, "startDate")
                          }
                        />
                      </div>
                    </Stack>
                    <Stack>
                      <Typography>End Date:</Typography>
                      <Calendar
                        value={dates.endDate}
                        onDateChange={(date) =>
                          handleDateChange(date, "endDate")
                        }
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack sx={{ height: "70vh" }}>
                <CRMGrid
                  sx={{
                    borderTopLeftRadius: "64px",
                    borderTopRightRadius: "64px",
                  }}
                  gridName="comissionGrid"
                  gridHeader={
                    isAdmin === true
                      ? adminGridHeader
                      : isFinanceUser
                      ? adminGridHeader
                      : gridHeader
                  }
                  gridData={gridData}
                  baseURL={"/statementDetail/"}
                />
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Statements;
