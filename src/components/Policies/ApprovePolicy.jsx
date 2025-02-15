import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, InputAdornment, TextField, Stack, Typography, Switch, LinearProgress } from '@mui/material'
import { Asterisk, AsteriskSimple, MagnifyingGlass, Notepad, Plus } from 'phosphor-react'
import Header from '../../Layout/Header'
import SideBar from '../../Layout/Sidebar'
import httpClient from '../../_util/api'
import './style.scss'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Calendar from '../../shared-component/Calender/Calender'
import LinearProgressWithLabel from '../../shared-component/ProgressBar'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../Store/mainSlice'
import dayjs from 'dayjs';
import PoliciesDropdown from '../../shared-component/PoliciesDropdown'
// import LinearProgressWithLabel from '../../shared-component/ProgressBar '

const ApprovePolicy = () => {
    const navigate = useNavigate()
    const snackbar_Ref = useRef()
    const dispatch = useDispatch()
    const [commissionSplit, setCommisionSplit] = useState("Yes")
    // const [isChecked, setIsChecked] = useState(false)
    const isAdmin = localStorage.getItem("isAdmin")
    const { id } = useParams()
    const {policyNumber} = useParams()

    const [policyData, setPolicyData] = useState({
        isSplit: false,
        id: "",
        date: "",
        isApproved: false,
        policyRegistrationId: "",
        policyValue: 0,
        agentCommission: 0,
        agencyCommissionPercentage: 0,
        paidAgencyCommission: 0,
        policySubmissionDate: "",
        policyApprovalDate: "",
        policyCarrier: "",
        policyType: "",
        policyNumber: "",
        advPaymentPercentage: 0,
        remainingPaymentPercentage: 0,

        insuredFirstName: "",
        insuredLastName: "",
        policyStartDate: "",
        policyEndDate: "",

        agentFirstName: "",
        agentLastName: "",
        agentCode: "",
        contractLevel: 0,
        agentCarrierNumber: "",

        split1_AgentFirstName: "",
        split1_AgentLastName: "",
        split1_AgentCode: "",
        split1_ContractLevel: "",
        split1_AgentCarrierNumber: "",
        split1_splitRatio: "",

        split2_AgentFirstName: "",
        split2_AgentLastName: "",
        split2_AgentCode: "",
        split2_ContractLevel: "",
        split2_AgentCarrierNumber: "",
        split2_splitRatio: "",

        overwrittingAgentFirstName1: "",
        overwrittingAgentLastName1: "",
        overwrittingAgentCode1: "",
        overwrittingAgentContractLevel1: 0,
        overwrittingAgentCarrierNumber1: "",

        overwrittingAgentFirstName2: "",
        overwrittingAgentLastName2: "",
        overwrittingAgentCode2: "",
        overwrittingAgentContractLevel2: 0,
        overwrittingAgentCarrierNumber2: "",

    }
    )

    const handleInputChange = (data, field, fieldType) => {
        const updatedValue = fieldType === 'number' ? parseFloat(data) : data;
        setPolicyData((prevFormData) => ({ ...prevFormData, [field]: updatedValue }));
    };

    const handleDateChange = (date, field) => {
        const formattedDate = dayjs(date).format('M/D/YYYY');
        setPolicyData((prevFormData) => ({ ...prevFormData, [field]: formattedDate }));
    };

    const handleAutocompleteValue = (data, field) => {
        setPolicyData((prevValue) => ({ ...prevValue, [field]: data }))
    }

    const carriers = [
        'Crump',
        'SuranceBay',
        'TransAmerica',
        'Athene',
        'NationWide',
        'NorthAmerican',
        'Oscar',
        'Aetna',
        'BlueCross BlueShield',
        'United Healthcare',
        'LSPN',
        'United American',
        'Cigna',
        'Debtmerica',
        'Prudential',
        'Mutual Of Omaha'
    ]

    const policyTypes = [
        'Life',
        'Health',
        'Annuities'
    ]


    const getPolicyDetailById = async () => {
        dispatch(showLoader())
        const res = await httpClient.get(`/policies/getPolicyByID/${id}`).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res.status === 200) {
            dispatch(hideLoader())
            setPolicyData(res?.data)
        }
    }

    const getPolicyDetailByPolicyNumber = async () => {
        dispatch(showLoader())
        const res = await httpClient.get(`/policies/getPolicyByPolicyNumber/${policyNumber}`).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res.status === 200) {
            dispatch(hideLoader())
            setPolicyData(res?.data)
        }
    }


    const approveHandler = async () => {
        dispatch(showLoader())
        if (id) {
            const res = await httpClient.post(`/policies/approvePolicy/${id}`, policyData)
                .catch((error) => {
                    dispatch(hideLoader())
                    snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
                })

            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
                setTimeout(() => {
                    navigate('/policies')
                }, 6000);
            }
        }
        else {
            const res = httpClient.post('/policies/addNewPolicy', policyData)
                .catch((error) => {
                    dispatch(hideLoader())
                    snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
                })
            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
                setTimeout(() => {
                    navigate('/policies')
                }, 6000);
            }
        }
    }

    const rejectHandler = async() =>{
         dispatch(showLoader())
         const res = await httpClient.post(`/policies/rejectPolicy/${id}`)
         .catch((error) => {
             dispatch(hideLoader())
             snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
         })

     if (res?.status === 200) {
         dispatch(hideLoader())
         snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
         setTimeout(() => {
             navigate('/policies')
         }, 6000);
     }
     }


    const handleToggle = () => {
        setPolicyData(prevState => ({
            ...prevState,
            isSplit: !prevState.isSplit,
        }));
    };

    useEffect(() => {
        if (id) {
            getPolicyDetailById()
        }
        else if (policyNumber){
            getPolicyDetailByPolicyNumber()
        }

    }, [])

    return (
        <div>
            <Header />
            <div style={{ marginTop: '59px', height: '114vh' }}>
                <div style={{
                    display: 'flex',
                    height: '91.6vh',
                }}>
                    <SideBar />
                    <CustomizedSnackbars ref={snackbar_Ref} />
                    <Stack alignItems={'center'} sx={{ width: '81.8%', marginLeft: '18%' }}>
                        <Box sx={{ height: '12vh' }}>
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
                            // onClick={() => setNewPolicyClicked(true)}
                            >
                                <Grid container
                                    alignItems={'center'}
                                    sx={{ width: '100%' }}
                                >
                                    <Grid item md="3"><Notepad size={20} weight="light" /></Grid>
                                    <Grid item md="9"> {id ? 'Policy Details' : "New Policy"}</Grid>

                                </Grid>
                            </Button>
                        </Box>
                        <Stack alignItems={'flex-end'} sx={{ width: '95%' }} >
                            <Stack justifyContent='flex-end' sx={{ width: '18%' }}>
                                Paid Agency Commision:
                                <LinearProgressWithLabel value={policyData.paidAgencyCommission} />
                            </Stack>
                        </Stack>

                        <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: '100%', height: "112vh", marginTop: '10px' }}>

                            <Stack alignItems={'center'} sx={{ width: '96%', height: '100%', backgroundColor: '#F2F2F2', borderRadius: '20px' }}>
                                <Stack sx={{ width: '89%' }} >
                                    <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '79%', height: '59%' }}>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label' >Policy Submission Date:</Typography>
                                            <Calendar value={policyData.policySubmissionDate} onDateChange={(date) => handleDateChange(date, 'policySubmissionDate')} />

                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Policy Registration Id:</Typography>
                                            <TextField
                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.policyRegistrationId}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "id") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Premium</Typography>
                                            <TextField

                                                type='number'
                                                variant="outlined"
                                                value={policyData.policyValue}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "policyValue", "number") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Agency Commision %
                                                <Asterisk color='red' size={12} weight="bold" />
                                            </Typography>
                                            <TextField
                                                type='number'
                                                variant="outlined"
                                                value={policyData.agencyCommissionPercentage}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "agencyCommissionPercentage", "number") }}
                                            />
                                        </Stack>

                                    </Stack>

                                    <Typography className='details-heading'>POLICY DETAILS:</Typography>
                                    <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '100%' }}>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label' >Policy Commission Date:
                                                <Asterisk color='red' size={12} weight="bold" /></Typography>
                                            <Calendar value={policyData.policyApprovalDate} onDateChange={(date) => handleDateChange(date, 'policyApprovalDate')} />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Carrier:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.policyCarrier}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "policyCarrier", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Policy Type:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.policyType}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "policyType", "text") }}
                                            />
                                            {/* <PoliciesDropdown options={policyTypes} label='Policy Type' origin='approvePolicy' onSelectValue={(data) => handleAutocompleteValue(data, 'policyType')} /> */}
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Policy Number</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.policyNumber}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "policyNumber", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Advance Payment %
                                                <Asterisk color='red' size={12} weight="bold" /></Typography>
                                            <TextField
                                                type='number'
                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.advPaymentPercentage}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "advPaymentPercentage", "number") }}
                                            />
                                        </Stack>

                                        <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: policyData.isApproved ? "100%" : "79%" }}>
                                            <Stack className='Policy-textfield' sx={{ display: policyData.isApproved ? "block" : "none" }}>
                                                <Typography className='input-label'>Remaining Payment %</Typography>
                                                <TextField
                                                    type='number'
                                                    className='text-field'
                                                    variant="outlined"
                                                    value={policyData.remainingPaymentPercentage}
                                                    sx={{ width: '30%' }}
                                                    onChange={(e) => { handleInputChange(e.target.value, "remainingPaymentPercentage", "number") }}
                                                />
                                            </Stack>
                                            <Stack className='Policy-textfield'>
                                                <Typography className='input-label'>Insured First Name</Typography>
                                                <TextField
                                                    className='text-field'
                                                    variant="outlined"
                                                    value={policyData.insuredFirstName}
                                                    sx={{ width: '20%' }}
                                                    onChange={(e) => { handleInputChange(e.target.value, "insuredFirstName", "text") }}
                                                />
                                            </Stack>
                                            <Stack className='Policy-textfield'>
                                                <Typography className='input-label'>Insured Last Name</Typography>
                                                <TextField
                                                    className='text-field'
                                                    variant="outlined"
                                                    value={policyData.insuredLastName}
                                                    sx={{ width: '20%' }}
                                                    onChange={(e) => { handleInputChange(e.target.value, "insuredLastName", "text") }}
                                                />
                                            </Stack>
                                            <Stack className='Policy-textfield'>
                                                <Typography className='input-label'>Policy Start date:</Typography>
                                                <TextField
                                                    className='text-field'
                                                    variant="outlined"
                                                    value={policyData.policyStartDate}
                                                    sx={{ width: '20%' }}
                                                    onChange={(e) => { handleInputChange(e.target.value, "policyStartDate", "text") }}
                                                />
                                            </Stack>
                                            <Stack className='Policy-textfield'>
                                                <Typography className='input-label'>Policy End date:</Typography>
                                                <TextField
                                                    className='text-field'
                                                    variant="outlined"
                                                    value={policyData.policyEndDate}
                                                    sx={{ width: '20%' }}
                                                    onChange={(e) => { handleInputChange(e.target.value, "policyEndDate", "text") }}
                                                />
                                            </Stack>

                                        </Stack>


                                    </Stack>

                                    <Typography className='details-heading'>AGENT DETAILS:</Typography>
                                    <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '100%' }}>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label' >Agent First Name:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.agentFirstName}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "agentFirstName", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Agent Last Name:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.agentLastName}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "agentLastName", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Writting Agent Code:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.agentCode}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "agentCode", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Contract Level:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.contractLevel}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "contractLevel") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>Agent Carrier Number</Typography>
                                            <TextField
                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.agentCarrierNumber}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "agentCarrierNumber", "text") }}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Stack direction={'row'}>
                                        <Typography>Is there any split</Typography>
                                        <Switch
                                            checked={policyData.isSplit}
                                            onChange={handleToggle}
                                            // color="primary" // You can customize the color if needed
                                            sx={{ marginTop: '-8px', color: '#003478' }}
                                        />
                                    </Stack>
                                    {
                                        policyData.isSplit ? (
                                            <>
                                                {/* Split1 details */}
                                                <Typography className='details-heading'>SPLIT DETAILS:</Typography>
                                                <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '100%' }}>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label' >Agent First Name:</Typography>
                                                        <TextField

                                                            className='text-field'
                                                            variant="outlined"
                                                            value={policyData.split1_AgentFirstName}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split1_AgentFirstName", "text") }}
                                                        />
                                                    </Stack>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Agent Last Name:</Typography>
                                                        <TextField

                                                            className='text-field'
                                                            variant="outlined"
                                                            value={policyData.split1_AgentLastName}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split1_AgentLastName", "text") }}
                                                        />
                                                    </Stack>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Agent Code:</Typography>
                                                        <TextField

                                                            variant="outlined"
                                                            value={policyData.split1_AgentCode}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split1_AgentCode", "text") }}
                                                        />
                                                    </Stack>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Contract Level:</Typography>
                                                        <TextField

                                                            variant="outlined"
                                                            value={policyData.split1_ContractLevel}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split1_ContractLevel") }}
                                                        />
                                                    </Stack>

                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Split Ratio:</Typography>
                                                        <TextField

                                                            variant="outlined"
                                                            value={policyData.split1_splitRatio}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split1_splitRatio") }}
                                                        />
                                                    </Stack>




                                                </Stack>

                                                {/* Split2 Details */}
                                                <Typography className='details-heading'>SPLIT 2 DETAILS:</Typography>
                                                <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '100%' }}>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label' >Agent First Name:</Typography>
                                                        <TextField

                                                            className='text-field'
                                                            variant="outlined"
                                                            value={policyData.split2_AgentFirstName}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split2_AgentFirstName", "text") }}
                                                        />
                                                    </Stack>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Agent Last Name:</Typography>
                                                        <TextField

                                                            className='text-field'
                                                            variant="outlined"
                                                            value={policyData.split2_AgentLastName}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split2_AgentLastName", "text") }}
                                                        />
                                                    </Stack>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Agent Code:</Typography>
                                                        <TextField

                                                            variant="outlined"
                                                            value={policyData.split2_AgentCode}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split2_AgentCode", "text") }}
                                                        />
                                                    </Stack>
                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Contract Level:</Typography>
                                                        <TextField

                                                            variant="outlined"
                                                            value={policyData.split2_ContractLevel}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split2_ContractLevel") }}
                                                        />
                                                    </Stack>

                                                    <Stack className='Policy-textfield'>
                                                        <Typography className='input-label'>Split Ratio:</Typography>
                                                        <TextField

                                                            variant="outlined"
                                                            value={policyData.split2_splitRatio}
                                                            sx={{ width: '20%' }}
                                                            onChange={(e) => { handleInputChange(e.target.value, "split2_splitRatio") }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </>
                                        ) :
                                            (
                                                <></>
                                            )
                                    }

                                    {/* Overwrite1 details */}
                                    <Typography className='details-heading'>OVERWRITE1 DETAILS:</Typography>
                                    <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '79%' }}>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label' >OW1 Agent First Name:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.overwrittingAgentFirstName1}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentFirstName1", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>OW1 Agent Last Name:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.overwrittingAgentLastName1}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentLastName1", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>OW1 Agent Code:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.overwrittingAgentCode1}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentCode1", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>OW1 Contract Level:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.overwrittingAgentContractLevel1}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentContractLevel1") }}
                                            />
                                        </Stack>
                                    </Stack>

                                    {/* Overwrite2 Details */}
                                    <Typography className='details-heading'>OVERWRITE2 DETAILS:</Typography>
                                    <Stack flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} sx={{ width: '79%' }}>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label' >OW2 Agent First Name:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.overwrittingAgentFirstName2}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentFirstName2", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>OW2 Agent Last Name:</Typography>
                                            <TextField

                                                className='text-field'
                                                variant="outlined"
                                                value={policyData.overwrittingAgentLastName2}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentLastName2", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>OW2 Agent Code:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.overwrittingAgentCode2}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentCode1", "text") }}
                                            />
                                        </Stack>
                                        <Stack className='Policy-textfield'>
                                            <Typography className='input-label'>OW2 Contract Level:</Typography>
                                            <TextField

                                                variant="outlined"
                                                value={policyData.overwrittingAgentContractLevel2}
                                                sx={{ width: '20%' }}
                                                onChange={(e) => { handleInputChange(e.target.value, "overwrittingAgentContractLevel2") }}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Stack alignItems={'center'} sx={{ width: '100%' }}>
                                        <Stack sx={{ width: '90%', }} >
                                            <Stack
                                                flexDirection={'row'}
                                                alignItems={'center'}
                                                justifyContent={'space-between'}
                                                sx={{ width: '100%', height: '13vh' }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: "#003478",
                                                        color: 'white',
                                                        width: '186px',
                                                        height: "5vh",
                                                        fontSize: '12px',
                                                        "&:hover": {
                                                            backgroundColor: '#003478',
                                                        },
                                                        "&:disabled": {
                                                            backgroundColor: '#406391',
                                                            color: 'white',
                                                        }
                                                    }}
                                                    onClick={approveHandler}
                                                >
                                                    {policyData.isApproved ? 'Update' : 'Approve'}
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        display:policyData.isApproved ? 'none' : 'flex',
                                                        backgroundColor: "#003478",
                                                        color: 'white',
                                                        width: '186px',
                                                        height: "5vh",
                                                        fontSize: '12px',
                                                        "&:hover": {
                                                            backgroundColor: '#003478',
                                                        },
                                                        "&:disabled": {
                                                            backgroundColor: '#406391',
                                                            color: 'white',
                                                        }
                                                    }}
                                                    onClick={rejectHandler}
                                                >
                                                    Decline
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default ApprovePolicy