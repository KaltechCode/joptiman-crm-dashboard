// import React, { useRef } from 'react'
// import PageLoader from '../../Layout/FullPageLoader/FullPageLoader';
// import Header from '../../Layout/Header';
// import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar';
// import { Stack, Typography } from '@mui/material';
// import SideBar from '../../Layout/Sidebar';
// import './style.scss'


// const Tutorial = () => {
//     const snackbar_Ref = useRef()
//     return (
//         <>
//             <PageLoader />
//             <Header />

//             <div style={{ marginTop: '56px' }}>
//                 <div
//                     style={{
//                         display: 'flex',
//                         height: '92vh',
//                         overflowY: 'hidden',
//                     }}
//                 >
//                     <SideBar />
//                     <CustomizedSnackbars ref={snackbar_Ref} />
//                     <Stack className="tutorials-container">
//                         <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Tutorials</Typography>
//                         <Stack className='tutorials-inner-container'>
//                             <div style={{ position: "relative", paddingBottom: "56.25%", height: "0" }}><iframe src="https://www.loom.com/embed/98a43d1c8a524b3ca966d84e0b80f892?sid=c7fbdf33-2cfc-455a-ad87-63b8dd9cb3d2" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen
//                                 style={{
//                                     position: "absolute",
//                                     top: "0",
//                                     left: "0",
//                                     width: "30%",
//                                     height: "40%"
//                                 }}
//                             ></iframe></div>

//                             <div style={{ position: "relative", paddingBottom: "44.583333333333336%", height: "0" }}><iframe src="https://www.loom.com/embed/2c5b1f44f8c74949b18e8409daddc19d?sid=48b0c6c4-aa85-4c90-83ba-11d27eeb436e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{ position: "absolute", top: "0", left: "0", width: "30%", height: '40%' }}></iframe></div>

//                             {/* Understanding Your Dashboard Metrics */}
//                             <div style={{position: "relative", paddingBottom: "56.25%", height: "0"}}><iframe src="https://www.loom.com/embed/6761d3a326fa4811848f9d0d442ed956?sid=2a080f25-5a2e-4bbc-9adc-7772acef0d7e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}></iframe></div>

//                             {/* How to Obtain Necessary Licenses */}
//                             <div style={{position: "relative", paddingBottom: "56.25%", height: "0"}}><iframe src="https://www.loom.com/embed/7ab2ae3a0eee4e4fae71cc3b90bacb8d?sid=291c62f6-9438-4227-8564-51616edfde56" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}></iframe></div>
//                         </Stack>
//                     </Stack>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Tutorial



import React, { useRef } from 'react';
import PageLoader from '../../Layout/FullPageLoader/FullPageLoader';
import Header from '../../Layout/Header';
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar';
import { Stack, Typography } from '@mui/material';
import SideBar from '../../Layout/Sidebar';
import './style.scss';

const Tutorial = () => {
    const snackbar_Ref = useRef();

    return (
        <>
            <PageLoader />
            <Header />

            <div style={{ marginTop: '56px' }}>
                <div
                    style={{
                        display: 'flex',
                        height: '92vh',
                        overflowY: 'hidden',
                    }}
                >
                    <SideBar />
                    <CustomizedSnackbars ref={snackbar_Ref} />
                    <Stack className="tutorials-container">
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            Tutorials
                        </Typography>
                        <Stack className="tutorials-inner-container" direction="row" gap={4}>
                            <Stack className='video-container'>
                                <Typography className="video-title">Understanding the Recruitment Process:</Typography>
                                <div style={{ position: 'relative', paddingBottom: '30%', height: '100%', width: '100%' }}>
                                    <iframe
                                        src="https://www.loom.com/embed/98a43d1c8a524b3ca966d84e0b80f892?sid=c7fbdf33-2cfc-455a-ad87-63b8dd9cb3d2"
                                        frameBorder="0"
                                        allowFullScreen
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    ></iframe>
                                </div>
                            </Stack>

                            <Stack className='video-container'>
                                <Typography className="video-title">How to Submit a Policy Tutorial</Typography>

                                <div style={{ position: 'relative', paddingBottom: '30%', height: '100%', width: '100%' }}>
                                    <iframe
                                        src="https://www.loom.com/embed/2c5b1f44f8c74949b18e8409daddc19d?sid=48b0c6c4-aa85-4c90-83ba-11d27eeb436e"
                                        frameBorder="0"
                                        allowFullScreen
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    ></iframe>
                                </div>
                            </Stack>

                            <Stack className='video-container'>
                                <Typography className="video-title">Understanding Your Dashboard Metrics                                </Typography>
                            <div style={{ position: 'relative', paddingBottom: '30%', height: '100%', width: '100%' }}>
                                <iframe
                                    src="https://www.loom.com/embed/6761d3a326fa4811848f9d0d442ed956?sid=2a080f25-5a2e-4bbc-9adc-7772acef0d7e"
                                    frameBorder="0"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                ></iframe>
                            </div>
                            </Stack>

                            <Stack className='video-container'>
                                <Typography className="video-title">How to Obtain Necessary Licenses
                                </Typography>
                            <div style={{ position: 'relative', paddingBottom: '30%', height: '100%', width: '100%' }}>
                                <iframe
                                    src="https://www.loom.com/embed/7ab2ae3a0eee4e4fae71cc3b90bacb8d?sid=291c62f6-9438-4227-8564-51616edfde56"
                                    frameBorder="0"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                ></iframe>
                            </div>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default Tutorial;
