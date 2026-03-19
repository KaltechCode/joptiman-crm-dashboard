import React, { useEffect, useRef, useState } from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./style.scss";
import CRMDropdown from "../../shared-component/CRM-Dropdown/index";
import CRMButtons from "../../shared-component/CRMButtons";
import BarChart from "./BarChart";
import { Box, height } from "@mui/system";
import httpClient from "../../_util/api";
import CustomizedSnackbars from "../../shared-component/Snackbar/SnackBar";
import { hideLoader, showLoader } from "../../Store/mainSlice";
import { useDispatch } from "react-redux";
import { Diversity1 } from "@mui/icons-material";

const Dashboard = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isFinanceUser = JSON.parse(localStorage.getItem("isFinanceUser"));
  const snackbar_Ref = useRef(null);
  const dispatch = useDispatch();
  const monthNames = [
    {
      name: "Jan",
      index: 1,
    },
    {
      name: "February",
      index: 2,
    },
    {
      name: "March",
      index: 3,
    },
    {
      name: "April",
      index: 4,
    },
    {
      name: "May",
      index: 5,
    },
    {
      name: "June",
      index: 6,
    },
    {
      name: "July",
      index: 7,
    },
    {
      name: "August",
      index: 8,
    },
    {
      name: "September",
      index: 9,
    },
    {
      name: "October",
      index: 10,
    },
    {
      name: "November",
      index: 11,
    },
    {
      name: "December",
      index: 12,
    },
  ];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const CurrentMonth = currentDate.getMonth() + 1;
  const currentMonthName = monthNames.find(
    (m) => m.index === CurrentMonth,
  ).name;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonthName);
  const [month1, setMonth1] = useState(currentMonthName);
  const [currentMonth, setCurrentMonth] = useState("");
  const [totalSoldPolicies, setTotalSoldPolicies] = useState(0);
  const [totalHealthInsurance, setTotalHealthInsurance] = useState(0);
  const [totalLifeInsurance, setTotalLifeInsurance] = useState(0);
  const [totalAnnuities, setTotalAnnuities] = useState(0);
  const [barChartData, setBarChartData] = useState();
  const [totalSalesCost, setTotalSalesCost] = useState(0);
  const [totalHealthInsuranceCost, setTotalHealthInsuranceCost] = useState(0);
  const [totaLifeInsuranceCost, setTotalLifeInsuranceCost] = useState(0);
  const [totalAnnuitiesCost, setTotalAnnuitiesCost] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalHealthRevenue, setTotalHealthRevenue] = useState(0);
  const [totalLifeRevenue, setTotalLifeRevenue] = useState(0);
  const [totalAnnuitiesRevenue, setTotalAnnuitiesRevenue] = useState(0);
  const [currentMonthTotalPolicies, setCurrentMonthTotalPolicies] = useState(0);
  const [currentMonthTotalSalesCost, setCurrentMonthTotalSalesCost] =
    useState(0);
  const [currentMonthTotalRevenue, setCurrentMonthTotalRevenue] = useState(0);
  const [
    yearlyTotalSoldHealthInsurancePolicies,
    setYearlyTotalSoldHealthInsurancePolicies,
  ] = useState(0);
  const [
    yearlyTotalSoldLifeInsurancePolicies,
    setYearlyTotalSoldLifeInsurancePolicies,
  ] = useState(0);
  const [
    yearlyTotalSoldAnnuitiesPolicies,
    setYearlyTotalSoldAnnuitiesPolicies,
  ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Productivity Matrix");
  const [yearlyPolicySelectedOption, setYearlyPolicySelectedOption] = useState(
    "Productivity Matrix",
  );
  const [totalNoOfRecruits, setTotalNoOfRecruits] = useState();
  const [previousYears, setPreviousYears] = useState([]);
  const [previousMonths, setPreviousMonths] = useState(["", "", ""]);
  const isSmallScreen = useMediaQuery("(max-width:1138px)");
  const [highestCommissionedAgentData, setHighestCommissionedAgentData] =
    useState({
      agentFirstName: "",
      agentLastName: "",
      agentCode: "",
      agentRole: "",
      totalSales: "",
    });
  const [highestRecruitsAgentData, setHighestRecruitsAgentData] = useState({});
  const DropdownOptions1 = [
    "Productivity Matrix",
    "Policy Matrix",
    "CashFlow Matrix",
  ];

  const DropdownOptions2 = [
    "Productivity Matrix",
    "Policy Matrix",
    "CashFlow Matrix",
  ];

  const handleDropdownChange = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    setSelectedOption(selectedOption);
  };
  const handleYearlyPolicyDropdownChange = (selectedOption) => {
    setYearlyPolicySelectedOption(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption);
  };
  const handleMonthChange1 = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    setMonth1(selectedOption);
  };

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption);
  };

  const getPreviousYears = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get("/dashboard/getPreviousYears")
      .catch((error) => {
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle",
        );
      });

    if (res?.status === 200) {
      // console.log("getPreviousYears",res)
      dispatch(hideLoader());
      setPreviousYears(res?.data);
    }
  };
  const getPreviousMonths = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get("/dashboard/getPreviousMonths")
      .catch((error) => {
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle",
        );
      });

    if (res?.status === 200) {
      dispatch(hideLoader());
      setPreviousMonths(res?.data);
    }
  };

  const LoadMonthlyPolicyData = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(
        isAdmin
          ? `/dashboard/getMonthlyPolicyData/${month}`
          : isFinanceUser
            ? `/dashboard/getMonthlyPolicyData/${month}`
            : `/dashboard/getMonthlyPolicyDataAgentView/${month}`,
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

    if (res?.status === 200) {
      dispatch(hideLoader());
      console.log("dash res", res);
      console.log("dash res", res?.data.Life.count);
      if (res?.data) {
        setTotalHealthInsurance(res?.data.Health.count);
        setTotalLifeInsurance(res?.data.Life.count);
        setTotalAnnuities(res?.data.Annuities.count);

        // Sales Matrix
        setTotalHealthInsuranceCost(res?.data.Health.totalSale);
        setTotalLifeInsuranceCost(res?.data.Life.totalSale);
        setTotalAnnuitiesCost(res?.data.Annuities.totalSale);

        // CashFlow Matrix
        setTotalHealthRevenue(res?.data.Health.totalRevenue);
        setTotalLifeRevenue(res?.data.Life.totalRevenue);
        setTotalAnnuitiesRevenue(res?.data.Annuities.totalRevenue);
      }
    }
  };

  const yearlyPolicyData = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(
        isAdmin
          ? `/dashboard/getMatrixData/${year}`
          : isFinanceUser
            ? `/dashboard/getMatrixData/${year}`
            : `/dashboard/getMatrixDataAgentView/${year}`,
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

    if (res?.status === 200) {
      dispatch(hideLoader());
      setBarChartData(res?.data.barChartData);
      console.log("res?.data.totalSoldPolicies", res?.data.totalSoldPolicies);
      setTotalSoldPolicies(res?.data.overallTotalSoldPolicies);
      setTotalSalesCost(res?.data.overallTotalSalesCost);
      setTotalRevenue(res?.data.overallTotalRevenue);
      setCurrentMonth(res?.data.currentMonth);
      setCurrentMonthTotalPolicies(res?.data.currentMonthPolicies);
      setCurrentMonthTotalSalesCost(res?.data.currentMonthSalesCost);
      setCurrentMonthTotalRevenue(res?.data.currentMonthRevenue);
      setYearlyTotalSoldHealthInsurancePolicies(res?.data.totalHealthInsurance);
      setYearlyTotalSoldLifeInsurancePolicies(res?.data.totalLifeInsurance);
      setYearlyTotalSoldAnnuitiesPolicies(res?.data.totalAnnuities);
    }
  };

  const getDetailsOfHighestCommissionedAgent = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(`/dashboard/getDetailsOfHighestCommissionedAgent/${month1}`)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle",
        );
      });
    if (res?.status === 200) {
      dispatch(hideLoader());
      console.log("highestcommision agent", res);
      setHighestCommissionedAgentData(res?.data);
    }
  };

  const getDetailsOfHighestRecruitsAgent = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(`/dashboard/highestRecruitsAgent/${month1}`)
      .catch((error) => {
        dispatch(hideLoader());
        snackbar_Ref.current.showMessage(
          "error",
          error?.response.data.message,
          "",
          "i-chk-circle",
        );
      });
    if (res?.status === 200) {
      dispatch(hideLoader());
      console.log("highestRecruitsAgent", res);
      setHighestRecruitsAgentData(res.data.highestRecruitAgentDetail);
    }
  };

  const getTotalNoOfRecruits = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(`/dashboard/TotalNoOfRecruits/${month1}`)
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
      console.log(res);
      setTotalNoOfRecruits(res.data.noOfRecruits);
    }
  };

  useEffect(() => {
    console.log("totalLifeInsurance", totalLifeInsurance);
  }, [totalLifeInsurance]);

  useEffect(() => {
    console.log("isFinanceUser", isFinanceUser);
    getPreviousYears();
    getPreviousMonths();
  }, []);

  useEffect(() => {
    yearlyPolicyData();
  }, [year]);

  useEffect(() => {
    LoadMonthlyPolicyData();
  }, [month]);

  useEffect(() => {
    getDetailsOfHighestCommissionedAgent();
    getDetailsOfHighestRecruitsAgent();
    getTotalNoOfRecruits();
  }, [month1]);

  return (
    <div>
      <Header />

      <div style={{}} className="content-container">
        <div style={{ width: "18%", backgroundColor: "blue" }}>
          <SideBar />
        </div>

        {/*  */}
        {/* <CustomizedSnackbars ref={snackbar_Ref} /> */}
        {/* 1st Container */}
        <div
          className=""
          style={{
            width: "82%",
            paddingTop: "30px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="main-container">
            <div
              className=""
              style={{ paddingTop: "15px", paddingBottom: "15px" }}
            >
              <h2
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Sales Statistics
              </h2>
            </div>

            <div className="first-grid">
              <div className="first-grid-container">
                <CRMDropdown
                  title={selectedOption}
                  options={DropdownOptions1}
                  onOptionChange={handleDropdownChange}
                />
                <div
                  // sx={{ justifyContent: "center" }}
                  className="grid-inner-container"
                >
                  <div className="list-items-container">
                    <div className="list-items">
                      <div className="list-items">
                        <p className="list-items-text">Health Insurance</p>
                      </div>
                      <div className="list-items">
                        {selectedOption === "Policy Matrix" ? (
                          <div className="list-item-container">
                            <p className="title">Total Policies: </p>
                            <p>{totalHealthInsurance}</p>
                          </div>
                        ) : selectedOption === "CashFlow Matrix" ? (
                          <div className="list-item-container">
                            <p>Total Revenue: </p>
                            <p>{totalHealthRevenue}</p>
                          </div>
                        ) : (
                          <div className="list-item-container">
                            <b>Total Productivity: </b>
                            <p> ${totalHealthInsuranceCost} </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-inner-other">
                <div className="grid-inner-container">
                  <div className="list-items-container">
                    <div className="box-container">
                      <div className="list-items">
                        <p className="title">Life Insurance</p>
                      </div>
                      <div className="list-items">
                        {selectedOption === "Policy Matrix" ? (
                          <div className="list-item-container">
                            <p className="">Total Policies:</p>
                            <p> {totalLifeInsurance}</p>
                          </div>
                        ) : selectedOption === "CashFlow Matrix" ? (
                          <div className="list-item-container">
                            <b>Total Revenue: </b>
                            <p>{totalLifeRevenue}</p>
                          </div>
                        ) : (
                          <div className="list-item-container">
                            <b className="">Total Productivity:</b>
                            <p sx={{ overflow: "hidden" }}>
                              ${totaLifeInsuranceCost}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="first-grid-container">
                <CRMDropdown
                  title="Previous Months"
                  dropdownNo="2"
                  options={previousMonths}
                  onOptionChange={handleMonthChange}
                />
                {/* <CRMButtons title='Previus Months'/> */}

                <div className="grid-inner-container">
                  <div className="list-items-container">
                    <div className="list-items">
                      <div className="list-items">
                        <p className="list-items-text">Annuities</p>
                      </div>
                      <div className="list-items">
                        {selectedOption === "Policy Matrix" ? (
                          <div className="list-item-container">
                            <p className="title">Total Policies: </p>
                            <p>{totalHealthInsurance}</p>
                          </div>
                        ) : selectedOption === "CashFlow Matrix" ? (
                          <div className="list-item-container">
                            <p>Total Revenue: </p>
                            <p>{totalHealthRevenue}</p>
                          </div>
                        ) : (
                          <div className="list-item-container">
                            <b>Total Productivity: </b>
                            <p> ${totalHealthInsuranceCost} </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd Container */}
            <Grid
              container
              className="second-grid"
              sx={{
                width: "95%",
                "@media (max-width:1366px) and (min-width: 1200px)": {
                  width: "98%",
                },
              }}
            >
              <Grid container className="dropdown-container">
                <Grid item md="3.5">
                  <CRMDropdown
                    type="YearlyPolicyType"
                    title={yearlyPolicySelectedOption}
                    options={DropdownOptions2}
                    onOptionChange={handleYearlyPolicyDropdownChange}
                  />
                </Grid>
                <Grid item md="3.5" sx={{ marginTop: "-14px" }}>
                  <h2 style={{ color: "black", textAlign: "center" }}>
                    Sales Statistics 2024
                  </h2>
                </Grid>
                <Grid item md="3.5">
                  <CRMDropdown
                    title="Previous Years"
                    options={previousYears}
                    onOptionChange={handleYearChange}
                  />{" "}
                </Grid>
              </Grid>
              <Grid container className="barChart-container">
                <Grid
                  item
                  md={isSmallScreen ? "4" : "6"}
                  className="yearly-data-container"
                >
                  {/* Total Productivity */}
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        border: "3px solid #F08613",
                        marginTop: "0px",
                        display: "inline",
                        height: "20px",
                      }}
                    ></div>
                    <Box
                      sx={{
                        borderLeft: "4px solid #003478",
                        borderBottom: "4px solid #003478",
                        display: "inline",
                        width: "185px",
                        paddingLeft: "38px",
                      }}
                    >
                      {yearlyPolicySelectedOption === "Policy Matrix" ? (
                        <b>Total Policies:</b>
                      ) : yearlyPolicySelectedOption === "CashFlow Matrix" ? (
                        <b>Total Revenue: </b>
                      ) : yearlyPolicySelectedOption === "Health Insurance" ? (
                        <b>Total Health Insurance</b>
                      ) : yearlyPolicySelectedOption === "Life Insurance" ? (
                        <b>Total Life Insurance</b>
                      ) : yearlyPolicySelectedOption === "Annuities" ? (
                        <b>Annuities</b>
                      ) : (
                        <b>Total Productivity:</b>
                      )}
                    </Box>
                  </div>
                  <p style={{ paddingLeft: "38px", marginTop: "0px" }}>
                    {yearlyPolicySelectedOption === "Policy Matrix" ? (
                      <>{totalSoldPolicies}</>
                    ) : yearlyPolicySelectedOption === "CashFlow Matrix" ? (
                      <>${totalRevenue}</>
                    ) : yearlyPolicySelectedOption === "Health Insurance" ? (
                      <>${yearlyTotalSoldHealthInsurancePolicies}</>
                    ) : yearlyPolicySelectedOption === "Life Insurance" ? (
                      <>${yearlyTotalSoldLifeInsurancePolicies}</>
                    ) : yearlyPolicySelectedOption === "Annuities" ? (
                      <>${yearlyTotalSoldAnnuitiesPolicies}</>
                    ) : (
                      <>${totalSalesCost}</>
                    )}
                  </p>

                  <br />
                  {/* Monthly Sales Sales: */}
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        border: "3px solid #003478",
                        marginTop: "0px",
                        display: "inline",
                        height: "20px",
                      }}
                    ></div>
                    <Box
                      sx={{
                        borderLeft: "4px solid #F08613",
                        borderBottom: "4px solid #F08613",
                        display: "inline",
                        width: "185px",
                        paddingLeft: "38px",
                      }}
                    >
                      <b>
                        {currentMonth}{" "}
                        {yearlyPolicySelectedOption === "Policy Matrix"
                          ? "Policies:"
                          : yearlyPolicySelectedOption === "Cash Flow Matrix"
                            ? "Cash Flow:"
                            : yearlyPolicySelectedOption === "Health Insurance"
                              ? "Health Policies:"
                              : yearlyPolicySelectedOption === "Life Insurance"
                                ? "Life Policies:"
                                : yearlyPolicySelectedOption === "Annuities"
                                  ? "Annuities:"
                                  : "Sales:"}
                      </b>
                    </Box>
                  </div>

                  <p style={{ paddingLeft: "38px", marginTop: "0px" }}>
                    {yearlyPolicySelectedOption === "Policy Matrix" ? (
                      <>{currentMonthTotalPolicies}</>
                    ) : yearlyPolicySelectedOption === "CashFlow Matrix" ? (
                      <>${currentMonthTotalRevenue}</>
                    ) : yearlyPolicySelectedOption === "Health Insurance" ? (
                      <>${yearlyTotalSoldHealthInsurancePolicies}</>
                    ) : yearlyPolicySelectedOption === "Life Insurance" ? (
                      <>${yearlyTotalSoldLifeInsurancePolicies}</>
                    ) : yearlyPolicySelectedOption === "Annuities" ? (
                      <>${yearlyTotalSoldAnnuitiesPolicies}</>
                    ) : (
                      <>${currentMonthTotalSalesCost}</>
                    )}
                  </p>
                </Grid>

                {barChartData ? (
                  <Grid
                    item
                    md={isSmallScreen ? "12" : "6"}
                    sx={{ height: "40vh" }}
                  >
                    <BarChart
                      barChartData={barChartData}
                      selectedOption={yearlyPolicySelectedOption}
                    />
                  </Grid>
                ) : (
                  <div>Loading bar chart data...</div>
                )}
              </Grid>
            </Grid>

            {/* 3rd container */}

            <div className="third-grid">
              {/* Highest Sales */}

              <div className="third-grid-similar-box">
                <div className="grid-inner-container">
                  <div>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#003478",
                      }}
                    >
                      Highest Sales
                    </Typography>
                  </div>

                  <div className="agent-container">
                    {/* <Grid items md={isSmallScreen ? '6.5' : '3.7'}> */}
                    <div item>
                      {highestCommissionedAgentData.profilePic ? (
                        <div className="profilePic-dashboard-container">
                          <img
                            src={highestCommissionedAgentData.profilePic}
                            className="profilePic-dashboard"
                          />
                        </div>
                      ) : (
                        <div className="profilePic-dashboard-container">
                          <Avatar sx={{ width: "100%", height: "100%" }} />
                        </div>
                      )}
                    </div>

                    <div>
                      {/* <Stack> */}
                      <div className="box-row">
                        <Typography className="agent-text">
                          Agent Name:
                        </Typography>
                        <Typography className="agent-text-value">
                          {highestCommissionedAgentData.firstName}{" "}
                          {highestCommissionedAgentData.lastName}
                        </Typography>
                      </div>
                      <div className="box-row">
                        <Typography className="agent-text">
                          Agent Title:{" "}
                        </Typography>
                        <Typography className="agent-text-value">
                          {highestCommissionedAgentData.agentTitle}{" "}
                        </Typography>
                      </div>
                    </div>
                    {/* </Stack> */}
                  </div>
                </div>
              </div>

              {/* Highest Recruits */}
              <div className="third-grid-similar-box">
                <div className="grid-inner-container">
                  <div>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#003478",
                      }}
                    >
                      Highest Recruits
                    </Typography>
                  </div>

                  <div className="agent-container">
                    {/* <Grid items md={isSmallScreen ? '6.5' : '3.7'}> */}
                    <div item>
                      {highestRecruitsAgentData.profilePic ? (
                        <div className="profilePic-dashboard-container">
                          <img
                            src={highestRecruitsAgentData.profilePic}
                            className="profilePic-dashboard"
                          />
                        </div>
                      ) : (
                        <div className="profilePic-dashboard-container">
                          <Avatar style={{ width: "100%", height: "100%" }} />
                        </div>
                      )}
                    </div>

                    <div>
                      {/* <Stack> */}
                      <div className="box-row">
                        <Typography className="agent-text">
                          Agent Name:
                        </Typography>
                        <Typography className="agent-text-value">
                          {highestRecruitsAgentData.firstName}{" "}
                          {highestRecruitsAgentData.lastName}
                        </Typography>
                      </div>
                      <div className="box-row">
                        <Typography className="agent-text">
                          Agent Title:{" "}
                        </Typography>
                        <Typography className="agent-text-value">
                          {highestRecruitsAgentData.agentTitle}{" "}
                        </Typography>
                      </div>
                    </div>
                    {/* </Stack> */}
                  </div>
                </div>
              </div>

              <div className="third-grid-other-box">
                <CRMDropdown
                  title="Previous Months"
                  dropdownNo="5"
                  options={previousMonths}
                  onOptionChange={handleMonthChange1}
                />
                <div container className="grid-inner-container">
                  <div className="third-grid-other">
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#003478",
                      }}
                    >
                      Number Of Recruits
                    </Typography>
                  </div>
                  <div className="third-grid-other-2">
                    <div>
                      <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                        {totalNoOfRecruits}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
