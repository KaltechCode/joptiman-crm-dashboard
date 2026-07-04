import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { Box, MenuItem, Popover, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import httpClient from "../../../_util/api";

function DuplicateNotification() {
  const agentCode = localStorage.getItem("agentCode");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: "",
      message: "",
      status: 0,
      policyNumber: "",
      unRead: true,
      newAgentId: "",
    },
  ]);
  const [noOfUnReadNotifications, setNoOfUnReadNotifications] = useState(0);

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isFinanceUser = JSON.parse(localStorage.getItem("isFinanceUser"));

  const handleOpen = () => {
    getNotifications();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (policyNumber, id, newAgentId) => {
    const res = httpClient
      .post(`/notifications/updateNotification/${id}`)
      .catch((error) => {
        console.log(error);
      });
    if (newAgentId) {
      navigate(`/addNewRecruit/${newAgentId}`);
    } else {
      navigate(`/approvePolicyByPolicyNumber/${policyNumber}`);
    }
  };

  const getNotifications = async () => {
    if (isAdmin) {
      const res = await httpClient
        .get("/notifications/getAllNotifications_AdminView")
        .catch((error) => {
          console.log(error);
        });
      console.log("res", res);
      if (res?.status === 200) {
        console.log("res", res.data);
        setNotifications(
          res.data.notifications.map((notifications) => ({
            id: notifications._id,
            message: notifications.message,
            policyNumber: notifications.policyNumber,
            status: notifications.status,
            unRead: notifications.unRead,
            newAgentId: notifications.newAgentId,
          })),
        );
        setNoOfUnReadNotifications(res.data.noOfUnReadNotification);
      }
    } else if (isFinanceUser) {
      const res = await httpClient
        .get("/notifications/getAllNotifications_FinanceView")
        .catch((error) => {
          console.log(error);
        });
      console.log("res", res);
      if (res?.status === 200) {
        console.log("res", res.data);
        setNotifications(
          res.data.notifications.map((notifications) => ({
            id: notifications._id,
            message: notifications.message,
            policyNumber: notifications.policyNumber,
            status: notifications.status,
            unRead: notifications.unRead,
            newAgentId: notifications.newAgentId,
          })),
        );
        setNoOfUnReadNotifications(res.data.noOfUnReadNotification);
      }
    } else {
      const res = await httpClient
        .get(`/notifications/getAllNotifications_AgentView/${agentCode}`)
        .catch((error) => {
          console.log(error);
        });
      if (res?.status === 200) {
        setNotifications(
          res.data.notifications.map((notifications) => ({
            id: notifications._id,
            message: notifications.message,
            policyNumber: notifications.policyNumber,
            status: notifications.status,
            unRead: notifications.unRead,
            newAgentId: notifications.newAgentId,
          })),
        );
        setNoOfUnReadNotifications(res.data.noOfUnReadNotification);
      }
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <>
      <div className="">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{
            background: "#fff",
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginRight: "10px",
            position: "relative",
            top: 0,
            left: 0,
          }}
          onClick={handleOpen}
        >
          <NotificationsIcon sx={{ color: "black", fontSize: "25px" }} />
          <p
            style={{
              height: "20px",
              width: "20px",
              background: "#F08613",
              position: "absolute",
              top: "-5px",
              right: "-5px",
              borderRadius: "50%",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "10px",
            }}
          >
            {noOfUnReadNotifications}
          </p>
        </div>
      </div>

      {open && (
        <div className="notification-popUp">
          <div className="notification-container">
            {notifications?.length > 0 ? (
              notifications
                .slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <Stack
                      className="menu-item"
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "2px",
                        width: "100%",
                        height: "8vh",
                        backgroundColor: item.unRead ? "#F08613" : "#DADADA",
                        borderRadius: "13px",
                        "&:hover": {
                          backgroundColor: item.unRead ? "#F08613" : "#DADADA",
                          cursor: "pointer",
                        },
                      }}
                      key={index}
                      onClick={() =>
                        handleOptionChange(
                          item.policyNumber,
                          item.id,
                          item.newAgentId,
                        )
                      }
                    >
                      <Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{ width: "85%" }}
                      >
                        <Typography sx={{ fontSize: "14px" }}>
                          {item.message}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })
            ) : (
              <p
                style={{
                  color: "#111",
                  fontSize: "24px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                No Notifications Available
              </p>
            )}
            <div className="notification-close" onClick={handleClose}>
              <CloseIcon sx={{ color: "black", fontSize: "25px" }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DuplicateNotification;
