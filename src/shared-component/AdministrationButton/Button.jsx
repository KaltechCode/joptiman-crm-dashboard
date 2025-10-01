import { Button } from '@mui/material'
import React from 'react'

const AdministrationButton = (props) => {
  return (
    <Button
    aria-controls="dropdown-menu"
    aria-haspopup="true"
    // onClick={handleClick}
    sx={{
        backgroundColor: "#0c0544",
        color: "white",
        height: "36px",
        width: "267px",
        fontSize: "12px",
        padding: "3px",
        marginTop:'4px',
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
        border: props.title === 'Previous Years' ? "2px solid #EDEDED" : "",
        "@media screen and (max-width:899px)": {
            width: "168px",
            // border: "2px solid red",
        },
        "&:hover": {
            backgroundColor: '#003478',
        },
    }}
>
    {props.title}
</Button>
  )
}

export default AdministrationButton