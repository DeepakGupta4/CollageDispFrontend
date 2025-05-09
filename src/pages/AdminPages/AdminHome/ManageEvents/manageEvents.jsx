import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';

const ManageEvents = (props) => {
    const [title, setTitle] = useState("");
    const [events, setEvents] = useState([])

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        if (title.trim().length === 0) return toast.error("Please Enter Title");
        props.showLoader()
        await axios.post("https://collagedispbackend.onrender.com/api/notification/add",{title},{withCredentials:true}).then((response) => {
            setEvents([response.data.notification,...events]);
            setTitle("")
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader()
        })
    }
    const fetchEvents = async () => {
        props.showLoader()
        await axios.get("https://collagedispbackend.onrender.com/api/notification/get").then((response) => {
            setEvents(response.data.notifications);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader()
        })
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const deleteEvent = async(id)=>{
        props.showLoader()
        await axios.delete(`https://collagedispbackend.onrender.com/api/notification/delete/${id}`,{withCredentials:true}).then((response) => {
            let arr = events.filter((item)=>item._id!==id);
            setEvents(arr)
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader()
        })
    }

    
    return (
        <div className='manage-staffs-modal'>
            <ToastContainer/>
            <div className='manage-staffs-card'>
                <div className='add-medicine-header'>
                    <div>Manage Events</div>
                    <div className='close-modal-report' onClick={() => props.openCloseModal("event")}><CloseIcon /></div>
                </div>
                <div className='add-staffs-box'>
                    <form className='register-form' onSubmit={handleSubmitForm}>
                        <div className=''>
                            <div className='register-input-box'>
                                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='input-box-register' style={{ width: "100%" }} placeholder='Event' />
                            </div>


                        </div>
                        <button type='submit' className='form-btn reg-btn'>Add</button>


                    </form>
                </div>

                <div className='list-staffs'>
                    {
                        events.map((item, index) => {
                            return (
                                <div className='list-staff' key={index}>
                                    <div>{item.title.slice(0,60)}... </div>
                                    <div className='list-staff-btns'>
                                        <div className='delete-icon' onClick={()=>{deleteEvent(item._id)}}><DeleteIcon /></div>
                                    </div>
                                </div>
                            );
                        })
                    }

                    {
                        events.length===0?<div className='list-staff'>No any events yet</div>:null
                    }


                </div>
            </div>
        </div>
    )
}

export default ManageEvents