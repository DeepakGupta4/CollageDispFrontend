import React, { useEffect, useState } from 'react'
import './addFacility.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const AddFacility = (props) => {
    const [inputField, setInputField] = useState({ title: "", description: "" });
    const handleOnChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value });
    }
    

    const fetchDetails = async () => {
        setInputField({...inputField,...props.clickedData});
    }
    useEffect(() => {
        if(props.clickedData){

            fetchDetails();
        }
    }, [])

    const updateData = async()=>{
        props.showLoader()
        await axios.put(`https://collagedispbackend.onrender.com/api/facility/update/${props.clickedData?._id}`, inputField, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            window.location.reload();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if(props.clickedData){
            updateData();
            return;
        }
        props.showLoader()
        await axios.post("https://collagedispbackend.onrender.com/api/facility/add", inputField, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            window.location.reload();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }
    return (
        <div className='add-facility'>
            <ToastContainer/>
            <div className='add-facility-card'>
                <div className='add-medicine-header'>
                    <div>Add Facility</div>
                    <div className='close-modal-report' onClick={() => props.openCloseModal()}><CloseIcon /></div>
                </div>

                <div className='add-facility-form'>
                    <form className='register-form' onSubmit={handleSubmitForm}>
                        <div className=''>
                            <div className='register-input-box'>
                                <input type='text' value={inputField.title} onChange={(event) => handleOnChange(event, "title")} className='input-box-register' placeholder='Title' />
                            </div>
                            <br />
                            <div className='register-input-box'>
                                <textarea cols={450} value={inputField.description} onChange={(event) => handleOnChange(event, "description")} rows={10} type='text' className='input-box-register' placeholder='Add Description' />
                            </div>


                        </div>
                        {
                            props.clickedData?<button type='submit' className='form-btn reg-btn'>Update</button>:<button type='submit' className='form-btn reg-btn'>Add</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFacility