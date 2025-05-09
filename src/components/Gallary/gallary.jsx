import React, { useEffect, useState } from 'react';
import './gallary.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Gallary = (props) => {
    const [images, setImage] = useState([]);

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
    return (
        <div className='gallary-home'>
            <ToastContainer />

            {
                images.map((item, index) => {
                    return (
                        <div className='gallary-home-image-block' key={index}>
                            <img src={item.link} className='gallary-home-image' />
                        </div>
                    );
                })
            }
            {
                images.length===0?<div>No any images added yet</div>:null
            }

        </div>
    )
}

export default Gallary