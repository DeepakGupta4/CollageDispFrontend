import React, { useEffect, useState } from 'react'
import './facility.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Facility = (props) => {

    const [facility, setFacilities] = useState([]);


    const fetchedData = async () => {
        props.showLoader();
        await axios.get("https://collagedispbackend.onrender.com/api/facility/get").then((response) => {
            
            
            setFacilities(response.data.facility);
            props.hideGlobalError();
        }).catch(err => {
            props.showGlobalError();


        }).finally(() => {
            props.hideLoader();
        })
    }

    useEffect(() => {
        fetchedData();
    }, [])
    return (
        <div className='facilities'>
            <ToastContainer />
            <div className='facility-header'>
                List of facilities available at NIT HEALTH CENTRE:
            </div>
            <div className='facility-lists'>
                {
                    facility.map((item, ind) => {
                        return (
                            <div className='facility-list' key={ind}>
                                <div className='facility-list-header'>{item.title}:</div>
                                <p className='facility-list-value'>{item.description}</p>
                            </div>
                        );
                    })
                }

                {
                    facility.length === 0 ? <div>No any facilities added yet</div> : null
                }


            </div>

        </div>
    )
}

export default Facility;