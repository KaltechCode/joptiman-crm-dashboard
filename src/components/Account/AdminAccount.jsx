import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Layout/Header'
import SideBar from '../../Layout/Sidebar'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar'
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { Camera } from 'phosphor-react'
import { UploadImagetoFb } from '../../Hook/uploadImage'
import httpClient from '../../_util/api'
import { hideLoader, showLoader } from '../../Store/mainSlice'
import { useDispatch } from 'react-redux'


const AdminAccount = () => {
    const snackbar_Ref = useRef()
    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()
    const [isUpdateAccountClicked, setIsUpdateAccountClicked] = useState(false)

    const [adminData, setAdminData] = useState({
        firstName:"",
        lastName:"",
        adminCode:"",
        email: "",
        password: "",
        profilePic: "",
        phoneNumber: 0,
    })

   

    const uploadPhotoHandler = () => {
        console.log("clicked");
        uploadPhotoRef.current.click();
    }


    const handleFileChange = async (event, field) => {
        const getFirestorePic = await UploadImagetoFb(event)
        console.log("getFirestorePic.url", getFirestorePic.url)
        setAdminData((prevFormData) => ({ ...prevFormData, [field]: getFirestorePic.url }));
    };

    const handleInputChange = (data, field, fieldType) => {
        const updatedValue = fieldType === 'number' ? parseFloat(data) : data;
        setAdminData((prevFormData) => ({ ...prevFormData, [field]: updatedValue }));
    };

    const getAccountDetails = async()=>{
        dispatch(showLoader())
        const res =await httpClient.get('/user/getAccountDetails').catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res?.status === 200) {
            dispatch(hideLoader())
            // snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
            setAdminData(res?.data)
        }
    }

    const updateAccountHandler = async () => {
        dispatch(showLoader())
        const res =await httpClient.post('/user/updateAdminAccount', adminData).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if (res?.status === 200) {
            setIsUpdateAccountClicked(false)
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
        }
    }

    const editSuperAdminHandler =()=>{
        setIsUpdateAccountClicked(true) 
        getAccountDetails()
    }

    useEffect(()=>{
        getAccountDetails()
    },[])
    return (
        <>
            <Header />
            <CustomizedSnackbars ref={snackbar_Ref} />
            <div style={{ marginTop: '56px' }}>
                <div style={{
                    display: 'flex',
                    height: '92vh',
                }}>
                    <SideBar />
                    <CustomizedSnackbars ref={snackbar_Ref} />
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: '100%', height: '92vh', marginLeft: '18%' }}>
                        <Stack alignItems={'center'} sx={{ width: '98%', height: '90%', backgroundColor: '#F2F2F2', borderRadius: '15px' }}>
                            <Stack justifyContent={'space-around'} sx={{ width: '95%', height: '100%' }}>
                                <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
                                    <Stack>
                                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Welcome </Typography>
                                        <Typography variant='h4'>Super Admin!</Typography>
                                    </Stack>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#003478",
                                            color: 'white',
                                            width: '233px',
                                            height: "5vh",
                                            fontSize: '12px',
                                            "&:hover": {
                                                backgroundColor: "#003478",
                                            },
                                        }}
                                        // onClick={() => { setIsUpdateAccountClicked(true) }}
                                        onClick={editSuperAdminHandler}
                                    >
                                        Edit Super Admin Details
                                    </Button>

                                </Stack>

                                <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '100%',height:isUpdateAccountClicked ?'27vh' : '50vh'}}>
                                    <Box sx={{ width:isUpdateAccountClicked ? adminData.profilePic ? '24.5%' : '20%' : '33%', height: '100%', borderRadius: '12px' }}>
                                        {
                                            adminData.profilePic
                                                ? (
                                                    <img src={adminData.profilePic} style={{height:'100%',borderRadius:'12px'}}/>
                                                )
                                                : (
                                                    <Avatar sx={{ width: '92%', height: '100%' }} />
                                                )
                                        }
                                        <Stack htmlFor="upload-photo-input" sx={{display:isUpdateAccountClicked ? 'flex' : 'none' , marginTop: isUpdateAccountClicked ? adminData.profilePic ? '-39px' : '-56px': "-79px", marginLeft:isUpdateAccountClicked ? adminData.profilePic ? '272px' : '175px' : '297px', zIndex: 1, weight: "light" }}>
                                            <Camera size={32} weight="light" onClick={uploadPhotoHandler} />
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

                                    <Stack alignItems={'center'} justifyContent={'center'} sx={{ width:isUpdateAccountClicked ? '71%' : '52%', height: '100%', backgroundColor: '#D9D9D9', borderRadius: '12px' }}>
                                        <Stack sx={{ width: '90%', height: '67%' }}>
                                            <Stack flexDirection={'row'} >
                                                <Typography sx={{ fontWeight: 'bold',fontSize: isUpdateAccountClicked ?'18px' : '23px' }}>FIRST NAME: </Typography><Typography sx={{fontSize:isUpdateAccountClicked ?'18px' : '23px' }}> {adminData.firstName}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'} >
                                                <Typography sx={{ fontWeight: 'bold',fontSize:isUpdateAccountClicked ?'18px' : '23px'  }}>LAST NAME: </Typography><Typography sx={{fontSize:isUpdateAccountClicked ?'18px' : '23px' }}> {adminData.lastName}</Typography>
                                            </Stack>
                                            <Stack flexDirection={'row'} >
                                                <Typography sx={{ fontWeight: 'bold' ,fontSize:isUpdateAccountClicked ?'18px' : '23px' }}>ADMIN CODE: </Typography><Typography sx={{fontSize:isUpdateAccountClicked ?'18px' : '23px' }}> {adminData.adminCode}</Typography>
                                            </Stack>
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
                                                    value={adminData.password}
                                                    onChange={(e) => { handleInputChange(e.target.value, "password", "text") }}
                                                />

                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Email"
                                                    variant="outlined"
                                                    className='reset-account-textfield'
                                                    value={adminData.email}
                                                    onChange={(e) => { handleInputChange(e.target.value, "email", "text") }} />

                                                <TextField
                                                 type="number"
                                                    id="outlined-basic"
                                                    placeholder="Phone Number"
                                                    variant="outlined"
                                                    className='reset-account-textfield'
                                                    value={adminData.phoneNumber}
                                                    onChange={(e) => { handleInputChange(e.target.value, "phoneNumber", "number") }}
                                                />
                                            </Stack>
                                            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-end'} sx={{ width: "92%", height: '6vh', }}>
                                                <Button sx={{
                                                    width: '15%', height: '5vh', backgroundColor: "#003478",
                                                    color: "white", fontSize: '12px', 'hover': {
                                                        backgroundColor: "#003478",
                                                        color: "white",
                                                    }
                                                }} onClick={updateAccountHandler}>Save</Button>

                                            </Stack>
                                        </>

                                    )
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default AdminAccount