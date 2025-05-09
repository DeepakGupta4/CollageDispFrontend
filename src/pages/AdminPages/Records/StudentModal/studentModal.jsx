import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './studentModal.css'
const StudentModal = (props) => {
    return (
        <div className='add-facility'>
            <div className='add-facility-card-student'>
                <div className='add-medicine-header'>
                    <div>Details</div>
                    <div className='closeF-modal-report' style={{cursor:"pointer"}} onClick={() => props.openCloseModal()}><CloseIcon /></div>
                </div>

                <div className='student-modal-report'>
                    <div>{props?.selectedHistory[0]?.student?.name}</div>
                    <div>{props?.selectedHistory[0]?.student?.email}</div>
                    <div>{props?.selectedHistory[0]?.student?.roll}</div>

                </div>
                <div className='student-details-scroll'>
                {
                    props?.selectedHistory.map((items, index) => {
                        return (
                            <div className='student-modal-detail' style={{marginBottom:50}} key={index}>
                                <div className='student-modal-header'>
                                    {items.createdAt.slice(0, 10).split("-").reverse().join("-")}
                                </div>
                                <div className='student-modal-body-student'>
                                    <div className='student-modal-body-header'>
                                        <div>Medicine Name</div>
                                        <div>Quantity</div>
                                    </div>
                                    <div className='student-modal-body-item'>
                                        {
                                            items?.medicines.map((item, ind) => {
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
                        );
                    })
                }
              </div>
            </div>
        </div>
    )
}

export default StudentModal