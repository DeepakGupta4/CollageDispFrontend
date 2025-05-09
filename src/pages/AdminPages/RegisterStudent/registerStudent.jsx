import React, { useState } from 'react'
import './registerStudent.css'
import SearchBox from '../../../components/SearchBox/searchBox'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportModal from '../../../components/Report/reportModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const RegisterStudent = (props) => {
    const [searchStudent, setSearchStudent] = useState("");
    const [reportModal, setReportModal] = useState(false)
    const [studentDetail, setStudentDetail] = useState({ _id: "",email:"" ,name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" });
    const handleOnChange = (event, key) => {
        setStudentDetail({ ...studentDetail, [key]: event.target.value })
    }
    const handleCloseModal = () => {

        setReportModal(prev => !prev)
    }
    const onChangeHandle = (value) => {
        setSearchStudent(value)
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    const updateStudent = async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || studentDetail.roll.trim().length===0 || studentDetail.mobileNo.trim().length===0) return toast.error("Name, Mobile No and Roll cant be empty");
        props.showLoader()
        const {_id,updatedAt,...student} = {...studentDetail}
        
        await axios.put(`https://collagedispbackend.onrender.com/api/auth/update-student/${studentDetail?._id}`, student,{ withCredentials: true }).then((response) => {
            props.hideGlobalError();
            toast.success(response.data.message);
            

        }).catch(err => {
            // setStudentDetail({ _id: "", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" })
            toast.error(err?.response?.data?.error);
            console.log(err)

        }).finally(() => {
            props.hideLoader()
        })
    }

    const handleOnClickSearchBtn = async () => {
        if (searchStudent.trim().length === 0) return toast.error("Please enter correct roll number.")
        props.showLoader()
        await axios.get(`https://collagedispbackend.onrender.com/api/auth/get-student-by-roll/${searchStudent}`, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            toast.success(response.data.message);
            setStudentDetail({
                ...studentDetail, ...response.data.student
                // _id: response.data.student._id,
                // name: response.data.student.name, roll: response.data.student.roll, mobileNo: response.data.student.mobileNo, fatherName: response.data.student.fatherName, fatherMobile: response.data.student.fatherMobile, address: response.data.student.address, previous_health: response.data.student.health, age: response.data.student.age, bloodGroup: response.data.student.bloodGroup
            })

        }).catch(err => {
            setStudentDetail({ _id: "",email:"", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" })
            toast.error(err?.response?.data?.error);

        }).finally(() => {
            props.hideLoader()
        })
    }

    const handleRegister=async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || studentDetail.roll.trim().length===0 || studentDetail.mobileNo.trim().length===0) return toast.error("Name, Mobile No and Roll cant be empty");
        props.showLoader();
        await axios.post(`https://collagedispbackend.onrender.com/api/auth/registerStudentByStaff`,studentDetail, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            toast.success(response.data.message);
        
            // setStudentDetail({ _id: "",email:"", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" })

        }).catch(err => {
            console.log(err)
            setStudentDetail({ _id: "",email:"", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" })
            toast.error(err?.response?.data?.error);

        }).finally(() => {
            props.hideLoader()
        })
    }
    return (
        <div className='register-student'>
            <ToastContainer />
            <div className='go-back'><Link to={'/admin/dashboard'} className='go-back' ><ArrowBackIcon /> Back To Dashboard</Link></div>
            <SearchBox onClickButton={handleOnClickSearchBtn} placeholder={"Search By Roll No"} value={searchStudent} onChangeHandle={onChangeHandle} />

            <div className='register-form-block'>
                <div className='register-form-header'>Register Student</div>
                <form className='register-form' onSubmit={handleSubmitForm}>
                    <div className='register-form-div'>
                        <div className='register-input-box'>
                            <input value={studentDetail.name} onChange={(event) => { handleOnChange(event, "name") }} type='text' className='input-box-register' placeholder='Student Name' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.email} disabled={studentDetail._id?true:false} onChange={(event) => { handleOnChange(event, "email") }} type='text' className='input-box-register' placeholder='Enter email' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.roll} onChange={(event) => { handleOnChange(event, "roll") }} type='text' className='input-box-register' placeholder='Roll No.' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.mobileNo} onChange={(event) => { handleOnChange(event, "mobileNo") }} type='text' className='input-box-register' placeholder='Mobile No.' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.fatherName} onChange={(event) => { handleOnChange(event, "fatherName") }} type='text' className='input-box-register' placeholder='Fathers Name' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.fatherMobile} onChange={(event) => { handleOnChange(event, "fatherMobile") }} type='text' className='input-box-register' placeholder='Fathers Mobile No.' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.address} onChange={(event) => { handleOnChange(event, "address") }} type='text' className='input-box-register' placeholder='Address' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.previous_health} onChange={(event) => { handleOnChange(event, "previous_health") }} type='text' className='input-box-register' placeholder='Previous Health Issues' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.age} onChange={(event) => { handleOnChange(event, "age") }} type='text' className='input-box-register' placeholder='Age' />
                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.bloodGroup} onChange={(event) => { handleOnChange(event, "bloodGroup") }} type='text' className='input-box-register' placeholder='Blood Group' />
                        </div>
                        
                    </div>


                    {
                        studentDetail._id ? <div className='block-divs'>
                            <button type='submit' className='form-btn reg-btn' onClick={updateStudent}>Update</button>
                            <button type='submit' className='form-btn reg-btn' onClick={handleCloseModal}>Report</button>
                        </div> : <button type='submit' className='form-btn reg-btn' onClick={handleRegister}>Register</button>
                    }
                </form>
            </div>
            {reportModal && <ReportModal handleCloseModal={handleCloseModal} studentDetail={studentDetail} showLoader={props.showLoader} hideLoader={props.hideLoader} />}
        </div>
    )
}

export default RegisterStudent