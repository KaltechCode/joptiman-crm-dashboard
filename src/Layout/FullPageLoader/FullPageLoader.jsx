import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const PageLoader = () => {

    const ShowLoader = useSelector((state) => state.mainSlice.showLoader);

    return (
        <>
            {ShowLoader && <div style={{ position: "absolute", height: "100vh", width: "100vw", zIndex: "9999", backgroundColor: "#f4f4f48a", bottom: 0 , display:'flex', alignItems:'center',justifyContent:'center' }} className="align-items-center flex fullpage-loader justify-content-center">
                <ThreeCircles
                    height="60"
                    width="60"
                    color="#2054D9"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor="#003478"
                    innerCircleColor="#F08613"
                    middleCircleColor="#003478"
                />
            </div>}
        </>
    )
}

export default PageLoader;
