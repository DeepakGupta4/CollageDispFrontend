import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './gallaryAdmin.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddImageModal from './AddImageModal/addImageModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const GallaryAdmin = (props) => {
    const [images, setImage] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [addimageModal, setaddimageModal] = useState(false);
    const [clickedImage,setClickedImage] = useState(null)

    const fetchData = async () => {
        props.showLoader()
        await axios.get("https://collagedispbackend.onrender.com/api/gallary/get").then((response) => {

            setImage(response.data.images)
            props.hideGlobalError();
        }).catch(err => {
            toast.error(err?.response?.data?.error)
            props.showGlobalError();
        }).finally(() => {
            props.hideLoader();
        })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleDeleteModal = (id) => {
        setDeleteModal(prev => !prev)
        setClickedImage(id)
    }
    const handleAddImageModal = () => {
        setaddimageModal(prev => !prev)
    }

    const deleteSelectedImage =async(item)=>{
        props.showLoader()
        await axios.delete(`https://collagedispbackend.onrender.com/api/gallary/delete/${clickedImage}`, { withCredentials: true }).then((response) => {
            window.location.reload()
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }
    return (
        <div className='gallary-admin'>
            <ToastContainer />
            <div className='go-back'><Link to={'/admin/dashboard'} className='go-back' ><ArrowBackIcon /> Back To Dashboard</Link></div>
            <div className='add-pic-gallary-btn' onClick={handleAddImageModal}>Add Pic</div>
            <div className='gallary-home'>
                {
                    images.map((item, ind) => {
                        return (
                            <div key={ind} className='gallary-home-image-block img-admin' onClick={() => { handleDeleteModal(item._id) }} >
                                <img src={item.link} className='gallary-home-image' />
                            </div>
                        );
                    })
                }

                {
                    images.length===0?<div>No any images yet</div>:null
                }

            </div>
            {
                deleteModal && <div className='delete-imageModal'>
                    <div className='delete-modal-card'>
                        <div>Are you sure? Want to delete this image ?</div>
                        <div className='delete-modal-btns'>
                            <div className='cancel-modal-btn' onClick={() => { handleDeleteModal() }} >Cancel</div>
                            <div className='cancel-modal-btn' onClick={()=>{deleteSelectedImage()}}><DeleteIcon /></div>
                        </div>
                    </div>
                </div>
            }

            {addimageModal && <AddImageModal showLoader={props.showLoader} hideLoader={props.hideLoader} showGlobalError={props.showGlobalError} hideGlobalError={props.hideGlobalError} handleAddImageModal={handleAddImageModal} />}
        </div>
    )
}

export default GallaryAdmin;