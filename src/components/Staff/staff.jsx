import React, { useEffect, useState } from 'react'
import './staff.css';
import CustomTable from '../Table/table';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
const Staff = (props) => {
    const [staffs,setStaff] = useState([]);
    const staffHeader = ["Name","Designation","Email Id","Contact No."]

      const getFormattedData = (data)=>{
        let newarr = data.map((item)=>{
          return {name:item.name,designation:item.designation,email:item.email,contactNo:item.mobileNo}
        })
        setStaff(newarr);
      }

      const fetchData=async()=>{
        props.showLoader();
        await axios.get('https://collagedispbackend.onrender.com/api/auth/get-staff').then((response)=>{
          
          props.hideGlobalError();
          getFormattedData(response.data.staffs)
        }).catch(err=>{
          props.showGlobalError();
          toast.error(err?.response?.data?.error)
        }).finally(()=>{
          props.hideLoader();
        })
      }
      useEffect(()=>{
        fetchData()
      },[])

      
    return (
        <div className='staff'>
            <ToastContainer/>
            <CustomTable headers={staffHeader} data={staffs} />
        </div>
    )
}

export default Staff