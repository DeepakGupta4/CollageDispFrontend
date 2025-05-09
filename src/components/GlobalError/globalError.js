import React from 'react'
import './globalError.css';
import ErrorIcon from '@mui/icons-material/Error';
const GlobalError = () => {
  return (
    <div className='globalError'>
        <ErrorIcon sx={{ color: "yellow" }}/>
        <div>We are facing some technical issue. Please try again after sometime.</div>
    </div>
  )
}

export default GlobalError