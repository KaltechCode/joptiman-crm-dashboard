import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import httpClient from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail, setUserImage, setUserRole } from "../redux/mainSlice";
import { hideMobileBar } from "../redux/sidebarSlice";

const ProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = async () => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }

    let apiResp = await httpClient.get("/user/login").catch((error) => { localStorage.removeItem("user-token"); });

    if (apiResp?.status == 200) {
      dispatch(setUserImage(apiResp?.data.userData.profileAddress));
      dispatch(setUserDetail(apiResp?.data.userData));
      dispatch(setUserRole(apiResp?.data.modules));
    }
    setIsLoggedIn(true);
  };

  useEffect(() => { dispatch(hideMobileBar()); });
  
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;
