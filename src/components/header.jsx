import React, { useEffect, useState } from 'react'
import './header.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

const Header = (props) => {
    const [eventpopup, setEventpopup] = useState(false)
    const [helpline, setHelpline] = useState(false)
    const [events, setEvenets] = useState([]);
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const fetchEvents = async () => {
        setLoader(true)
        await axios.get("https://collagedispbackend.onrender.com/api/notification/get").then((response) => {
            setEvenets(response.data.notifications);
        }).catch(err => {
            toast.error(err?.response?.data?.error)
        }).finally(() => {
            setLoader(false)
        })
    }
    useEffect(() => {
        fetchEvents()
    }, [eventpopup])
    const location = useLocation()
    const handleOpenpopup = (popup) => {
        if (popup === "events") {
            setEventpopup(true)
        } else {
            setHelpline(true)
        }

    }
    const handleClosePopup = (popup) => {
        if (popup === "events") {
            setEventpopup(false)
        } else {
            setHelpline(false)
        }
    }


   const handleLogin = ()=>{
        navigate('/login')
   }

   const handleLogout=async ()=>{
    props.showLoader();
    await axios.post("https://collagedispbackend.onrender.com/api/auth/logout",{},{withCredentials:true}).then((response) => {
        props.handleLogin(false);
        localStorage.clear();
        navigate('/');
    }).catch(err => {
        console.log(err)
        toast.error(err?.response?.data?.error)
    }).finally(() => {
        props.hideLoader();
    })
   }

    return (
        <div className='header'>
            {/* top header */}
            <div className='header-college-details'>
                <div className='header-college-details-left'>
                    <img className='header-college-details-left-logo' src='https://tse3.mm.bing.net/th/id/OIP.HQTtZzKIZxQrMW3gtiRHBwAAAA?rs=1&pid=ImgDetMain' alt='colegeLogo' />
                    <div>
                        <div className='header-college-details-name'>राष्ट्रीय प्रौद्योगिकी संस्थान,</div>
                        <div className='header-college-details-place'>उत्तराखंड </div>
                        <div className='header-college-details-name'>National Institute of Technology, </div>
                        <div className='header-college-details-place'>Uttrakhand </div>
                    </div>
                </div>
                <div className='header-college-details-right'>
                    <div className='header-college-social-media'>
                        <a target='_blank' href='https://www.youtube.com/@nationalinstituteoftechnol7593'><img src='https://cdn-icons-png.flaticon.com/128/3670/3670147.png' className='header-social-media-image' /></a>
                        <a target='_blank' href='https://www.facebook.com/nitukofficial/'><img src='https://cdn-icons-png.flaticon.com/128/733/733547.png' className='header-social-media-image' /></a>
                        <a target='_blank' href='https://x.com/NIT_Uttarakhand'><img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png' className='header-social-media-image' /></a>
                        <a target='_blank' href='https://www.instagram.com/nitukofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='><img src='https://th.bing.com/th/id/OIP.0wjhvLpjGf_-r-1lqG3QAQHaHw?rs=1&pid=ImgDetMain' className='header-social-media-image' /></a>
                    </div>
                    <input type='text' className='header-input-tags' />

                </div>
            </div>


            {/* navbar */}
            <nav>
                <div className='navbar'>
                    <NavLink to={"/"} className={`navbar-links ${location.pathname === "/" ? 'active-navLink' : null}`}>
                        Home
                    </NavLink>

                    <div onClick={props.isLogin?handleLogout:handleLogin} className={`navbar-links ${location.pathname === "/login" ? 'active-navLink' : null}`}>
                        {props.isLogin ?"Logout":"Login"}
                    </div>
                    <NavLink to={'/stock'} className={`navbar-links ${location.pathname === "/stock" ? 'active-navLink' : null}`}>
                        Stock View
                    </NavLink>
                    <div className='navbar-links event-link' onMouseLeave={() => handleClosePopup("events")} onMouseEnter={() => handleOpenpopup("events")}>
                        <div className='navbar-link-opt'>New Events <ArrowDropDownIcon /></div>
                        {
                            eventpopup ? !loader ? <div className='navbar-dropdown-popup event-pop'>
                                {
                                    events.map((item,index)=>{
                                        return(
                                            <div key={index} className='popup-notification'>.{item.title} </div>
                                        );
                                    })
                                }
                                {
                                    events.length===0?"No Any Events":null
                                }
                                
                            </div> : <div className='navbar-dropdown-popup event-pop'><Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box></div> : null

                        }
                    </div>
                    <div className='navbar-links event-link' onMouseLeave={() => handleClosePopup("helpline")} onMouseEnter={() => handleOpenpopup("helpline")}>
                        <div className='navbar-link-opt'>Helpline <ArrowDropDownIcon /></div>
                        {
                            helpline && <div className='navbar-dropdown-popup helpline-pop event-pop'>
                                <div className='popup-notification'>Disaster Helpline: 1077 </div>
                                <div className='popup-notification'>Women Helpline: 1091 </div>
                                <div className='popup-notification'>Police: 100 </div>
                                <div className='popup-notification'>Fire & Rescue: 101 </div>
                                <div className='popup-notification'>Ambulance: 102/1099 </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>

            {
                location.pathname === '/' ? <div className='header-banner'>
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0JtwxcjNmUy0HNfNwUA4bbdNgAExlepqgG2yDgpKR2emOMi79JnaSHAFMHp5FAWbhrA&usqp=CAU"} className='header-banner-image' />
                </div> : null
            }


        </div>
    )
}

export default Header