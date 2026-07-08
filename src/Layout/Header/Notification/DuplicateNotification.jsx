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

  const notif = [
    "we'll create one reusable wrapper that every homepage section uses. ",
    "This keeps the storefront visually consistent and makes future sections much faster to build.",
    "we'll create one reusable wrapper that every homepage section uses.",
    "This keeps the storefront visually consistent and makes future sections much faster to build.",
    "we'll create one reusable wrapper that every homepage section uses.",
    "This keeps the storefront visually consistent and makes future sections much faster to build.",
  ];

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
            <div className="notification-content-container hide-scrollbar">
              {notifications?.length > 0 ? (
                notifications
                  .slice()
                  .reverse()
                  .map((item, index) => {
                    return (
                      <div
                        className=""
                        key={index}
                        onClick={() =>
                          handleOptionChange(
                            item.policyNumber,
                            item.id,
                            item.newAgentId,
                          )
                        }
                      >
                        <p className="notificationText">{item.message}</p>
                      </div>
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
            </div>
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
