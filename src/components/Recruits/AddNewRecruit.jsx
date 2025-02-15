import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../Layout/Sidebar'
import Header from '../../Layout/Header'
import './style.scss'
import { hideLoader, showLoader } from '../../Store/mainSlice'
import { useNavigate, useParams } from 'react-router-dom'
import httpClient from '../../_util/api'
import { useDispatch } from 'react-redux'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar'
import { Asterisk } from 'phosphor-react'
// import states from '../../constants'

const AddNewRecruit = () => {
    const states =
        [
            'Alabama',
            'Alaska',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
            'Connecticut',
            'Delaware',
            'District Of Columbia',
            'Florida',
            'Georgia',
            'Hawaii',
            'Idaho',
            'lllinois',
            'Indiana',
            'lowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'MaryLand',
            'Massachusetts',
            'Michigan',
            'Minnesota',
            'Mississippi',
            'Missouri',
            'Montana',
            'Nebraska',
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico',
            'New York',
            'North Carolina',
            'North Dakota',
            'Ohio',
            'Oklahoma',
            'Oregon',
            'Pennsylvania',
            'Rhode Island',
            'South Carolina',
            'South Dakota',
            'Tennessee',
            'Texas',
            'Utah',
            'Vermont',
            'Virginia',
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming',
        ]

    const dispatch = useDispatch()
    const snackbar_Ref = useRef(null)
    const navigate = useNavigate()
    const { _id } = useParams()
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"))
    const recruitingAgentCode = localStorage.getItem("agentCode")
    const [agentData, setAgentData] = useState({
        isApproved: false,
        residentState: "",
        age: "",
        firstName: "",
        lastName: "",
        level: 0,
        agentCarrierNumber: "",
        agentTitle: "",
        agentRole: "",
        agentCode: "",
        email: "",
        confirmEmail: "",
        addressLine1: "",
        city: "",
        state: "",
        zipCode: 0,
        activeLicense: "",
    })


    const handleInputChange = (data, field) => {
        setAgentData((prevFormData) => ({ ...prevFormData, [field]: data }));
    };

    const LoadAgentData = async () => {
        dispatch(showLoader())
        const res = await httpClient.get(`/agents/getAgentByID/${_id}`)
            .catch((error) => {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
            })

        if (res?.status === 200) {
            dispatch(hideLoader())
            setAgentData(res?.data.agentDetails)
        }

    }



    const submitHandler = async () => {
        dispatch(showLoader())
        if (_id) {
            const res = await httpClient.post(`/agents/approveAgent/${_id}`, agentData)
                .catch((error) => {
                    dispatch(hideLoader())
                    snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
                })

            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
                setTimeout(() => {
                    navigate('/recruits')
                }, 3000);
            }
        }
        else if (isAdmin === true) {
            const res = await httpClient.post('/agents/addNewAgent', agentData)
                .catch((error) => {
                    dispatch(hideLoader())
                    snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
                })

            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
                setTimeout(() => {
                    navigate('/recruits')
                }, 3000);
            }
        }
        else {
            const res = await httpClient.post(`/agents/addNewAgent/${recruitingAgentCode}`, agentData)
                .catch((error) => {
                    dispatch(hideLoader())
                    snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
                })
            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
                setTimeout(() => {
                    navigate('/recruits')
                }, 3000);

            }
        }
    }

    const deleteHandler = async () => {
        const res = await httpClient.delete(`/agents/deleteAgent/${_id}`, agentData)
            .catch((error) => {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
            })

        if (res?.status === 200) {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
            setTimeout(() => {
                navigate('/recruits')
            }, 3000);
        }
    }

    useEffect(() => {
        console.log("Agent id", _id);
        if (_id) {
            LoadAgentData()
        }

        console.log("residentState", agentData.residentState);

    }, [])

    return (
        <>
            <Header />
            <div style={{ marginTop: '56px' }}>
                <div style={{
                    display: 'flex',
                    height: '100vh',
                    // overflowY: 'hidden'
                }}>

                    <SideBar />
                    <CustomizedSnackbars ref={snackbar_Ref} />
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{
                        marginLeft: '18%', width: '82%',
                        height: _id ? '187vh' : '150vh',
                        marginTop: '9px',
                    }}>
                        <Stack justifyContent={'space-between'} sx={{
                            width: '88%',
                            height: _id ? "91%" : '88%'
                        }}>
                            <Stack className='text-field-container'>
                                <Stack className='text-field'>
                                    <Typography className='form-questions'>To start up, please tell us Agent's Resident State
                                        <Asterisk color='red' size={12} weight="bold" />
                                    </Typography>

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={states}
                                        sx={{ width: 600 }}
                                        renderInput={(params) => <TextField {...params} label="Select a State" />}
                                        value={agentData.residentState}
                                        onChange={(e, newValue) => {
                                            handleInputChange(newValue, "residentState");
                                        }}
                                    />
                                </Stack>
                            </Stack>

                            <Stack>
                                <Typography className='form-questions'>Is Agent above 18 yrs and legally authorized to work in the U. S.?
                                    <Asterisk color='red' size={12} weight="bold" /></Typography>
                                <FormGroup>
                                    <FormControlLabel checked={agentData.age === 'Yes'} control={<Checkbox onChange={(e) => { handleInputChange("Yes", "age") }} />} label="Yes" />
                                    <FormControlLabel checked={agentData.age === 'No'} control={<Checkbox onChange={(e) => { handleInputChange("No", "age") }} />} label="No" />
                                </FormGroup>
                            </Stack>

                            {/* Name Stack */}
                            <Stack>
                                <Typography className='form-questions'>Name
                                    <Asterisk color='red' size={12} weight="bold" /></Typography>
                                <Stack>
                                    <Stack flexDirection={'row'} className='text-field-container'>
                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.firstName}
                                                onChange={(e) => { handleInputChange(e.target.value, "firstName") }}
                                            />
                                            <Typography>First
                                            </Typography>
                                        </Stack>

                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.lastName}
                                                onChange={(e) => { handleInputChange(e.target.value, "lastName") }}
                                            />
                                            <Typography>Last</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/* Email Stack */}
                            <Stack>
                                <Typography className='form-questions'>Email
                                    <Asterisk color='red' size={12} weight="bold" />
                                </Typography>
                                <Stack>
                                    <Stack flexDirection={'row'} className='text-field-container'>
                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.email}
                                                onChange={(e) => { handleInputChange(e.target.value, "email") }}
                                            />
                                            <Typography>Email</Typography>
                                        </Stack>

                                        <Stack className='text-field' sx={{ display: _id ? 'none' : 'flex' }}>
                                            <TextField
                                                value={agentData.confirmEmail}
                                                onChange={(e) => { handleInputChange(e.target.value, "confirmEmail") }}
                                            />
                                            <Typography>Confirm Email</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/* Address Stack */}
                            <Stack>
                                <Typography className='form-questions'>Address
                                    <Asterisk color='red' size={12} weight="bold" /></Typography>
                                <Stack>
                                    <Stack className='text-field-container'>
                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.addressLine1}
                                                onChange={(e) => { handleInputChange(e.target.value, "addressLine1") }}
                                            />
                                            <Typography>Address Line1</Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack flexDirection={'row'} className='text-field-container'>
                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.city}
                                                onChange={(e) => { handleInputChange(e.target.value, "city") }}
                                            />
                                            <Typography>City</Typography>
                                        </Stack>

                                        <Stack className='text-field'>
                                            {/* <TextField
                                                value={agentData.state}
                                                onChange={(e) => { handleInputChange(e.target.value, "state") }}
                                            /> */}
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={states}
                                                sx={{ width: 350, height: 45 }}
                                                renderInput={(params) => <TextField {...params} label="Select a State" />}
                                                value={agentData.residentState}
                                                onChange={(e, newValue) => {
                                                    handleInputChange(newValue, "residentState");
                                                }}
                                            />
                                            <Typography>State</Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack className='text-field-container'>
                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.zipCode}
                                                onChange={(e) => { handleInputChange(e.target.value, "zipCode") }}
                                            />
                                            <Typography>Zip Code</Typography>
                                        </Stack>
                                    </Stack>


                                </Stack>
                            </Stack>

                            {/* Active Licensed Stack  */}
                            <Stack >
                                <Typography className='form-questions'>Do Agent have an Active License?
                                    <Asterisk color='red' size={12} weight="bold" /></Typography>
                                <Stack>
                                    <FormGroup>
                                        <Stack flexDirection={'row'}>
                                            <FormControlLabel control={<Checkbox checked={agentData.activeLicense === "Yes"} onChange={(e) => { handleInputChange("Yes", "activeLicense") }} />} label="Yes" />
                                            <FormControlLabel control={<Checkbox checked={agentData.activeLicense === "No"} onChange={(e) => { handleInputChange("No", "activeLicense") }} />} label="No" />
                                        </Stack>
                                    </FormGroup>
                                </Stack>
                            </Stack>


                            {/* Recruiting Stack */}
                            {agentData.recruitingAgentCode ?
                                (
                                    <Stack className='text-field-container'>
                                        <Typography className='form-questions'>Who is Recruiting Agent?
                                            <Asterisk color='red' size={12} weight="bold" />
                                        </Typography>
                                        <Stack className='text-field'>
                                            <TextField
                                                value={agentData.recruitingAgentCode}
                                                onChange={(e) => { handleInputChange(e.target.value, "recruitingAgentCode") }}
                                            />
                                        </Stack>
                                    </Stack>
                                )
                                : (
                                    <></>
                                )
                            }

                            {
                                _id ?
                                    isAdmin && (
                                        <>
                                            <Stack className='text-field-container'>
                                                <Typography className='form-questions'>Agent's Contract Level
                                                    <Asterisk color='red' size={12} weight="bold" /></Typography>
                                                <Stack className='text-field'>
                                                    <TextField
                                                        value={agentData.level}
                                                        onChange={(e) => { handleInputChange(e.target.value, "level") }}
                                                    />
                                                </Stack>
                                            </Stack>


                                            <Stack className='text-field-container'>
                                                <Typography className='form-questions'>Agent's Title
                                                    <Asterisk color='red' size={12} weight="bold" /></Typography>
                                                <Stack className='text-field'>
                                                    <TextField
                                                        value={agentData.agentTitle}
                                                        onChange={(e) => { handleInputChange(e.target.value, "agentTitle") }}
                                                    />
                                                </Stack>
                                            </Stack>





                                        </>
                                    )
                                    : (
                                        <></>
                                    )
                            }
                            <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ display: agentData.isApproved === true ? 'none' : 'flex' }}>
                                <Button
                                    variant="contained"
                                    disabled=""
                                    sx={{
                                        backgroundColor: "#003478",
                                        color: 'white',
                                        width: '170px',
                                        height: "5vh",
                                        fontSize: '12px',
                                        "&:hover": {
                                            backgroundColor: "#003478",
                                        },
                                    }}
                                    onClick={submitHandler}
                                >
                                    {
                                        isAdmin
                                            ? (_id ? "Approve" : "Submit")
                                            : "Submit"
                                    }
                                </Button>

                                {
                                    _id ?
                                        isAdmin && (
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#F08613",
                                                    color: 'white',
                                                    width: '170px',
                                                    height: "5vh",
                                                    fontSize: '12px',
                                                    "&:hover": {
                                                        backgroundColor: "#F08613",
                                                    },
                                                }}
                                                onClick={deleteHandler}
                                            >
                                                Reject
                                            </Button>
                                        )
                                        : (<></>)
                                }

                            </Stack>
                        </Stack>

                    </Stack>
                </div>
            </div>
        </>
    )
}

export default AddNewRecruit