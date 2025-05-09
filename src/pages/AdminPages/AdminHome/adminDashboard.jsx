import React, { useState } from 'react';
import './adminDashboard.css';
import { Link } from 'react-router-dom';
import ManageStaffModal from './ManageStaffModal/manageStaffModal';
import ManageEvents from './ManageEvents/manageEvents';
const AdminDashboard = (props) => {
  const [manageModal,setManageModal] = useState(false);
  const [eventModal,setEventModal] = useState(false);

  const openCloseModal = (value)=>{
    if(value==="staff") return setManageModal(prev=>!prev);
    return setEventModal(prev=>!prev)
  }

  let userInfo =localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null;

  return (
    <div className='adminDashboard'>
        <div className='welcome-header'>
          <div className='welcome-admin'>Welcome To Admin Panel</div>
          <div className='welcome-admin-right-side'>
            {userInfo?.role==="admin"?<div className='manage-staff-btn' onClick={()=>openCloseModal("staff")}>Manage Staffs</div>:null}
            <div className='manage-staff-btn' onClick={()=>openCloseModal("event")}>Events</div>

          </div>
        </div>
        <div className='admin-dashboard-cards'>
          <Link to={'/admin/register-student'} className='admin-dashboard-card'>
            Register Student
          </Link>
          <Link to={'/admin/manage-medicine'} className='admin-dashboard-card'>
            Manage Medicines
          </Link>
          <Link to={"/admin/records"} className='admin-dashboard-card'>
            Records
          </Link>
          <Link to={"/admin/faciltity"} className='admin-dashboard-card'>
            Facilities
          </Link>
          <Link to={"/admin/hospitals"} className='admin-dashboard-card'>
            Near By Hospitals
          </Link>
          <Link to={"/admin/gallary"} className='admin-dashboard-card'>
            Gallary
          </Link>
        </div>
        {manageModal && <ManageStaffModal showLoader={props.showLoader} hideLoader={props.hideLoader} showGlobalError={props.showGlobalError} hideGlobalError={props.hideGlobalError} openCloseModal={openCloseModal} />}
        {eventModal && <ManageEvents showLoader={props.showLoader} hideLoader={props.hideLoader} showGlobalError={props.showGlobalError} hideGlobalError={props.hideGlobalError}  openCloseModal={openCloseModal} />}

    </div>
  )
}

export default AdminDashboard;