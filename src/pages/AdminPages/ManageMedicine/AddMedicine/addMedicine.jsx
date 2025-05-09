import React, { useEffect, useState } from 'react'
import './addMedicine.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const AddMedicine = (props) => {
    const [medicine,setMedicine] = useState({name:"",quantity:"",usage:""});
    

    useEffect(()=>{
        if(props.clickedMedicine){
            setMedicine({name:props.clickedMedicine.name,quantity:props.clickedMedicine.quantity,usage:props.clickedMedicine.usage})
        }
    },[])
    const handleOnChange=(event,key)=>{
        setMedicine({...medicine,[key]:event.target.value})
    }
    const handleSubmitForm = (e)=>{
        e.preventDefault();
    }
    const handleAddMedicine =async ()=>{
        if(medicine.name.trim().length===0 || !medicine.quantity || medicine.usage.trim().length===0){
            return toast.error("Please enter all fields")
        }
        props.showLoader();
        await axios.post("https://collagedispbackend.onrender.com/api/medicine/add",medicine,{withCredentials:true}).then((response)=>{
            toast.success("Added Successfully");
            // console.log(response.data.medicine)
            window.location.reload();
        }).catch(err=>{
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })
        
    }

    const handleCloseModal = ()=>{
        props.setClickedMedicineEmpty();
        props.openCloseModal();
    }

    const handleUpdateMedicine =async()=>{
        if(medicine.name.trim().length===0 || !medicine.quantity || medicine.usage.trim().length===0){
            return toast.error("Please enter all fields")
        }
        props.showLoader();
        await axios.put(`https://collagedispbackend.onrender.com/api/medicine/update/${props.clickedMedicine?._id}`,medicine,{withCredentials:true}).then((response)=>{
            toast.success("Updated Successfully");
            window.location.reload();
        }).catch(err=>{
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })
    }
    return (
        <div className='add-medicine'>
            <ToastContainer/>
            <div className='add-medicine-card'>
                <div className='add-medicine-header'>
                    <div>Add Medicine</div>
                    <div className='close-modal-report' onClick={handleCloseModal}><CloseIcon /></div>
                </div>
                <div className='add-medicine-form'>
                    <form className='register-form' onSubmit={handleSubmitForm}>
                        <div className='register-form-div'>
                            <div className='register-input-box'>
                                <input type='text' className='input-box-register' value={medicine.name} onChange={(event)=>{handleOnChange(event,"name")}} placeholder='Medicine Name' />
                            </div>
                            <div className='register-input-box'>
                                <input type='number' className='input-box-register' value={medicine.quantity} onChange={(event)=>{handleOnChange(event,"quantity")}} placeholder='Quantity' />
                            </div>
                            <div className='register-input-box'>
                                <input type='text' className='input-box-register' value={medicine.usage} onChange={(event)=>{handleOnChange(event,"usage")}} placeholder='Usage' />
                            </div>
                            
                            
                        </div>
                        {props.clickedMedicine?<button type='submit' className='form-btn reg-btn' onClick={handleUpdateMedicine}>Update</button>:<button type='submit' className='form-btn reg-btn' onClick={handleAddMedicine}>Add</button>}
                        

                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMedicine