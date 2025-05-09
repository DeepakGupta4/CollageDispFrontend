import React, { useState } from 'react';
import './forgotModal.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
const ForgotModal = (props) => {

    const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" })
    const [buttonText, setButtonText] = useState("Send OTP.")
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("")


    const handleOnChange = (event, key) => {
        setInputField({ ...inputField, [key]: event.target.value })
    }

    const handleCloseModal = () => {
        props.closeModal();
    }

    const sendOTPToMail = async () => {
        if (inputField.email.trim().length === 0) return toast.error("Please Enter Email")
        props.showLoader()
        let toastId = "";
        await axios.post(`https://collagedispbackend.onrender.com/api/auth/send-otp`, { email: inputField.email }).then((response) => {
            console.log(response.data)
            setStep(2);
            setErrorMessage("")
            setButtonText("Enter the OTP")
            alert(response.data.message)
        }).catch(err => {
            alert(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
            
        })
    }

    const checkOtp = async () => {
        if (inputField.otp.trim().length === 0) return toast.error("Please Enter OTP")
        props.showLoader()
        await axios.post(`https://collagedispbackend.onrender.com/api/auth/check-otp`, { email: inputField.email, otp: inputField.otp }).then((response) => {
            console.log(response.data)
            setStep(3);
            setErrorMessage("")
            setButtonText("Update New Password")
            alert(response.data.message)
        }).catch(err => {
            alert(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
            
        })
    }

    const resetPassword = async()=>{
        if (inputField.newPassword.trim().length === 0) return toast.error("Please Enter new password")
            props.showLoader()
        await axios.post(`https://collagedispbackend.onrender.com/api/auth/reset-password`, { email: inputField.email, newPassword: inputField.newPassword }).then((response) => {
            
            setStep(3);
            setErrorMessage("")
            setButtonText("Update New Password")
            alert(response.data.message)
            props.closeModal();

        }).catch(err => {
            console.log(err)
            alert(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
            
        })
    }

    const handleForgotBtn = async () => {
        if (step === 1) {
            await sendOTPToMail()
        } else if (step === 2) {
            await checkOtp()
        }else if(step===3){
            await resetPassword()
        }
    }
    return (
        <div className='forgot-password-modal'>
            <ToastContainer />
            <div className='signup-page-card'>
                <div className='card-header-form'>Reset Password</div>
                <div className='form-input-fields'>

                    <input className='form-input' value={inputField.email} onChange={(event) => { handleOnChange(event, "email") }} type='email' placeholder='Enter Email Id' />
                    {step === 2 || step === 3 ? <input value={inputField.otp} onChange={(event) => { handleOnChange(event, "otp") }} className='form-input' type='text' placeholder='Enter OTP' /> : null}
                    {step === 3 ? <input className='form-input' type='password' value={inputField.newPassword} onChange={(event) => { handleOnChange(event, "newPassword") }} placeholder='New Password' /> : null}
                    <div className='error-msg'>{errorMessage}</div>
                </div>
                <div className='form-btn forgot-password-btn' onClick={handleForgotBtn}>{buttonText}</div>
                <div className='form-btn forgot-password-btn' onClick={handleCloseModal}>Cancel</div>
            </div>
        </div>
    )
}

export default ForgotModal