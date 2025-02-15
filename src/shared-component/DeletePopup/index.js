import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import './style.scss'
import httpClient from '../../_util/api';
import CustomizedSnackbars from '../Snackbar/SnackBar';
import { hideLoader, showLoader } from '../../Store/mainSlice';
import { useRef } from 'react';

export default function DeletePopup(props) {
    const id = props.id
    const stdId = props.stdId
    const role = localStorage.getItem('role')
    const open = useSelector((state) => state.approvePopupOpen)
    const snackbar_Ref = useRef()
    const dispatch = useDispatch()
    const [scroll, setScroll] = React.useState('paper');
    const [selectedAgentIds, setSelectedAgentIds] = React.useState([]);


    const handleClose = () => {
        props.onClose()
    };


    const actionHandler = async (title) => {
        const agentIdsString = props.selectedAgentIds.join(',');
        if (title == 'Delete') {
            dispatch(showLoader())
            const res = await httpClient.delete(`/agents/deleteAgent/${agentIdsString}`).catch((error) => {
                dispatch(hideLoader())
                console.log("error: ", error)
                snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
            })

            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle")
                props.onDelete([])
                // setSelectedAgentIds([])
                handleClose()

            }
        }
        else{
            dispatch(showLoader())
            const res = await httpClient.post(`/agents/deactivateAgent/${agentIdsString}`).catch((error) => {
                dispatch(hideLoader())
                console.log("error: ", error)
                snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
            })

            if (res?.status === 200) {
                dispatch(hideLoader())
                snackbar_Ref.current.showMessage("success", res?.message, "", "i-chk-circle")
                setSelectedAgentIds([])
                handleClose()
            }

        }

    }


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <React.Fragment>
            <CustomizedSnackbars ref={snackbar_Ref} />
            {
                <Dialog
                    open={props.open}
                    onClose={handleClose}
                // sx={{width:'50%',border:'2px solid black'}}
                >
                    <DialogTitle id="scroll-dialog-title"><Typography variant='h5' sx={{ fontWeight: 'bold' }}>Confirmation!!</Typography></DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <Stack>
                            <Typography sx={{ textAlign: 'center' }}>{props.message}</Typography>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ width: '100%' }}>
                            <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '50%' }}>
                                {props.buttons.map((button) => {
                                    return (
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: button.color,
                                                color: 'white',
                                                width: '92px',
                                                height: "5vh",
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                "&:hover": {
                                                    backgroundColor: button.color,
                                                },
                                            }}
                                            onClick={() => actionHandler(button.title)}
                                        >
                                            {button.title}
                                        </Button>
                                    )
                                })

                                }

                            </Stack>

                        </Stack>
                    </DialogActions>
                </Dialog>
            }
        </React.Fragment>
    );
}