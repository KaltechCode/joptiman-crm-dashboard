import React from 'react'
import CRMDropdown from '../../shared-component/CRM-Dropdown/index'
import { Button, Stack } from '@mui/material'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import './style.scss'
import { useNavigate } from 'react-router-dom';


const CarriersItems = (props) => {
    return (
        <Stack className='carrier-items' sx={{ width: '27%', height: '24vh' }}>
            <img src={props.carrierPic} style={{ height: '15vh' }} />
            <div className='CarrierItemDropdown'>
                <Button
                    aria-controls="dropdown-menu"
                    aria-haspopup="true"
                    endIcon={<ArrowDropDownIcon />}
                    className='carrier-button'
                    sx={{
                        display: props.url ? 'flex' : 'none',
                        backgroundColor: '#003478',
                        color: "white",
                        height: "39px",
                        width: "300px",
                        fontSize: "12px",
                        padding: "3px",
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",

                        "&:hover": {
                            backgroundColor: '#003478'
                        },
                    }}
                >
                    <a href={props.url} target='_blank' className='carrier-link'>Portal Access</a>
                </Button>
            </div>

        </Stack>
    )
}

export default CarriersItems