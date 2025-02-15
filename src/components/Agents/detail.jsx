import { MagnifyingGlass, Notepad } from 'phosphor-react'
import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../Layout/Sidebar'
import Header from '../../Layout/Header'
import { Avatar, Box, Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import PersonIcon from '../../assets/PersonIcon.png'
import profilePhoto from '../../assets/profilePhotoCRM.png'
import './style.scss'
import httpClient from '../../_util/api'
import CRMGrid from '../../shared-component/CRM-Grid.jsx'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../Store/mainSlice.js'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar.jsx'

const AgentDetail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const snackbar_Ref = useRef(null)
    const { _id } = useParams()
    // const [salesData,setSalesData] = useState({})
    const [policyData,setPolicyData] = useState([])
    const [salesData, setSalesData] = useState({
        Life: { sales: 0 },
        Health: { sales: 0 },
        Annuities: { sales: 0 },
        totalPoliciesvalue: 0,
    });
    const [agentData, setAgentData] = useState({
        id:"",
        firstName: "",
        lastName: "",
        level: 0,
        email: "",
        OTP: "",
        verified: false,
        agentCode: "",
        agentTitle: "",
        agentRole: "",
        recruitingAgentCode:"",
        recruitmentDate: "",
        recruits: 0,
        commissionEarned: 0,
        img: "",
        active:true
    })

    const gridHeader = [
        {
            field: 'policySubmissionDate',
            headerName: "Policy Submission Date:",
            width: '20%',
        },
        {
            field: 'policyCarrier',
            headerName: "Policy Carrier:",
            width: '20%',
        },
        {
            field: 'policyType',
            headerName: "Policy Type:",
            width: '20%',
        },
        {
            field: 'policyNumber',
            headerName: "Policy Number:",
            width: '20%',
        },
        {
            field: 'overwrittingAgentFirstName1',
            headerName: "OW Agent1:",
            width: '20%',
        },
        {
            field: 'overwrittingAgentFirstName2',
            headerName: "OW Agent2:",
            width: '20%',
        },
        {
            field: 'agentCarrierNumber',
            headerName: "Agent Carrier Number",
            width: '20%',
        },

        {
            field: 'agentCode',
            headerName: "Agent Code:",
            width: '20%',
        },
        {
            field: 'contractLevel',
            headerName: "Contract Level:",
            width: '20%',
        },
        {
            field: 'policyValue',
            headerName: "Policy Premium:",
            width: '20%',
        },
    ]

   

    const LoadAgentData = async () => {
        dispatch(showLoader())
        const res = await httpClient.get(`/agents/getAgentByID/${_id}`).catch((error) => { 
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res?.status === 200) {
            dispatch(hideLoader())
            console.log("Detail res", res.data)
            setAgentData(res?.data.agentDetails)
            setSalesData(res?.data.sales)
            setPolicyData(res?.data.policyDetailsArray)
        }
    }


    const deleteAgentHandler = async()=>{
        const res = await httpClient.delete(`/agents/deleteAgent/${_id}`).catch((error) => {
            dispatch(hideLoader())
            console.log("error: ", error)
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
        })

        if (res?.status === 200) {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle")
            setTimeout(()=>{
                navigate('/agent')
            },3000)
           
        }
    }

    const activityHandler = async(title)=>{
        console.log("lwejfi");
      if(title === 'DeActivate Agent'){
        dispatch(showLoader())
        const res = await httpClient.post(`/agents/deactivateAgent/${_id}`).catch((error) => {
        dispatch(hideLoader())
        console.log("error: ", error)
        snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
      })

        if (res?.status === 200) {
        dispatch(hideLoader())
        snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle")
        setTimeout(()=>{
            navigate('/agent')
        },3000)
        }
     }
     else{
        dispatch(showLoader())
        const res = await httpClient.post(`/agents/activateAgent/${_id}`).catch((error) => {
            dispatch(hideLoader())
            console.log("error: ", error)
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
          })
    
            if (res?.status === 200) {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle")
            setTimeout(()=>{
                navigate('/agent')
            },3000)
            }
     }
    }

    useEffect(() => {
        LoadAgentData()
    }, [])

    return (
        <>
            <Header />
            <div style={{ marginTop: '56px' }}>
                <div style={{
                    display: 'flex',
                    height: '92vh',
                    overflowY:'hidden'
                }}>
                    <SideBar />
                    <CustomizedSnackbars ref={snackbar_Ref} />
                    <Stack sx={{ width: '81.7%',backgroundColor:'#F2F2F2' ,marginLeft:'18%' }}>
                        <Box sx={{ width: '100%', height: '19vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: '60%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Box sx={{ height: '12vh' }}>
                                     <h2 style={{ color: 'black', textAlign: 'center' }}>Agent Detail</h2>
                                </Box>

                                <Box sx={{ width: '56%', height: '12vh', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <TextField id="outlined-basic" placeholder="Agent Search" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MagnifyingGlass size={16} weight="light" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#003478",
                                            color: 'white',
                                            width: '245px',
                                            height: "5vh",
                                            fontSize: '12px',
                                            "&:hover": {
                                                backgroundColor: '#F08613',
                                            },
                                        }}
                                        onClick={() => { navigate(`/addAgent/${agentData.id}`) }}
                                    >
                                        <Grid container
                                            alignItems={'center'}
                                            sx={{ width: '100%' }}
                                        >
                                            <Grid item md="3">
                                                <img src={PersonIcon} />
                                            </Grid>
                                            <Grid item md="9">Edit Agent Details</Grid>

                                        </Grid>
                                    </Button>
                                </Box>

                            </Box>
                        </Box>

                        <Stack flexDirection={'row'} 
                        justifyContent={'center'} 
                        sx={{ width: "97%", height: '56%' }}>
                            <Stack alignItems={'center'} sx={{ width: '58%', height: '42vh', backgroundColor: 'white', borderRadius: '20px' }}>
                                <Box sx={{ width: '22%', height: '12vh' }}>
                                    {/* <img src={profilePhoto} style={{ width: '100%', height: '100%' }} /> */}
                                    {
                                        agentData.profilePic ? (
                                            <img src={agentData.profilePic} style={{ width: '100%', height: '100%' ,borderRadius:"15px" }} /> 
                                        )
                                        :
                                        <Avatar sx={{ width: '100%', height: '100%' }} />
                                    }
                                </Box>
                                <Stack>
                                    <Typography>First Name: {agentData.firstName}</Typography>
                                    <Typography>Last Name: {agentData.lastName}</Typography>
                                    <Typography>Agent Code: {agentData.agentCode}</Typography>
                                    <Typography>Agent Title:{agentData.agentTitle}</Typography>
                                    <Typography>Agent Role:{agentData.agentRole}</Typography>
                                    <Typography>Level:{agentData.level}</Typography>
                                    <Typography>Email:{agentData.email}</Typography>
                                </Stack>
                            </Stack>

                            <Stack justifyContent={'space-between'} sx={{ width: '100%', height: "45vh", marginLeft: '23px' }}>
                                <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '100%', height: '79%'}}>
                                    <Stack sx={{ width: '30%', height: '30%', backgroundColor: '#F08613' }}>
                                        <Typography className='agentDetail-text'>Recruitment Date:</Typography>
                                        <Typography className='agentDetail-text'>{agentData.recruitmentDate}</Typography>
                                    </Stack>
                                    <Stack sx={{ width: '30%', height: '30%', backgroundColor: '#F08613' }}>
                                        <Typography className='agentDetail-text'>No of Recruites:</Typography>
                                        <Typography className='agentDetail-text'>{agentData.recruits}</Typography>
                                    </Stack>
                                    <Stack sx={{ width: '30%', height: '30%', backgroundColor: '#F08613' }}>
                                        <Typography className='agentDetail-text'>Recruite Name | Code:</Typography>
                                        <Typography className='agentDetail-text'>{agentData.recruitingAgentCode }</Typography>
                                    </Stack>


                                    <Stack sx={{ width: '30%', height: '30%', backgroundColor: '#2F5597' }}>
                                        <Typography className='agentDetail-text'>Health Insurance Sales:</Typography>
                                        <Typography className='agentDetail-text'>{salesData.Health.sales }</Typography>
                                    </Stack>
                                    <Stack sx={{ width: '30%', height: '30%', backgroundColor: '#2F5597' }}>
                                        <Typography className='agentDetail-text'>Life Insurance Sales:</Typography>
                                        <Typography className='agentDetail-text'>{salesData.Life.sales }</Typography>
                                    </Stack>
                                    <Stack sx={{ width: '30%', height: '30%', backgroundColor: '#2F5597' }}>
                                        <Typography className='agentDetail-text'>Annuities Sales:</Typography>
                                        <Typography className='agentDetail-text'>{salesData.Annuities.sales }</Typography>
                                    </Stack>


                                    <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '65%', height: '30%' }}>
                                        <Stack sx={{ width: '46%', height: '100%', backgroundColor: '#6C5352' }}>
                                            <Typography className='agentDetail-text'>Total Policy Value</Typography>
                                            <Typography className='agentDetail-text'>{salesData?.totalPoliciesvalue}</Typography>
                                        </Stack>
                                        <Stack sx={{ width: '46%', height: '100%', backgroundColor: '#6C5352' }}>
                                            <Typography className='agentDetail-text'>Total Commission Earned:</Typography>
                                            <Typography className='agentDetail-text'>{agentData.commissionEarned}</Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{width:'70%'}}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#F08613',
                                            color: 'white',
                                            width: '245px',
                                            height: "5vh",
                                            fontSize: '12px',
                                            "&:hover": {
                                                backgroundColor: '#F08613',
                                            },
                                        }}
                                        onClick={()=>activityHandler(agentData.active ? "DeActivate Agent" :"Activate Agent")}
                                    >
                                       {agentData.active ? "DeActivate Agent" :"Activate Agent" }
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#003478',
                                            color: 'white',
                                            width: '245px',
                                            height: "5vh",
                                            fontSize: '12px',
                                            "&:hover": {
                                                backgroundColor: '#003478',
                                            },
                                        }}
                                        onClick={deleteAgentHandler}
                                    >
                                        Delete Agent 
                                    </Button>
                                </Stack> 
                            </Stack>
                        </Stack>

                        {/* <Stack justifyContent={'center'} alignItems={'center'} sx={{border:'2px solid red'}}>
                        <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#F08613',
                                            color: 'white',
                                            width: '245px',
                                            height: "5vh",
                                            fontSize: '12px',
                                            "&:hover": {
                                                backgroundColor: '#F08613',
                                            },
                                        }}
                                    >
                                        <Grid container
                                            alignItems={'center'}
                                            sx={{ width: '100%' }}
                                        >
                                            <Grid item md="3"><Notepad size={20} weight="light" /></Grid>
                                            <Grid item md="9">Policies Submitted</Grid>

                                        </Grid>
                                    </Button>
                        </Stack> */}
                        <div className='policiesDataGrid'>
                            <CRMGrid
                                gridHeader={gridHeader}
                                gridData={policyData}
                            />
                        </div>



                    </Stack>
                </div>
            </div>

        </>
    )
}

export default AgentDetail

