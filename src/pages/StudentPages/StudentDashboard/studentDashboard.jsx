import React, { useEffect, useState } from 'react'
import './studentDashboard.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StudentDetailModal from './StudentDetailsModal/studentDetailModal';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentDashboard = (props) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [history, setHistory] = useState([]);
    const [selectedHistory,setSelectedHistory] = useState(null)

    let userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const setOnOffModal = (item) => {
        setDetailsModal(prev => !prev)
        setSelectedHistory(item?item:null)
    }

    const fetchHistory = async () => {
        props.showLoader()
        await axios.get(`https://collagedispbackend.onrender.com/api/history/get?roll=${userInfo?.roll}`, { withCredentials: true }).then((response) => {
            setHistory(response.data.history);
            console.log(response.data.history)
        }).catch(err => {
            toast.error(err?.response?.data?.error)
        }).finally(()=>{
            props.hideLoader()
        })
    }
    useEffect(() => {
        fetchHistory();
    }, [])
    return (
        <div className='student-dashboard'>
            <div className='student-info'>
                <div className='welcone-user'>Welcome, <span>{userInfo?.name}</span></div>
                <div className='welcone-user'>{userInfo.roll}</div>
                <div className='welcone-user'>{userInfo.email}</div>

            </div>

            <div className='report-form-rows student-dash'>
                <div className='report-form-header'>
                    <div className='col-1-mng'>View</div>
                    <div className='col-3-mng record-col-4'>Date</div>
                </div>
                <div className='report-form-row-block'>
                    {
                        history.map((item, ind) => {
                            return (
                                <div className='report-form-row' key={ind}>
                                    <div className=' eye' onClick={()=>setOnOffModal(item)}><RemoveRedEyeIcon /></div>
                                    <div className='col-3-mng record-col-4'>{item.createdAt.slice(0,10).split("-").reverse().join("-")}</div>
                                </div>
                            );
                        })
                    }
                    {
                        history.length===0?<div>No any records</div>:null
                    }
                   
                </div>
            </div>
            {detailsModal && <StudentDetailModal selectedHistory={selectedHistory} openCloseModal={setOnOffModal} />}
        </div>
    )
}

export default StudentDashboard