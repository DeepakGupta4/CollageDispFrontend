import React, { useEffect, useState } from 'react';
import './nearByHospitals.css';
import CustomTable from '../Table/table';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const NearByHospitals = (props) => {
  const [hospitalData, setHospitalData] = useState([]);

  const getFormattedData = (data)=>{
    let newarr = data.map((item,ind)=>{
      return {srNo:ind+1,name:item.name,address:item.address,contact:item.contact}
    })
    setHospitalData(newarr);
  } 

  const fetchData = async()=>{
    props.showLoader();
    axios.get("https://collagedispbackend.onrender.com/api/hospital/get").then((response) => {
      if (response.data.hospitals.length === 0) return toast.error("No any hospitals added yet.");
      
      getFormattedData(response.data.hospitals);
      props.hideGlobalError();
    }).catch(err => {
      toast.error(err?.response?.data?.error)      
      props.showGlobalError();
    }).finally(() => {
      props.hideLoader();
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const hosptalheaders = ["Sn No.", "Name", "Address", "Contact"]

  return (
    <div className='nearByHospital'>
      <ToastContainer />
      <CustomTable headers={hosptalheaders} data={hospitalData} />

    </div>
  )
}

export default NearByHospitals