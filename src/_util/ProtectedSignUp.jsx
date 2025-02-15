import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideMobileBar } from "../redux/sidebarSlice";


const ProtectedSignUp = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();


    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate(`/signup/${id}`);
        }
        setIsLoggedIn(true);
        return navigate('/receiving/upload-rma/list');
    }

    useEffect(() => { dispatch(hideMobileBar()); });

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

export default ProtectedSignUp;