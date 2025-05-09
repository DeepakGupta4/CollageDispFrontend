import React, { useState } from 'react'
import './addAdminModal.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const AddImageModal = (props) => {
    const [image,setImage] = useState(null);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append('upload_preset', 'medicalSite');
        try {
          // cloudName="dhlklhfgj"
          props.showLoader();
          const response = await axios.post("https://api.cloudinary.com/v1_1/dbraoytbj/image/upload", data)
          
          const imageUrl = response.data.url;
          setImage(imageUrl)
        } catch (err) {
          console.log(err)
        }finally{
            props.hideLoader();
        }
      }

    const handleAddImage =async()=>{
        props.showLoader()
        await axios.post("https://collagedispbackend.onrender.com/api/gallary/add", {link:image}, { withCredentials: true }).then((response) => {
            props.hideGlobalError();
            window.location.reload();
        }).catch(err => {
            props.showGlobalError();
            toast.error(err?.response?.data?.error)

        }).finally(() => {
            props.hideLoader();
        })
    }
    return (
        <div className='delete-imageModal'>
            <ToastContainer/>
            <div className='delete-modal-card'>
                <div>Add Image</div>
                <div className='delete-modal-btns'>
                    <div className='cancel-modal-btn' onClick={() => { props.handleAddImageModal() }} >Cancel</div>
                    <label htmlFor="fileInput" className='cancel-modal-btn' ><CloudUploadIcon /></label>
                    <input id="fileInput" accept="image/*" onChange={(e)=>{uploadImage(e)}} className='cancel-file' type='file' />
                </div>

                {
                    image?<div className='gallary-home-image-block' style={{marginTop:"20px"}}>
                    <img src={image} className='gallary-home-image' />
                </div>:null
                }
                {
                    image?<div className='cancel-modal-btn' style={{marginTop:10}} onClick={() => { handleAddImage() }} >Upload</div>:null
                }
            </div>
        </div>
    )
}

export default AddImageModal