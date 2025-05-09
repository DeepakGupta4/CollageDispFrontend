import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NearByModal from './NearByModal/nearByModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const NearByHospitalsManage = (props) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const [clickedData,setClickedData] = useState(null)
    const openCloseModal = () => {
        setModal(prev => !prev)
        setClickedData(null)
    }

    const fetchData = async () => {
        props.showLoader()
        await axios.get(`https://collagedispbackend.onrender.com/api/hospital/get`).then((response) => {
            setData(response.data.hospitals);
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }

    const handleClickEdit = (item)=>{

        setClickedData(item)
        setModal(true)
    }
    const filterOutData =(id)=>{
        let newArr= data.filter((item)=>item._id!==id);
        setData(newArr)
    }
    const handleDelete = async(item)=>{
        props.showLoader()
        await axios.delete(`https://collagedispbackend.onrender.com/api/hospital/delete/${item?._id}`, { withCredentials: true }).then((response) => {
            filterOutData(item?._id)
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='admin-facility'>
            <ToastContainer />
            <div className='go-back'><Link to={'/admin/dashboard'} className='go-back' ><ArrowBackIcon /> Back To Dashboard</Link></div>

            <div className='admin-facility-header'>
                <div>Near By Hospitals</div>
                <div className='add-facility-btn' onClick={openCloseModal}>Add </div>
            </div>
            <div className='admin-facility-rows'>

                {
                    data.map((item, ind) => {
                        return (
                            <div className='admin-facility-row'>
                                <div className='admin-facility-left'>
                                    <div className='admin-facility-title'>{item.name}</div>
                                    <div>{item.address}</div>
                                    <div>{item.contact}</div>
                                    <div style={{marginTop:10}}>Added By {item?.addedBy?.name}</div>

                                </div>
                                <div className='admin-facility-btns'>
                                    <div style={{cursor:"pointer"}} onClick={()=>handleClickEdit(item)}><EditIcon /></div>
                                    <div className='delete-icon' onClick={()=>handleDelete(item)}><DeleteIcon /></div>

                                </div>
                            </div>
                        );
                    })
                }
                {
                    data.length===0?<div className='admin-facility-row'>No Data Yet</div>:null
                }


            </div>
            {modal && <NearByModal clickedData={clickedData} showLoader={props.showLoader} hideLoader={props.hideLoader} showGlobalError={props.showGlobalError} hideGlobalError={props.hideGlobalError} openCloseModal={openCloseModal} />}
        </div>
    )

}

export default NearByHospitalsManage;