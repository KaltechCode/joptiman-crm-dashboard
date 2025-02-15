import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedLogin = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
        return navigate('/dashboard');
    }

    useEffect(() => {
        checkUserToken();
    }, []);


    return (
        <React.Fragment>
            {
                !isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedLogin;