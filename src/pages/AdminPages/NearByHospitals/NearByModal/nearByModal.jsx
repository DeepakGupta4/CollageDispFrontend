import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const NearByModal = (props) => {

    const [inputField,setInputField] = useState({name:"",address:"",contact:""});

    const handleOnChange = (event,key)=>{
        setInputField({...inputField,[key]:event.target.value})
    }

    const updateHospital = async()=>{
        props.showLoader()
        await axios.put(`https://collagedispbackend.onrender.com/api/hospital/update/${props.clickedData?._id}`, inputField, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            window.location.reload();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }
    const handleSubmitForm = async(e) => {
        e.preventDefault();

        if(props.clickedData){
            updateHospital()
            return;
        }
        if(inputField.name.trim().length===0 || inputField.address.trim().length===0 || inputField.contact.trim().length===0) return toast.error("Enter all the fields")
        props.showLoader()
        await axios.post("https://collagedispbackend.onrender.com/api/hospital/add", inputField, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            window.location.reload();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }

    const fetchDetais = () =>{
        setInputField({...inputField,...props.clickedData})
    }

    useEffect(()=>{
        if(props.clickedData){
            fetchDetais()
        }
    },[])
    return (
        <div className='add-facility'>
            <ToastContainer/>
            <div className='add-facility-card'>
                <div className='add-medicine-header'>
                    <div>Add Hospitals</div>
                    <div className='close-modal-report' onClick={() => props.openCloseModal()}><CloseIcon /></div>
                </div>

                <div className='add-facility-form'>
                    <form className='register-form' onSubmit={handleSubmitForm}>
                        <div className='register-form-div'>
                            <div className='register-input-box'>
                                <input type='text' className='input-box-register' value={inputField.name} onChange={(event)=>handleOnChange(event,"name")} placeholder='Name' />
                            </div>
                            <div className='register-input-box'>
                                <input type='text' className='input-box-register' value={inputField.address} onChange={(event)=>handleOnChange(event,"address")} placeholder='Address' />
                            </div>
                            
                            <div className='register-input-box'>
                                <input type='text' className='input-box-register' value={inputField.contact} onChange={(event)=>handleOnChange(event,"contact")} placeholder='Contacts' />
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

export default NearByModal