import React from 'react'
import './footer.css';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguageIcon from '@mui/icons-material/Language';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const Footer = () => {
  let todayDate = new Date();
  return (
    <>
    <div className='footer'>
        <div className='foooter-left'>
            <img src='https://tse3.mm.bing.net/th/id/OIP.HQTtZzKIZxQrMW3gtiRHBwAAAA?rs=1&pid=ImgDetMain' className='footer-logo' />
            <div className='footer-text-white'>National Institute of Technology</div>
            <div className='footer-text-white'>Uttrakhand</div>
            <div className='footer-text-smaller'>Srinagar, Pauri (Garhwal)-246174</div>
            <div className='footer-text-smaller'><LocalPhoneIcon /> 1346-257400</div>
            <div className='footer-text-smaller'><LanguageIcon /> www.nituk.ac.in</div>
           
        </div>
        <div className='foooter-center'>
            <div className='important-link'>Important Links</div>
            <a href='https://www.nituk.ac.in/anti-ragging-initiative/home' target='_blank'>Anti-Ragging Initiative</a>
            <a href='https://www.nituk.ac.in/career-counselling-and-placement/home' target='_blank'>Career Counselling and Placement Section</a>
            <a href='https://www.nituk.ac.in/right-to-informations' target='_blank'>Right To Information</a>
            <a href='https://www.nituk.ac.in/special-cell' target='_blank'>Special Cell</a>
            <a href='https://www.nituk.ac.in/grievance-cell' target='_blank'>Grievance Cell</a>
            <a href='https://nituk.ac.in/nituk-contact' target='_blank'>Contact Us</a>
            <a href='https://nituk.ac.in' target='_blank'>College Official Website</a>

        </div>
        <div className='footer-right'>
          <div className='footer-right-name'><CloudIcon /> NIT Uttarakhand</div>
          <div className='today-date-footer'>{todayDate.toDateString()}</div>
        </div>
    </div>
    <div className='footer-bottom'>
      <div>Copyright © 2024 National Institute of Technology, Uttarakhand.</div>
    </div>
    </>
  )
}

export default Footer