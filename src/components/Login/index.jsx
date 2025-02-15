import React, { useRef, useState } from 'react'
import Header from '../../Layout/Header'
import { Button, Stack, TextField, Typography } from '@mui/material'
import './style.scss'
import httpClient from '../../_util/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAdmin } from '../../Store/userReducer'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar'
import { hideLoader, setIsLoggedIn, setUserDetail, showLoader } from '../../Store/mainSlice'
import landingPageImg from '../../assets/landingPageImg.svg'
import joptimanLogo from '../../assets/JOptimanlogo.png'
import svglogo from '../../assets/logo.svg'
import joptimenConsultancyLogo from '../../assets/JoptimanConsultancyLogo.png'
import LoadingButton from '@mui/lab/LoadingButton';


const Login = () => {
    const snackbar_Ref = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.mainSlice.userdetail)
    // const userId = useSelector((state)=>state.mainSlice.userdetail.userId)
    const isAdmin = useSelector((state) => state.user.isAdmin)
    const [isForgetPassword, setIsForgetPassword] = useState(false)
    const [isVerifyOTP, setIsVerifyOTP] = useState(false)
    const [userCredentials, setUserCredentials] = useState(
        {
            email: '',
            password: '',
            OTP:""
        }
    )

    const handleInputChange = (data, field) => {
        setUserCredentials((prevFormData) => ({ ...prevFormData, [field]: data }));
    };

    const forgotPasswordHandler = () => {
        setIsForgetPassword(true)
    }

    const nextHandler = async () => {
        dispatch(showLoader())
        const res =await httpClient.post('/user/forgetPassword', userCredentials).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
        })
        
        console.log("status",res)
        if (res?.status === 200) {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle")
            setIsForgetPassword(false)
            setIsVerifyOTP(true)
        }

        // setIsForgetPassword(false)
        // setIsVerifyOTP(true)
    }

    const verifyOTPHandler = async ()=>{
        dispatch(showLoader())
        const res = await httpClient.post('/user/verifyOTP',userCredentials).catch((error)=>{
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })

        if(res?.status === 200){
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("success" , res?.data.message ,"", "i-chk-circle" );
            setIsVerifyOTP(false)
        }
    }

    const loginHandler = async () => {
        dispatch(showLoader());
        const res = await httpClient.post('/user/login', userCredentials).catch((error) => {
            dispatch(hideLoader())
            snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
        })


       console.log("login res",res)

        if (res?.status === 200) {
            dispatch(hideLoader())
            const authToken = res.data.token
            const isAdmin = res.data.isAdmin ? res.data.isAdmin : false
            const isFinanceUser = res.data.isFinanceUser ? res.data.isFinanceUser : false
            const userId = res.data.userId
            const firstName = res.data.firstName
            const lastName = res.data.isAdmin ? res.data.lastName : res.data.isFinanceUser ? res.data.lastName : ""
            const adminCode = res.data.isAdmin ? res.data.adminCode  :  ""
            const agentTitle = res.data.isAdmin ? "" : res.data.isFinanceUser ? "" : res.data.agentTitle
            const agentCode = res.data.isAdmin ? "" : res.data.isFinanceUser ? "" : res.data.agentCode
            const contractLevel = res.data.isAdmin ? "" : res.data.isFinanceUser ? "" : res.data.contractLevel
            const profilePic = res.data.profilePic
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('isFinanceUser',isFinanceUser);
            localStorage.setItem("userId", userId)
            localStorage.setItem("firstName", firstName)
            localStorage.setItem("lastName", lastName)
            localStorage.setItem("profilePic", profilePic)
            localStorage.setItem("adminCode", adminCode)
            localStorage.setItem("agentTitle", agentTitle)
            localStorage.setItem("agentCode", agentCode)
            localStorage.setItem("contractLevel", contractLevel)
            dispatch(setIsLoggedIn(true))
            dispatch(setUserDetail(res.data))
            snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle");
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);



        }
    }

    return (
        <div>
            <div>
                <div
                >
                    <div style={{
                        width: '99.8%',
                        display: 'flex',
                        // justifyContent: 'center',
                        height: '100vh',
                    }}>
                        <CustomizedSnackbars ref={snackbar_Ref} />
                        <Stack sx={{ width: '57%', height: '100%' }}>
                            <img src={landingPageImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Stack>

                        <Stack sx={{ width: '47%', height: '100vh', backgroundColor: '#F08613' }}>
                            <Stack alignItems={'center'} justifyContent={'space-around'} sx={{ width: '100%', height: '100%', backgroundColor: 'white', borderBottomRightRadius: "200px" }}>
                                <Stack alignItems={'flex-end'} sx={{ width: '86%' }}>
                                    <Stack flexDirection={'row'} sx={{ width: '23%' }}>
                                        <img src={svglogo} />
                                        <img src={joptimenConsultancyLogo} style={{ width: '102px', height: '5vh' }} />
                                    </Stack>

                                </Stack>
                                <Stack className='Login-container' style={{ width: '68%', height: '69vh' }}>
                                    <Stack alignItems={'center'} justifyContent={'space-around'} sx={{ width: '100%', height: isForgetPassword ? '41%' : '72%' }}>
                                        <Stack justifyContent={'space-between'} sx={{ 
                                            width: '70%', height: '80%',
                                            '@media (max-width:1366px)': {
                                                width: '82%',
                                              }
                                         }}>
                                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                {isForgetPassword ?
                                                    "Forgot Password" :
                                                    isVerifyOTP ?
                                                        "Forgot Password" :
                                                        "Sign in to your account"

                                                }
                                            </Typography>

                                            <Stack justifyContent={'space-between'} style={{ width: '100%', height: '80%', display: isForgetPassword ? 'none' : isVerifyOTP ? "none" : 'flex' }}>
                                                <Stack justifyContent={'space-between'} className="textField-container">
                                                    <Typography>Email</Typography>
                                                    <TextField id="outlined-basic" placeholder="Email Address" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                                                        onChange={(e) => handleInputChange(e.target.value, "email")}
                                                    />
                                                </Stack>

                                                <Stack justifyContent={'space-between'} className="textField-container">
                                                    <Typography>Password</Typography>
                                                    <TextField id="outlined-basic" placeholder="Password" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                                                        onChange={(e) => handleInputChange(e.target.value, "password")} type='password'
                                                    />
                                                </Stack>

                                                <Typography textAlign={'right'} style={{ fontSize: '14px', color: "#F08613" ,cursor:"pointer"}} onClick={forgotPasswordHandler}>Forgot Your Password?</Typography>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: "#F08613",
                                                        color: 'white',
                                                        width: '100%',
                                                        height: "5vh",
                                                        fontSize: '12px',
                                                        "&:hover": {
                                                            backgroundColor: "#F08613",
                                                        },
                                                    }}
                                                    onClick={loginHandler}
                                                >
                                                    Sign In
                                                </Button>


                                            </Stack>

                                            {
                                                isForgetPassword && (
                                                    <Stack justifyContent={'space-between'} style={{ width: '100%', height: '80%', display: isForgetPassword ? 'hidden' : 'flex' }}>
                                                        <Stack justifyContent={'space-between'} className="textField-container">
                                                            <Typography>Email</Typography>
                                                            <TextField id="outlined-basic" placeholder="Email Address" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                                                                onChange={(e) => handleInputChange(e.target.value, "email")}
                                                            />
                                                        </Stack>

                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                backgroundColor: "#F08613",
                                                                color: 'white',
                                                                width: '100%',
                                                                height: "5vh",
                                                                fontSize: '12px',
                                                                "&:hover": {
                                                                    backgroundColor: "#F08613",
                                                                },
                                                            }}
                                                            onClick={nextHandler}
                                                        >
                                                            Next
                                                        </Button>


                                                    </Stack>
                                                )
                                            }

                                            {
                                                isVerifyOTP && (
                                                    <Stack justifyContent={'space-between'} style={{ width: '100%', height: '80%', display: isForgetPassword ? 'none' : 'flex' }}>
                                                        <Stack justifyContent={'space-between'} className="textField-container">
                                                            <Typography>OTP</Typography>
                                                            <TextField id="outlined-basic" placeholder="OTP" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                                                                onChange={(e) => handleInputChange(e.target.value, "OTP")}
                                                            />
                                                        </Stack>

                                                        <Stack justifyContent={'space-between'} className="textField-container">
                                                            <Typography>Password</Typography>
                                                            <TextField id="outlined-basic" placeholder="Password" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                                                                onChange={(e) => handleInputChange(e.target.value, "password")} type='password'
                                                            />
                                                        </Stack>

                                                        <Typography textAlign={'right'} style={{ fontSize: '14px', color: "#F08613" }}>Forgot Your Password?</Typography>
                                                        <LoadingButton
                                                            variant="contained"
                                                            sx={{
                                                                backgroundColor: "#F08613",
                                                                color: 'white',
                                                                width: '100%',
                                                                height: "5vh",
                                                                fontSize: '12px',
                                                                "&:hover": {
                                                                    backgroundColor: "#F08613",
                                                                },
                                                            }}
                                                            onClick={verifyOTPHandler}
                                                        >
                                                            Verify OTP
                                                        </LoadingButton>


                                                    </Stack>
                                                )
                                            }
                                        </Stack>
                                    </Stack>


                                </Stack>
                            </Stack>

                        </Stack>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login