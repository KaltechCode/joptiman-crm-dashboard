import React, { useEffect, useRef, useState } from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { Box, Stack } from "@mui/system";
// import { Button } from '@mui/base'
import { Grid, InputAdornment, TextField } from "@mui/material";
import AllAgentsIcon from "../../assets/AllAgentsIcon.png";
import { Button } from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import CRMGrid from "../../shared-component/CRM-Grid.jsx";
import "./style.scss";
import profilePhoto from "../../assets/profilePhotoCRM.png";
import { useNavigate } from "react-router-dom";
import httpClient from "../../_util/api.jsx";
import CustomSnackBars from "../../shared-component/Snackbar/SnackBar.jsx";
import { hideLoader, showLoader } from "../../Store/mainSlice.js";
import { useDispatch } from "react-redux";

const Recruits = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const navigate = useNavigate();
  const snackbar_Ref = useRef();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [gridData, setGridData] = useState([]);
  const gridHeader = [
    {
      field: "img",
      headerName: "",
      isLink: true,
    },
    {
      field: "firstName",
      headerName: "Name:",
      isLink: true,
    },
    {
      field: "level",
      headerName: "Level:",
      isLink: true,
    },
    {
      field: "agentCode",
      headerName: "Agent Code:",
      isLink: true,
    },
    {
      field: "agentTitle",
      headerName: "Agent Title:",
    },
    {
      field: "recruitmentDate",
      headerName: "Recruitment Date:",
      isLink: true,
    },
    {
      field: "recruits",
      headerName: "Recruits:",
      isLink: true,
    },
    {
      field: "commissionEarned",
      headerName: "Commision Earned:",
      isLink: true,
    },
  ];

  const LoadgridData = async () => {
    dispatch(showLoader());
    const res = await httpClient
      .get(
        isAdmin
          ? `/agents/getAllAgents?search=${searchString}`
          : "/agents/getAllAgentsAgentView"
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
      setGridData(res?.data);
    } else {
      console.log("error: ");
    }
  };

  useEffect(() => {
    LoadgridData();
  }, [searchString]);

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
          <CustomSnackBars ref={snackbar_Ref} />
          <Stack sx={{ width: "81.7%", marginLeft: "20%" }}>
            <Box
              sx={{
                width: "100%",
                height: "19vh",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Box sx={{ height: "12vh" }}>
                  <h2
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    All Recruits
                  </h2>
                </Box>
                <Box
                  sx={{
                    width: "56%",
                    height: "12vh",
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    placeholder="Search"
                    variant="outlined"
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                    sx={{ width: "245px", height: "5vh" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MagnifyingGlass size={16} weight="light" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#003478",
                      color: "white",
                      width: "245px",
                      height: "5vh",
                      fontSize: "12px",
                      "&:hover": {
                        backgroundColor: "#F08613",
                      },
                    }}
                    onClick={() => {
                      navigate("/addNewRecruit");
                    }}
                  >
                    <Grid
                      container
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Grid item md="9">
                        Add new
                      </Grid>
                      <Grid item md="3">
                        <Plus size={20} weight="light" />
                      </Grid>
                    </Grid>
                  </Button>
                </Box>
              </Box>
            </Box>
            <div className="recruitsGrid">
              <CRMGrid
                sx={{ width: "100%" }}
                gridHeader={gridHeader}
                gridData={gridData}
                baseURL={"/addNewRecruit/"}
              />
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Recruits;
