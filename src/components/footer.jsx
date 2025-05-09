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
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHULfuWxo8fbzkVJ9MfHBe2fdwn0Uhp7IElg&s' className='footer-logo' />
            <div className='footer-text-white'>SAM Global University</div>
            <div className='footer-text-white'>Bhopal</div>
            <div className='footer-text-smaller'>Kolua, Gram Adampur Chawni, Raisen Road, (M.P.) 462021</div>
            <div className='footer-text-smaller'><LocalPhoneIcon />(+91) 9644553399</div>
            <div className='footer-text-smaller'><LanguageIcon />www.samglobaluniversity.ac.in</div>
           
        </div>
        <div className='foooter-center'>
            <div className='important-link'>Important Links</div>
            <a href='https://www.samglobaluniversity.ac.in/anti-ragging-policy/' target='_blank'>Anti-Ragging Initiative</a>
            <a href='https://placements.samglobaluniversity.ac.in/' target='_blank'>Career Counselling and Placement Section</a>
            <a href='https://www.samglobaluniversity.ac.in/mandatory-disclosures/' target='_blank'>Right To Information</a>
            <a href='https://placements.samglobaluniversity.ac.in/' target='_blank'>Special Cell</a>
            <a href='https://www.samglobaluniversity.ac.in/register-grievance/' target='_blank'>Grievance Cell</a>
            <a href='https://www.samglobaluniversity.ac.in/contact/' target='_blank'>Contact Us</a>
            <a href='https://www.samglobaluniversity.ac.in/' target='_blank'>College Official Website</a>

        </div>
        <div className='footer-right'>
          <div className='footer-right-name'><CloudIcon /> SAM Global University Bhopal</div>
          <div className='today-date-footer'>{todayDate.toDateString()}</div>
        </div>
    </div>
    <div className='footer-bottom'>
      <div>Copyright © 2025 SAM Global University, Bhopal.</div>
    </div>
    </>
  )
}

export default Footer