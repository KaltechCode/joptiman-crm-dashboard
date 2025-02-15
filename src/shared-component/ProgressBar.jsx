import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react'

const LinearProgressWithLabel=(props)=> {
    return (
      <Box sx={{display:'flex', alignItems: 'center' ,width:'100%'}}>
        <Box sx={{ width: '80%',mr:1}}>
          <LinearProgress sx={{height:'1.5vh',borderRadius:'20px'}} variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

export default LinearProgressWithLabel