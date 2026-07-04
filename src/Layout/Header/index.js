import { AppBar, Divider, Stack, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Notifications from "./Notification/Notifications";
import Logo from "../../assets/JOptimanlogo.png";
import httpClient from "../../_util/api";
import ToggleSidebar from "./ToogleSidebar";
import DuplicateNotification from "./Notification/DuplicateNotification";

const Header = () => {
  // const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  // const [notifications, setNotifications] = useState([
  //     {
  //         id: "",
  //         message: "",
  //         status: 0,
  //         policyNumber: "",
  //         unRead: true,
  //     }
  // ]);

  // const [noOfUnReadNotifications, setNoOfUnReadNotifications] = useState(0)

  // const getNotifications = async () => {
  //     if (isAdmin) {
  //         const res = await httpClient.get('/notifications/getAllNotifications_AdminView').catch((error) => { console.log(error) })
  //         console.log("res", res);
  //         if (res?.status === 200) {
  //             console.log("res", res.data);
  //             setNotifications(res.data.notifications.map(notifications => ({
  //                 id: notifications._id,
  //                 message: notifications.message,
  //                 policyNumber: notifications.policyNumber,
  //                 status: notifications.status,
  //                 unRead: notifications.unRead,
  //             })))
  //             setNoOfUnReadNotifications(res.data.noOfUnReadNotification)
  //         }
  //     }
  //     else {
  //         const res = await httpClient.get(`/notifications/getAllNotifications_AgentView/${agentCode}`).catch((error) => { console.log(error) })
  //         if (res?.status === 200) {
  //           setNotifications(res.data.notifications.map(notifications => ({
  //             id: notifications._id,
  //             message: notifications.message,
  //             policyNumber: notifications.policyNumber,
  //             status: notifications.status,
  //             unRead:notifications.unRead
  //           })))
  //         }
  //       }
  // }

  // useEffect(() => {
  //     getNotifications()
  // }, [])

  return (
    <div>
      <AppBar
        sx={{
          backgroundColor: "#0c0544",
          // backgroundColor: "#000000",
          //  border: '2px solid red'
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        <Toolbar>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
            sx={{ width: "100%" }}
          >
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                // border:'2px solid green',
                width: "85%",
              }}
            >
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ width: "15%" }}
              >
                {/* <ToggleSidebar /> */}
                <div className="w-44 h-auto" style={{ paddingLeft: "12px" }}>
                  <img
                    src={Logo}
                    alt="Joptiman Logo"
                    style={
                      {
                        // objectFit: "contain",
                      }
                    }
                  />
                </div>
              </Stack>

              {/* <Notifications /> */}
              <DuplicateNotification />
            </Stack>

            <Profile />
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
