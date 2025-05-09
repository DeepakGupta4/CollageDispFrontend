import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import './studentDetailModal.css'
const StudentDetailModal = (props) => {

    return (
        <div className='add-facility'>
            <div className='add-facility-card'>
                <div className='add-medicine-header'>
                    <div>Details</div>
                    <div className='closeF-modal-report' style={{cursor:"pointer"}} onClick={() => props.openCloseModal()}><CloseIcon /></div>
                </div>

                <div className='student-modal-detail'>
                    <div className='student-modal-header'>
                        {props?.selectedHistory.createdAt.slice(0, 10).split("-").reverse().join("-")}
                    </div>
                    <div className='student-modal-body'>
                        <div className='student-modal-body-header'>
                            <div>Medicine Name</div>
                            <div>Quantity</div>
                        </div>
                        <div className='student-modal-body-item'>
                            {
                                props?.selectedHistory?.medicines.map((item, ind) => {
                                    return (
                                        <div className='student-item-modal' key={ind}>
                                            <div>{item.name}</div>
                                            <div>{item.requiredQuantity}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetailModal