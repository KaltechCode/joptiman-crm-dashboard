import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showSideBar } from '../../../Store/mainSlice'
import { List } from 'phosphor-react'
import { Stack } from '@mui/material'

const ToggleSidebar = () => {
    const dispatch = useDispatch()
    const showSidebar = useSelector((state)=>state.mainSlice.showSideBar)

    const toggleSideBarHandler = async () => {
        console.log('clicked')
        dispatch(showSideBar(!showSidebar))
    }

    return (
        <Stack sx={{
            // display: 'none',
            '@media (max-width: 1024px)': {
                display: 'flex',
            },
        }}>
            <List size={32} onClick={toggleSideBarHandler}  />
        </Stack>
    )
}

export default ToggleSidebar