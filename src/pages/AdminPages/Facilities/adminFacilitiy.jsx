import React, { useEffect, useState } from 'react';
import './adminFacility.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddFacility from './AddFacilityModal/addFacility';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminFacilitiy = (props) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const [clickedData,setClickedData]=useState(null)


    const fetchData = async () => {
        props.showLoader()
        await axios.get("https://collagedispbackend.onrender.com/api/facility/get", { withCredentials: true }).then((response) => {
            if (response.data.facility.length === 0) {
                setData([]);
                return toast.error("No any Facilities added yet.");
            }
            setData(response.data.facility);
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    const openCloseModal = () => {
        setClickedData(null)
        setModal(prev => !prev)
    }
    const onClickEdit = (item)=>{
        setModal(true);
        setClickedData(item)
    }

    const filterOutData =(id)=>{
        let newArr= data.filter((item)=>item._id!==id);
        setData(newArr)
    }
    const handleDelete = async(item)=>{
        props.showLoader()
        await axios.delete(`https://collagedispbackend.onrender.com/api/facility/delete/${item?._id}`, { withCredentials: true }).then((response) => {
            filterOutData(item?._id)
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }
    return (
        <div className='admin-facility'>
            <ToastContainer />
            <div className='go-back'><Link to={'/admin/dashboard'} className='go-back' ><ArrowBackIcon /> Back To Dashboard</Link></div>

            <div className='admin-facility-header'>
                <div>Facilities</div>
                <div className='add-facility-btn' onClick={openCloseModal}>Add </div>
            </div>
            <div className='admin-facility-rows'>

                {
                    data.map((item, index) => {
                        return (
                            <div className='admin-facility-row' key={index}>
                                <div className='admin-facility-left'>
                                    <div className='admin-facility-title'>{item.title}</div>
                                    <div>{item.description}</div>
                                    <div style={{marginTop:"10px"}}>Added By : {item?.addedBy?.name}</div>
                                </div>
                                <div className='admin-facility-btns'>
                                    <div style={{cursor:"pointer"}} onClick={()=>onClickEdit(item)}><EditIcon /></div>
                                    <div className='delete-icon' onClick={()=>handleDelete(item)}><DeleteIcon /></div>

                                </div>
                            </div>
                        );
                    })
                }

                {
                    data.length===0?<div className='admin-facility-row'> No any data yet</div>:null
                }


            </div>
            {modal && <AddFacility clickedData={clickedData} showLoader={props.showLoader} hideLoader={props.hideLoader} showGlobalError={props.showGlobalError} hideGlobalError={props.hideGlobalError} openCloseModal={openCloseModal} />}
        </div>
    )
}

export default AdminFacilitiy;