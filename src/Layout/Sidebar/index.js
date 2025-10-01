import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import "./style.scss";
import DasboardIcon from "../../assets/DashboardIcon.png";
import AdminstrationIcon from "../../assets/admistrationIcon.png";
import CarriersIcons from "../../assets/CarriersIcon.png";
import ToolsIcon from "../../assets/Tools.png";
import PoliciesIcon from "../../assets/PoliciesIcon.png";
import StatementsIcon from "../../assets/StatementsIcon.png";
import CommssionsIcon from "../../assets/CommisionsIcon.png";
import RecruitsIcon from "../../assets/Recruits.png";
import LogoutIcon from "../../assets/Logout.png";
import rightArrow from "../../assets/right-arrow.png";
import agentIcon from "../../assets/Agent.png";
import goHighLevel from "../../assets/GHL.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../../Store/mainSlice";
const SideBar = () => {
  // const isAdmin = useSelector((state)=>state.user.isAdmin)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isFinanceUser = JSON.parse(localStorage.getItem("isFinanceUser"));
  const location = useLocation();

  const sideBarMenu = [
    {
      icon: DasboardIcon,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: AdminstrationIcon,
      name: "Administrations",
      path: "/administration",
    },
    {
      icon: CarriersIcons,
      name: "Carriers",
      path: "/carriers",
    },
    {
      icon: ToolsIcon,
      name: "Tools",
      path: "/tools",
    },
    {
      icon: PoliciesIcon,
      name: "Policies",
      path: "/policies",
    },
    {
      icon: StatementsIcon,
      name: "Statements",
      path: "/statements",
    },
    {
      icon: CommssionsIcon,
      name: "Commissions",
      path: "/commissions",
    },
    {
      icon: RecruitsIcon,
      name: "Recruits",
      path: "/recruits",
    },
    {
      icon: goHighLevel,
      name: "GHL Portal",
      path: "https://app.joptiman.com/",
    },
    {
      icon: agentIcon,
      name: "Agents",
      path: "/agent",
    },
    {
      icon: agentIcon,
      name: "Tutorials",
      path: "/tutorials",
    },
    {
      icon: LogoutIcon,
      name: "Logout",
      path: "https://www.joptimanconsultancy.com/",
    },
  ];

  const logoutHandler = () => {
    dispatch(showLoader());
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    setTimeout(() => {
      dispatch(hideLoader());
      navigate("/");
      dispatch(hideLoader());
    }, 3000);
  };

  return (
    <div className="side-bar-container">
      <Stack
        // justifyContent={'center'}
        sx={{
          width: "80%",
          height: "81%",
          marginTop: "41px",
        }}
      >
        <List>
          {sideBarMenu.map((menu) => {
            const isExternal =
              typeof menu.path === "string" && menu.path.startsWith("http");
            const isActive = !isExternal && location.pathname === menu.path;
            return (
              <ListItem
                className="listItem"
                disablePadding
                style={{
                  display: isAdmin
                    ? "block"
                    : isFinanceUser
                    ? "block"
                    : "block",

                  // The following code was commented to make the sidebar visible to both isAdmin and isFinancialUser role

                  // ? menu.name === "Agents"
                  //   ? "none"
                  //   : menu.name === "Recruits"
                  //   ? "none"
                  //   : "block"
                  // : menu.name === "Agents"
                  // ? "none"
                  // : menu.name === "Commissions"
                  // ? "none"
                  // : "block",
                }}
              >
                <ListItemButton
                  href={menu.path}
                  sx={{
                    backgroundColor: isActive ? "#1D9EB0" : "white", // green when active
                    height: "5vh",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: isActive ? "#1D9EB0" : "#F08613",
                    },
                  }}
                  onClick={menu.name === "Logout" ? logoutHandler : undefined}
                >
                  <ListItemIcon
                    className="list-item-icon1"
                    sx={{
                      color: isActive ? "white" : "#040b1e",
                      minWidth: "30px !important",
                    }}
                  >
                    <img src={menu.icon} />
                  </ListItemIcon>
                  <ListItemText
                    className="list-item-text"
                    sx={{ color: isActive ? "white" : "#040b1e" }}
                  >
                    {menu.name}
                  </ListItemText>
                  <ListItemIcon
                    className="list-item-icon"
                    sx={{ color: isActive ? "white" : "#040b1e" }}
                  >
                    <img src={rightArrow} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </div>
  );
};

export default SideBar;
