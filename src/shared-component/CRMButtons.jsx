import { Button } from '@mui/material'
import React from 'react'

const CRMButtons = (props) => {
  return (
    <Button sx={{width:'100%',backgroundColor: props.title === "Agents Matrix" ? "#003478" :'#F08613',color:'white'
      ,'&:hover':{
        backgroundColor: props.title === "Agents Matrix" ? "#003478" :'#F08613',
      }
    }}>{props.title}</Button>
  )
}

export default CRMButtons