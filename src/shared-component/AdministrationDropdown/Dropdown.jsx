import { Box, Button, Stack, Typography } from '@mui/material'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import React, { useEffect, useState } from 'react'
import './style.scss'

const Dropdown = (props) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const options = props.options
    const handleClick = () => {
        console.log("options", options);
        setMenuOpen(!menuOpen)
    }

    function openPDFInNewTab(pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank';
        link.click();
    }



    useEffect(() => {
        console.log("options", options);
    }, [])
    return (
        <>
            <Button
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                    backgroundColor: "#003478",
                    color: "white",
                    height: "36px",
                    width: "267px",
                    fontSize: "12px",
                    padding: "3px",
                    marginTop: '4px',
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
            {
                menuOpen && (
                    <Stack
                        className='options-container'
                    >
                        {
                            options?.map((option) => {
                                return (
                                    <Stack className='options'>
                                        {
                                            props.isEmail ? (
                                                <a href="mailto:admin@joptimanconsultancy.com" style={{ textDecoration: 'none', color: 'black' }}>
                                                    <Typography sx={{ textAlign: 'center', fontSize: '14px', cursor: "pointer" }}>
                                                        {option.name}
                                                    </Typography>
                                                </a>
                                            )
                                                : (
                                                    <Typography sx={{ textAlign: 'center', fontSize: '14px', cursor: "pointer" }}
                                                        onClick={(e) => {
                                                            if (option.url) { // Check if URL is not empty
                                                                openPDFInNewTab(option.url);
                                                                e.stopPropagation();
                                                            }
                                                        }}
                                                    >
                                                        {option.name}
                                                    </Typography>
                                                )
                                        }
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                )
            }
        </>

    )
}

export default Dropdown