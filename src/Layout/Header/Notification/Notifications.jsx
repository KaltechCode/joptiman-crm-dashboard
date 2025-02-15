import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Box, MenuItem, Popover, Stack, Typography } from '@mui/material';
import './style.scss'
import httpClient from '../../../_util/api';
import { Bell } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const Notifications = (props) => {
  const agentCode = localStorage.getItem('agentCode')
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([
    {
      id: "",
      message: "",
      status: 0,
      policyNumber: "",
      unRead: true,
      newAgentId: ""
    }
  ]);
  const [noOfUnReadNotifications, setNoOfUnReadNotifications] = useState(0)

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  const isFinanceUser = JSON.parse(localStorage.getItem('isFinanceUser'))

  const handleClick = () => {
    getNotifications()
    setAnchorEl(true)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (policyNumber, id, newAgentId) => {
    const res = httpClient.post(`/notifications/updateNotification/${id}`).catch((error) => {
      console.log(error);
    })
    if (newAgentId) {
      navigate(`/addNewRecruit/${newAgentId}`)
    }
    else {
      navigate(`/approvePolicyByPolicyNumber/${policyNumber}`)
    }

  };

  const getNotifications = async () => {
    if (isAdmin) {
      const res = await httpClient.get('/notifications/getAllNotifications_AdminView').catch((error) => { console.log(error) })
      console.log("res", res);
      if (res?.status === 200) {
        console.log("res", res.data);
        setNotifications(res.data.notifications.map(notifications => ({
          id: notifications._id,
          message: notifications.message,
          policyNumber: notifications.policyNumber,
          status: notifications.status,
          unRead: notifications.unRead,
          newAgentId: notifications.newAgentId,
        })))
        setNoOfUnReadNotifications(res.data.noOfUnReadNotification)
      }
    }
    else if (isFinanceUser) {
      const res = await httpClient.get('/notifications/getAllNotifications_FinanceView').catch((error) => { console.log(error) })
      console.log("res", res);
      if (res?.status === 200) {
        console.log("res", res.data);
        setNotifications(res.data.notifications.map(notifications => ({
          id: notifications._id,
          message: notifications.message,
          policyNumber: notifications.policyNumber,
          status: notifications.status,
          unRead: notifications.unRead,
          newAgentId: notifications.newAgentId,
        })))
        setNoOfUnReadNotifications(res.data.noOfUnReadNotification)
      }
    }
    else {
      const res = await httpClient.get(`/notifications/getAllNotifications_AgentView/${agentCode}`).catch((error) => { console.log(error) })
      if (res?.status === 200) {
        setNotifications(res.data.notifications.map(notifications => ({
          id: notifications._id,
          message: notifications.message,
          policyNumber: notifications.policyNumber,
          status: notifications.status,
          unRead: notifications.unRead,
          newAgentId: notifications.newAgentId
        })))
        setNoOfUnReadNotifications(res.data.noOfUnReadNotification)
      }
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <Stack
    className='notification-container'
    flexDirection={'row'} sx={{
      width: '49px'
    }}>

      <div 
      className='notification-inner-container'
      style={{
         backgroundColor: anchorEl ? '#F08613' : 'white',
      }}
      >
        {
          anchorEl ? (<NotificationsIcon sx={{ color: 'white', fontSize: '31px' }} onClick={handleClick} />)
            : (<NotificationsIcon sx={{ color: '#404040', fontSize: '31px' }} onClick={handleClick} />)
        }

        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            width: '25%',
            height: '30vh'
          }}
          className='notification-popup'
        >
          {notifications.length > 0 &&
            notifications.slice().reverse().map((item, index) => {
              return (
                <Stack
                  className='menu-item'
                  alignItems={'center'}
                  justifyContent={'center'}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '2px',
                    width: '100%',
                    height: '8vh',
                    backgroundColor: item.unRead ? "#F08613" : "#DADADA",
                    borderRadius: '13px',
                    '&:hover': {
                      backgroundColor: item.unRead ? "#F08613" : "#DADADA",
                      cursor: 'pointer'
                    }
                  }}
                  key={index}
                  onClick={() => handleOptionChange(item.policyNumber, item.id, item.newAgentId)}
                >
                  <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: "85%" }}>
                    <Typography sx={{ fontSize: '14px' }}>{item.message}</Typography>
                  </Stack>
                </Stack>
              );
            })
          }
        </Popover>
      </div>
      <Stack alignItems={'center'} justifyContent={'center'} sx={{
        display: noOfUnReadNotifications > 0 ? 'flex' : 'none',
        color: 'white', backgroundColor: "#F08613", marginTop: '-3px', marginLeft: '-16px', height: '18px', width: '21px', borderRadius: '26px',
      }}>
        <Typography fontSize={'9px'}>
          {noOfUnReadNotifications}
        </Typography>
      </Stack>
    </Stack>


  )
}

export default Notifications