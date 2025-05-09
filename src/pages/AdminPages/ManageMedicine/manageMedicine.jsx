import React, { useEffect, useState } from 'react'
import './manageMedicine.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBox from '../../../components/SearchBox/searchBox';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddMedicine from './AddMedicine/addMedicine';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const ManageMedicine = (props) => {
    const [medicineSearch, setMedicineSearch] = useState("")
    const [addModal, setAddModal] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [clickedMedicine,setClickedMedicine] = useState(null)
    const handleInputChange = (value) => {
        setMedicineSearch(value)
    }
    const openCloseModal = () => {
        setAddModal(prev => !prev)
    }
    const handleMedicineCall = async () => {
        await axios.get(`https://collagedispbackend.onrender.com/api/medicine/search-by-name?name=${medicineSearch}`).then((response) => {
           
            if (response.data.medicines.length === 0) {
                setStocks([]);
            }
            setStocks(response.data.medicines)
            props.hideGlobalError();

        }).catch(err => {
            props.showGlobalError();

        })
    }

    const addMedicine = (item)=>{
        setStocks([...item,item])
    }

    const setClickedMedicineEmpty = ()=>{
        setClickedMedicine(null)
    }



    useEffect(() => {
        handleMedicineCall()
    }, [medicineSearch])

    const handleOnClickEdit=(item)=>{

        setClickedMedicine(item);
        setAddModal(true)
    }

    const removeTheData = (id)=>{
        const removedData = stocks.filter((item)=>item._id!==id);
        setStocks([...removedData]);
    }

    const handleDelete =async(id)=>{
        props.showLoader()
        await axios.delete(`https://collagedispbackend.onrender.com/api/medicine/delete/${id}`,{withCredentials:true}).then((response) => {
            removeTheData(id);
            toast.success(response.data.message)
            props.hideGlobalError();

        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }
    return (
        <div className='manageMedicine'>
            <ToastContainer />
            <div className='go-back'><Link to={'/admin/dashboard'} className='go-back' ><ArrowBackIcon /> Back To Dashboard</Link></div>

            <div className='top-manage-medicine'>
                <SearchBox onChangeHandle={handleInputChange} value={medicineSearch} placeholder="Search medicine" />
                <div className='add-manage-medicine' onClick={openCloseModal}>Add</div>
            </div>
            <div className='manageMedicine-card'>
                <div className='report-form-rows'>
                    <div className='report-form-header'>
                        <div className=''>Sr. No.</div>
                        <div className='col-2-mng'>Medicine Name</div>
                        <div className='col-2-mng'>Added By</div>
                        <div className='col-3-mng'>Quantity</div>
                        <div className=''>Edit</div>
                        <div className=''>Delete</div>

                    </div>
                    <div className='report-form-row-block'>
                        {
                            stocks.map((item, ind) => {
                                return (
                                    <div className='report-form-row'>
                                        <div className=''>{ind+1}</div>
                                        <div className='col-2-mng'>{item.name}</div>
                                        <div className='col-2-mng'>{item?.addedBy?.name}</div>

                                        <div className='col-3-mng'>{item.quantity}</div>
                                        <div className=' edit-icon' onClick={()=>handleOnClickEdit(item)}><EditIcon /></div>
                                        <div className='delete-icon' onClick={()=>handleDelete(item._id)}><DeleteIcon /></div>
                                    </div>
                                );
                            })
                        }
                        {
                            stocks.length===0?<div className='report-form-row'>
                            <div>No Any Data</div>
                        </div>:null
                        }


                    </div>

                </div>
            </div>
            {addModal && <AddMedicine setClickedMedicineEmpty={setClickedMedicineEmpty} clickedMedicine={clickedMedicine} addMedicine={addMedicine} openCloseModal={openCloseModal} showLoader={props.showLoader} hideLoader={props.hideLoader} />}
        </div>
    )
}

export default ManageMedicine