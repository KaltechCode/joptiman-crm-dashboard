import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Layout/Header'
import SideBar from '../../Layout/Sidebar'
import { Box, Stack, TextField, Typography, Button, Avatar } from '@mui/material'
import profilePhoto from '../../assets/profilePhotoCRM.png'
import './style.scss'
import httpClient from '../../_util/api'
import { hideLoader, showLoader } from '../../Store/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar'
import { Camera } from 'phosphor-react'
import { UploadImagetoFb } from '../../Hook/uploadImage'

const AccountDetail = () => {
    const [isMyAccountClicked, setIsMyAccountClicked] = useState(true)
    const [isUpdateAccountClicked, setIsUpdateAccountClicked] = useState(false)
    const userDetails = useSelector((state) => state.mainSlice.userdetail)
    // const userId = useSelector((state) => state.mainSlice.userdetail.userId)
    const userId = localStorage.getItem("userId")
    const snackbar_Ref = useRef(null)
    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()
    const [userData, setuserData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        level: 0,
        email: "",
        OTP: "",
        verified: false,
        agentCode: "",
        agentTitle: "",
        agentRole: "",
        recruitingAgentCode: "",
        recruitmentDate: "",
        recruits: 0,
        commissionEarned: 0,
        password: "",
        phoneNumber: 0,
        profilePic: ""
    })

    const myAccountHandler = async () => {
        setIsUpdateAccountClicked(false)
        setIsMyAccountClicked(true)
    }


    const updateAccountHandler = () => {
        setIsUpdateAccountClicked(true)
        setIsMyAccountClicked(false)
        // setIsUpdateAccountClicked(true)
    }

    const uploadPhotoHandler = () => {
        console.log("clicked");
        uploadPhotoRef.current.click();
    }

    const handleFileChange = async (event, field) => {
        const getFirestorePic = await UploadImagetoFb(event)
        console.log("getFirestorePic.url", getFirestorePic.url)
        setuserData((prevFormData) => ({ ...prevFormData, [field]: getFirestorePic.url }));
    };

    const saveHandler = async () => {
        dispatch(showLoader())
        const res = await httpClient.post('/agents/updateMyAccount', userData).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res?.status === 200) {
            setIsUpdateAccountClicked(false)
            setIsMyAccountClicked(true)
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
        }
    }
    const handleInputChange = (data, field, fieldType) => {
        const updatedValue = fieldType === 'number' ? parseFloat(data) : data;
        setuserData((prevFormData) => ({ ...prevFormData, [field]: updatedValue }));
    };

    const getAccountDetail = async () => {
        dispatch(showLoader())
        console.log("userDetails", userDetails);
        console.log("userId", userId)
        const res = await httpClient.get(`/agents/getAgentByID/${userId}`).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res?.status === 200) {
            dispatch(hideLoader())
            console.log("Detail res", res.data)
            setuserData(res?.data.agentDetails)
            // setPolicyData(res?.data.policyDetailsArray)
        }
    }

    useEffect(() => {
        getAccountDetail()
    }, [])

    return (
        <>
            <Header />
            <div style={{ marginTop: '56px' }}>
                <div style={{
                    display: 'flex',
                    height: '92vh',
                }}>
                    <SideBar />
                    <CustomizedSnackbars ref={snackbar_Ref} />
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: '100%', height: '92vh', marginLeft: '18%' }}>
                        <Stack sx={{ width: '98%', height: '95%', backgroundColor: '#F2F2F2', borderRadius: '15px' }}>
                            <Stack alignItems={'center'} justifyContent={'center'} flexDirection={'row'} sx={{ width: '100%', height: '14vh' }}>
                                <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '44%' }}>
                                    <Button sx={{
                                        width: '47%', backgroundColor: isMyAccountClicked ? "#F08613" : 'white', color: isMyAccountClicked ? 'white' : '#F08613', fontSize: '12px', borderRadius: '7px',
                                        '&:hover': {
                                            backgroundColor: isMyAccountClicked ? "#F08613" : "white",
                                            color: isMyAccountClicked ? 'white' : "#F08613"
                                        }
                                    }} onClick={myAccountHandler}>
                                        My Account
                                    </Button>
                                    <Button sx={{
                                        width: '47%', backgroundColor: isUpdateAccountClicked ? "#F08613" : 'white', color: isUpdateAccountClicked ? 'white' : '#F08613', fontSize: '12px', borderRadius: '7px',
                                        '&:hover': {
                                            backgroundColor: isUpdateAccountClicked ? "#F08613" : "white",
                                            color: isUpdateAccountClicked ? 'white' : "#F08613"
                                        }
                                    }} onClick={updateAccountHandler}>Update Account</Button>
                                </Stack>
                            </Stack>

                            <Stack alignItems={'center'} sx={{ width: '100%', height: '100%' }}>
                                <Stack flexDirection={'row'} justifyContent={'center'} sx={{ width: "97%", height: '56%' }}>
                                    <Stack alignItems={'center'} sx={{ width: '58%', height: '42vh', backgroundColor: 'white', borderRadius: '20px' }}>
                                        <Box sx={{ width: '22%', height: '12vh',display:'flex' }}>
                                          
                                            {
                                                userData.profilePic
                                                    ? (
                                                        <img src={userData.profilePic} style={{ height: '100%', width: '94%',borderRadius:'58px' }} />
                                                    )
                                                    : (
                                                        <>
                                                            <Avatar sx={{ width: '92%', height: '100%' }} />
                                                            {/* <Stack htmlFor="upload-photo-input" sx={{ display: isUpdateAccountClicked ? 'flex' : 'none', marginTop:'-43px', marginLeft: '63px', zIndex: 1, weight: "light" }}>
                                                                <Camera size={32} weight="light" onClick={uploadPhotoHandler} />
                                                                <input
                                                                    ref={uploadPhotoRef}
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange(e, "profilePic")}
                                                                    style={{ display: 'none' }}
                                                                    className="upload-photo-input"
                                                                />
                                                            </Stack> */}
                                                        </>
                                                    )
                                            }
                                            <Stack htmlFor="upload-photo-input" sx={{ display: isUpdateAccountClicked ? 'flex' : 'none', marginTop: '46px', marginLeft: '-17px', zIndex: 1, weight: "light" }}>
                                                <Camera size={25} weight="light" onClick={uploadPhotoHandler} />
                                                <input
                                                    ref={uploadPhotoRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, "profilePic")}
                                                    style={{ display: 'none' }}
                                                    className="upload-photo-input"
                                                />
                                            </Stack>
                                        </Box>
                                        <Stack>
                                            <Stack flexDirection={'row'}>
                                            <Typography sx={{fontWeight:'bold'}}>FIRST NAME:</Typography><Typography> {userData.firstName}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'}>
                                            <Typography sx={{fontWeight:'bold'}}>LAST NAME:</Typography><Typography>{userData.lastName}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'}>
                                            <Typography sx={{fontWeight:'bold'}}>AGENT CODE:</Typography><Typography>{userData.agentCode}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'}>
                                            <Typography sx={{fontWeight:'bold'}}>AGENT TITLE:</Typography><Typography>{userData.agentTitle}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'}>
                                            <Typography sx={{fontWeight:'bold'}}>LEVEL:</Typography><Typography>{userData.level}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'}>
                                            <Typography sx={{fontWeight:'bold'}}>EMAIL:</Typography><Typography>{userData.email}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>

                                    <Stack alignItems={'center'} sx={{ width: '100%', height: "45vh", marginLeft: '23px' }}>
                                        <Stack flexDirection={'row'} flexWrap={'wrap'} sx={{ width: '100%', height: '79%' }}>
                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                sx={{ width: '30%', height: "10vh", marginLeft: '23px' }}
                                                className='Account-Textfield'
                                                label="Recruitment Date:"
                                                variant="filled"
                                                value={userData.recruitmentDate}
                                                onChange={(e) => { handleInputChange(e.target.value, "recruitmentDate", "text") }}
                                            />

                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="No of Recruites:"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }}
                                                value={userData.recruits}
                                                onChange={(e) => { handleInputChange(e.target.value, "recruits", "number") }}
                                            />
                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="Recruite Name | Code:"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }}
                                                value={userData.recruitingAgentCode}
                                                onChange={(e) => { handleInputChange(e.target.value, "recruitingAgentCode", "text") }}
                                            />
                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="Health Insurance Sales:"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }}
                                                // value={userData}
                                                onChange={(e) => { handleInputChange(e.target.value, "recruits", "number") }}
                                            />
                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="Life Insurance Sales:"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }}
                                            />
                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="Annuities Sales:"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }} />

                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="Total Policy Value"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }} />
                                            <TextField
                                                disabled={isUpdateAccountClicked ? true : false}
                                                label="Total Commission Earned:"
                                                variant="filled"
                                                sx={{ width: '30%', marginLeft: '23px' }}
                                                value={userData.commissionEarned}
                                                onChange={(e) => { handleInputChange(e.target.value, "commissionEarned", "number") }}
                                            />

                                        </Stack>

                                    </Stack>
                                </Stack>

                                {
                                    isUpdateAccountClicked && (
                                        <>
                                            <Stack justifyContent={'space-around'} sx={{ width: '88%', height: '24vh' }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Password Reset"
                                                    variant="outlined"
                                                    className='reset-account-textfield'
                                                    value={userData.password}
                                                    onChange={(e) => { handleInputChange(e.target.value, "password", "text") }}
                                                />

                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Email"
                                                    variant="outlined"
                                                    className='reset-account-textfield'
                                                    value={userData.email}
                                                    onChange={(e) => { handleInputChange(e.target.value, "email", "text") }} />

                                                <TextField
                                                    type='number'
                                                    id="outlined-basic"
                                                    placeholder="Phone Number"
                                                    variant="outlined"
                                                    className='reset-account-textfield'
                                                    value={userData.phoneNumber}
                                                    onChange={(e) => { handleInputChange(e.target.value, "phoneNumber", "number") }}
                                                />
                                            </Stack>
                                            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-end'} sx={{ width: "92%", height: '6vh', }}>
                                                <Button sx={{
                                                    width: '15%', height: '5vh', backgroundColor: "#003478",
                                                    color: "white", fontSize: '12px',
                                                    '&:hover': {
                                                        backgroundColor: "#003478",
                                                        color: "white",
                                                    }
                                                }} onClick={saveHandler}>Save</Button>
                                                <Button sx={{
                                                    width: '15%', height: '5vh', backgroundColor: "#F08613",
                                                    color: "white", fontSize: '12px',
                                                    ' &:hover': {
                                                        backgroundColor: "#F08613",
                                                        color: "white",
                                                    }
                                                }} onClick={myAccountHandler}>Close</Button>
                                            </Stack>
                                        </>

                                    )
                                }

                            </Stack>


                        </Stack>
                    </Stack>
                </div>
            </div >
        </>
    )
}

export default AccountDetail