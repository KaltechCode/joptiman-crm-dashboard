import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Layout/Header'
import SideBar from '../../Layout/Sidebar'
import { Box, Stack } from '@mui/system'
// import { Button } from '@mui/base'
import { Grid, InputAdornment, TextField } from '@mui/material'
import AllAgentsIcon from '../../assets/AllAgentsIcon.png'
import { Button } from '@mui/material'
import { MagnifyingGlass, Minus, Plus } from 'phosphor-react'
import CRMGrid from '../../shared-component/CRM-Grid.jsx'
import "./style.scss"
import profilePhoto from '../../assets/profilePhotoCRM.png'
import { useNavigate } from 'react-router-dom'
import httpClient from '../../_util/api.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../../Store/mainSlice.js'
import PageLoader from '../../Layout/FullPageLoader/FullPageLoader.jsx'
import CustomSnackbar from '../../shared-component/Snackbar/SnackBar.jsx'
import DeletePopup from '../../shared-component/DeletePopup/index.js'


const Agents = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"))
  const showSidebar = useSelector((state) => state.mainSlice.showSideBar)
  const snackbar_Ref = useRef(null);
  const [gridData, setGridData] = useState([])
  const [searchString, setSearchString] = useState("")
  const [openDeletePopup, setOpenDeletePopup] = useState("")
  const [selectedAgentIds, setSelectedAgentIds] = useState([]);
  const gridHeader = [
    {
      field: '_id',
      isCheckbox: true,
      headerName: (
        <input
          type="checkbox"
          onChange={(e) => {
            // Handle checkbox click for all rows
            if (e.target.checked) {
              const allAgentIds = gridData.map((agent) => agent.id);
              setSelectedAgentIds(allAgentIds);
            } else {
              setSelectedAgentIds([]);
            }


          }}
        />
      ),
    },
    {
      field: 'img',
      headerName: "",
      isLink: true,
    },
    {
      field: 'firstName',
      headerName: "Name:",
      isLink: true
    },
    {
      field: 'level',
      headerName: "Level:",
      isLink: true,
    },
    {
      field: 'agentCode',
      headerName: "Agent Code:",
      isLink: true,
    },
    {
      field: 'agentTitle',
      headerName: "Agent Title:",
      isLink: true,
    },
    {
      field: 'recruitmentDate',
      headerName: "Recruitment Date:",
      isLink: true,
    },
    {
      field: 'recruits',
      headerName: "Recruits:",
      isLink: true,
    },
    {
      field: 'commissionEarned',
      headerName: "Commision Earned:",
      isLink: true,
    },
  ]

  const handleCheckboxChange = (agentId) => {
    // Handle checkbox change and update selectedAgentIds
    console.log("agentId", agentId)
    setSelectedAgentIds((prevIds) =>
      prevIds.includes(agentId)
        ? prevIds.filter((id) => id !== agentId)
        : [...prevIds, agentId]
    );
  }

  const removeAgentHandler = async () => {
    // dispatch(showLoader())
    if (selectedAgentIds.length > 0) {
      const agentIdsString = selectedAgentIds.join(',');
      setOpenDeletePopup(true)
    }
  }

  const handleDeleteAgent = async (id) => {
    setSelectedAgentIds(id)
  }

  const closeDeletePopup = async (data) => {
    setOpenDeletePopup(false)
  }

  const handleInputChange = (data) => {
    setSearchString(data)
  }


  const LoadgridData = async () => {
    dispatch(showLoader())
    const res = await httpClient.get(isAdmin ? `/agents/getApprovedAgents?search=${searchString}` : `/agents/getAllAgentsAgentView?search=${searchString}`)
      .catch((error) => {
        dispatch(hideLoader())
        snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
      })
    if (res?.status === 200) {
      dispatch(hideLoader())
      setGridData(res.data)

    }
  }

  useEffect(() => {
    console.log('showSidebar', showSidebar)
    LoadgridData()
  }, [searchString, showSidebar])

  return (
    <>
      <PageLoader />
      <Header />
      {openDeletePopup && <DeletePopup open={true} onClose={closeDeletePopup} selectedAgentIds={selectedAgentIds} message={"Do You Want To permanently delete the agent or temporarily deactivate the agent"} buttons={[{ title: 'Deactivate', color: "#F08613" }, { title: 'Delete', color: "#003478" }]} onDelete={(value) => handleDeleteAgent(value)} />}
      <div style={{ marginTop: '56px' }}>
        <div style={{
          display: 'flex',
          height: '92vh',
          overflowY: 'hidden'
        }}>
          <SideBar />
          <CustomSnackbar ref={snackbar_Ref} />
          <Stack className='agents-container'>
            <Box sx={{ width: '100%', height: '19vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Box sx={{ width: '60%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Box sx={{ height: '12vh' }}>
                  <h2 style={{ color: 'black', textAlign: 'center' }}>All Agents</h2>
                </Box>

                <Box sx={{ width: '56%', height: '12vh', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <TextField id="outlined-basic" placeholder="Search" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MagnifyingGlass size={16} weight="light" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(event) => handleInputChange(event.target.value)}
                  />

                  <Button
                    variant="contained"
                    disabled={selectedAgentIds.length < 1 ? true : false}
                    sx={{
                      backgroundColor: "#003478",
                      color: 'white',
                      width: '245px',
                      height: "5vh",
                      fontSize: '12px',
                      "&:hover": {
                        backgroundColor: '#003478',
                      },
                    }}
                    onClick={removeAgentHandler}
                  >
                    <Grid container
                      alignItems={'center'}
                      sx={{ width: '100%' }}
                    >
                      <Grid item md="9">Remove Agent</Grid>
                      <Grid item md="3"><Minus size={20} weight="light" /></Grid>
                    </Grid>
                  </Button>
                </Box>

              </Box>
            </Box>
            <div className='recruitsGrid'>
              <CRMGrid
                gridHeader={gridHeader}
                gridData={gridData}
                selectedIds={selectedAgentIds}
                handleCheckboxChange={handleCheckboxChange}
                sx={{ width: '100%' }}
                baseURL={'/agentDetail/'}
              />
            </div>

          </Stack>
        </div>
      </div>

    </>
  )
}

export default Agents