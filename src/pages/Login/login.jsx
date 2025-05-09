import React, { useState } from 'react'
import './login.css'
import ForgotModal from '../../components/ForgotModal/forgotModal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
const Login = (props) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loginField, setLoginField] = useState({ email: "", password: "" });
  const [registerField, setRegisterField] = useState({ name: "", email: "", password: "", roll: "" });

  const handleOnChange = (event, key, card) => {
    if (card === "login") {
      setLoginField({ ...loginField, [key]: event.target.value })
    } else {
      setRegisterField({ ...registerField, [key]: event.target.value })
    }
  }

  const navigate = useNavigate()
  const closeForgotPassword = () => {
    setForgotPassword(prev => !prev)
  }

  const handleLogin = async () => {
    if (loginField.email.trim() === "" || loginField.password.trim() === "") return toast.error("Please enter the credentials");
    props.showLoader();
    await axios.post("https://collagedispbackend.onrender.com/api/auth/login", loginField, { withCredentials: true }).then((response) => {
      console.log(response)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('isLogin',true)
      props.handleLogin(true)
      if(response.data.user.role==="student"){
        navigate('/student/1232')
      }else{
        navigate('/admin/dashboard')
      }
    }).catch(err => {
      toast.error(err?.response?.data?.error);
    }).finally(() => {
      props.hideLoader();
    })
  }

  const handleRegister = async () => {
    if (registerField.email.trim() === "" || registerField.password.trim() === "" || registerField.name.trim() === "" || registerField.roll.trim() === "") return toast.error("Please enter the credentials");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@nituk\.ac\.in$/;
    if (registerField.name.length < 3) return toast.error("Name should be greater than 2 characters ")
    // if (!emailPattern.test(registerField.email)) return toast.error("Please enter a valid email.")
    if (registerField.password.length < 6) return toast.error("Password length should be greater than 5 ")
    
    props.showLoader();
    await axios.post("https://collagedispbackend.onrender.com/api/auth/register",registerField).then((response)=>{
      toast.success("Student Registered Successfully")
    }).catch(err => {
      toast.error(err?.response?.data?.error);
    }).finally(() => {
      props.hideLoader();
    })

  }
  return (
    <div className='login-page'>

      <div className='login-page-card'>
        <ToastContainer />

        <div className='card-header-form'>Login</div>
        <div className='form-input-fields'>
          <input className='form-input' type='email' value={loginField.email} onChange={(event) => { handleOnChange(event, "email", "login") }} placeholder='Enter Email Id' />
          <input className='form-input' type='password' value={loginField.password} onChange={(event) => { handleOnChange(event, "password", "login") }} placeholder='Your Password' />
          <div className='form-btn' onClick={() => handleLogin("admin")}>Login</div>
        </div>
        <div className='forgot-password-link' onClick={closeForgotPassword}>Forgot Password ?</div>
      </div>



      <div className='signup-page-card'>
        <div className='card-header-form'>Register</div>
        <div className='form-input-fields'>

          <input className='form-input' value={registerField.name} onChange={(event) => { handleOnChange(event, "name", "register") }} type='text' placeholder='Your Name' />
          <input className='form-input' value={registerField.email} onChange={(event) => { handleOnChange(event, "email", "register") }} type='email' placeholder='Enter Email Id' />
          <input className='form-input' type='password' value={registerField.password} onChange={(event) => { handleOnChange(event, "password", "register") }} placeholder='Your Password' />
          <input className='form-input' type='text' value={registerField.roll} onChange={(event) => { handleOnChange(event, "roll", "register") }} placeholder='Your Roll No' />


          <div className='form-btn' onClick={handleRegister}>Register</div>
        </div>
      </div>
      {
        forgotPassword && <ForgotModal showLoader={props.showLoader} hideLoader={props.hideLoader} showGlobalError={props.showGlobalError} hideGlobalError={props.hideGlobalError} closeModal={closeForgotPassword} />
      }

    </div>
  )
}

export default Login