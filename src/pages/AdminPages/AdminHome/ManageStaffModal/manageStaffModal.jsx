import React, { useEffect, useState } from 'react'
import './manageStaffModal.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const ManageStaffModal = (props) => {
    const [staff, setStaff] = useState([]);
    const [inputField, setInputField] = useState({ name: "", email: "", password: "", designation: "", mobileNo: "" })
    const [clickedStaff, setClickedStaff] = useState(null);
    const handleOnChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value })
    }

    const updateStaff = () => {
        axios.put(`https://collagedispbackend.onrender.com/api/auth/update-staff/${clickedStaff?._id}`, inputField, { withCredentials: true }).then((response) => {
            window.location.reload();
            setInputField({ name: "", email: "", password: "", designation: "", mobileNo: "" })
            setClickedStaff(null)
        }).catch(err => {
            toast.error(err?.response?.data?.error)

        }).finally(() => {
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (clickedStaff) {
            updateStaff();
            return;
        }
        if (inputField.name.trim().length === 0 || inputField.email.trim().length === 0 || inputField.password.trim().length === 0 || inputField.designation.trim().length === 0 || inputField.mobileNo.trim().length === 0) return toast.error("Please fill all the details.");
        props.showLoader()
        await axios.post("https://collagedispbackend.onrender.com/api/auth/add-staff", inputField, { withCredentials: true }).then((response) => {
            toast.success(response.data.message);
            setInputField({ name: "", email: "", password: "", designation: "", mobileNo: "" })
            setStaff([response.data.user, ...staff])
        }).catch(err => {
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })

    }

    const fetchData = async () => {
        props.showLoader();
        await axios.get('https://collagedispbackend.onrender.com/api/auth/get-staff').then((response) => {

            setStaff(response.data.staffs)
        }).catch(err => {
            toast.error(err?.response?.data?.error)
        }).finally(() => {
            props.hideLoader();
        })
    }
    const filterOutData = (id) => {
        let newArr = staff.filter((item) => item?._id !== id);
        setStaff(newArr)
    }
    const deleteStaff = async (id) => {
        props.showLoader()
        await axios.delete(`https://collagedispbackend.onrender.com/api/auth/delete-staff/${id}`, { withCredentials: true }).then((response) => {
            filterOutData(id)
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }

    const handleEditStaff = (item) => {
        setClickedStaff(item);
        setInputField({ ...inputField, ...item })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='manage-staffs-modal'>
            <ToastContainer />
            <div className='manage-staffs-card'>
                <div className='add-medicine-header'>
                    <div>Manage Staffs</div>
                    <div className='close-modal-report' onClick={() => props.openCloseModal("staff")}><CloseIcon /></div>
                </div>
                <div className='add-staffs-box'>
                    <form className='register-form' onSubmit={handleSubmitForm}>
                        <div className='register-form-div'>
                            <div className='register-input-box'>
                                <input type='text' value={inputField.name} onChange={(event) => handleOnChange(event, "name")} className='input-box-register' placeholder='Staff Name' />
                            </div>
                            {
                                clickedStaff ? null : <div className='register-input-box'>
                                    <input type='email' value={inputField.email} onChange={(event) => handleOnChange(event, "email")} className='input-box-register' placeholder='Email Id' />
                                </div>
                            }
                            {
                                clickedStaff ? null : <div className='register-input-box'>
                                    <input type='password' value={inputField.password} onChange={(event) => handleOnChange(event, "password")} className='input-box-register' placeholder='Password' />
                                </div>
                            }
                            <div className='register-input-box'>
                                <input type='text' value={inputField.designation} onChange={(event) => handleOnChange(event, "designation")} className='input-box-register' placeholder='Designation' />
                            </div>
                            <div className='register-input-box'>
                                <input type='text' value={inputField.mobileNo} onChange={(event) => handleOnChange(event, "mobileNo")} className='input-box-register' placeholder='Mobile No.' />
                            </div>

                        </div>
                        {
                            clickedStaff ? <button type='submit' className='form-btn reg-btn'>Update</button> : <button type='submit' className='form-btn reg-btn'>Add</button>
                        }


                    </form>
                </div>

                <div className='list-staffs'>
                    {
                        staff.map((item, index) => {
                            return (
                                <div className='list-staff' key={index}>
                                    <div>{item.name}</div>
                                    <div className='list-staff-btns'>
                                        <div className='edit-icon' onClick={() => handleEditStaff(item)}><EditIcon /></div>
                                        <div className='delete-icon' onClick={() => { deleteStaff(item._id) }}><DeleteIcon /></div>
                                    </div>
                                </div>

                            );
                        })
                    }
                    {staff.length === 0 ? <div>No any staffs added yet.</div> : null}


                </div>
            </div>
        </div>
    )
}

export default ManageStaffModal;