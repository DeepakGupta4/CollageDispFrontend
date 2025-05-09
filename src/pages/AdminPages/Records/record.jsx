import React, { useEffect, useState } from 'react'
import SearchBox from '../../../components/SearchBox/searchBox'
import './record.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import StudentDetailModal from '../../StudentPages/StudentDashboard/StudentDetailsModal/studentDetailModal';
import StudentModal from './StudentModal/studentModal';
const Record = (props) => {
    const [studentRoll, setStudentRoll] = useState("");
    const [listOfYear, setListOfYear] = useState([]);
    const [listOfMonth, setListOfMonths] = useState([]);
    const currentYear = new Date().getFullYear();
    const [data, setData] = useState([]);
    const [modal,setModal] = useState(false)
    const [selectedHistory,setSelectedHistory] = useState(null)
    const [studentModal,setStudentModal] = useState(false)
    const [existDetail,setExistDetails] = useState([]);
    // const currentYear = "2035";


    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")

    const openCloseModal=(item)=>{
        setModal(prev=>!prev);
        setSelectedHistory(item?item:null)

    }

    const openCloseStudentModal = ()=>{
        setStudentModal(prev=>!prev);
    }
    const fetchData = async () => {
        props.showLoader()
        axios.get(`https://collagedispbackend.onrender.com/api/history/get-history?month=${selectedMonth}&year=${selectedYear}`, { withCredentials: true }).then((response) => {
            setData(response.data.history)
        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.error);

        }).finally(() => {
            props.hideLoader()
        })
    }

    useEffect(() => {
        console.log(selectedMonth, selectedYear)
        if (selectedMonth === "" || selectedYear === "") {
            return;
        }
        fetchData();
    }, [selectedYear, selectedMonth])

    useEffect(() => {
        let arr = [];
        for (let i = 2025; i <= parseInt(currentYear); i++) {
            arr.unshift(i.toString())
        }
        setListOfYear(arr);
        setSelectedYear(arr[0]);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const currentMonthIndex = new Date().getMonth(); // 0 for Jan, 1 for Feb, ..., 11 for Dec

        const pastAndCurrentMonths = months.slice(0, currentMonthIndex + 1);
        setListOfMonths(pastAndCurrentMonths)
        setSelectedMonth(pastAndCurrentMonths[pastAndCurrentMonths.length - 1])

    }, [])

    const fetchHistory = async () => {
        if(studentRoll.trim().length===0){
            return toast.error("Please enter roll number")
        }
        props.showLoader()
        await axios.get(`https://collagedispbackend.onrender.com/api/history/get?roll=${studentRoll}`, { withCredentials: true }).then((response) => {
            // setHistory(response.data.history);
            setExistDetails(response.data.history)
            setStudentModal(true)
        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.error)
        }).finally(()=>{
            props.hideLoader()
        })
    }
    const handleOnChange = (value) => {
        setStudentRoll(value)
    }
    return (
        <div className='records'>
            <ToastContainer />
            <div className='go-back'><Link to={'/admin/dashboard'} className='go-back' ><ArrowBackIcon /> Back To Dashboard</Link></div>
            <SearchBox value={studentRoll} onClickButton={fetchHistory} placeholder="Search By Roll No." onChangeHandle={handleOnChange} />

            <div className='record-date-block'>
                Select year
                <div className='record-date-year'>
                    {
                        listOfYear.map((item, index) => {
                            return (<div key={index} onClick={() => { setSelectedYear(item) }} className={`record-year ${selectedYear === item ? 'activeYear' : null}`}>{item}</div>);
                        })
                    }

                </div>

                Select Month

                <div className='record-date-year'>
                    {
                        listOfMonth.map((item, index) => {
                            return (<div key={index} onClick={() => { setSelectedMonth(item) }} className={`record-year ${selectedMonth === item ? 'activeYear' : null}`}>{item}</div>);
                        })
                    }

                </div>

                <div className='manageMedicine-card'>
                    <div className='report-form-rows'>
                        <div className='report-form-header'>
                            <div className=''>View</div>
                            <div className='col-2-mng'>Student Name</div>
                            <div className='col-3-mng'>Roll No</div>
                            <div className='col-3-mng record-col-4'>Date</div>


                        </div>
                        <div className='report-form-row-block'>
                            {
                                data.map((item, index) => {
                                    return (
                                        <div className='report-form-row' key={index}>
                                            <div className='' style={{cursor:"pointer"}} onClick={()=>openCloseModal(item)}><RemoveRedEyeIcon /></div>
                                            <div className='col-2-mng'>{item?.student?.name}</div>
                                            <div className='col-3-mng'>{item?.roll}</div>
                                            <div className='col-3-mng record-col-4'>{item.createdAt.slice(0, 10).split("-").reverse().join("-")}</div>

                                        </div>
                                    );
                                })
                            }
                            {
                                data.length===0?<div>No any record found.</div>:null
                            }



                        </div>

                    </div>
                </div>
            </div>
            {studentModal && <StudentModal openCloseModal={openCloseStudentModal} selectedHistory={existDetail}/>}
            {modal && <StudentDetailModal openCloseModal={openCloseModal} selectedHistory={selectedHistory} />}
        </div>
    )
}

export default Record