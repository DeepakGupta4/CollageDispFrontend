import React, { useEffect, useState } from 'react'
import './reportModal.css'
import CloseIcon from '@mui/icons-material/Close';
import SearchBox from '../SearchBox/searchBox';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';
const ReportModal = (props) => {
  const [searchMedicineName, setSearchmedicineName] = useState("")
  const [dropdown, setDropDown] = useState(false);
  const [stocks, setStocks] = useState([]);
  const hanldeOnChange = (value) => {
    setSearchmedicineName(value)
    if (!searchMedicineName.length) {
      setDropDown(false)
      return;
    }
  }
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const handleMedicineCall = async () => {

    await axios.get(`https://collagedispbackend.onrender.com/api/medicine/search-by-name?name=${searchMedicineName}`).then((response) => {

      if (response.data.medicines.length === 0) {
        setStocks([]);
      }
      setStocks(response.data.medicines)

      setDropDown(true)

    }).catch(err => {
      alert(err?.response?.data?.error)

    })
  }

  console.log(selectedMedicine)
  useEffect(() => {
    if (searchMedicineName.length) {
      handleMedicineCall()

    } else {
      setDropDown(false)
    }
  }, [searchMedicineName])

  const handleClickOnMedicine = (item) => {
    let exist = 0;
    selectedMedicine.map((it) => {
      if (item._id === it._id) {
        exist = 1
      }
    })
    item = { ...item, requiredQuantity: "" }
    if (exist === 0) setSelectedMedicine([...selectedMedicine, item]);
    setSearchmedicineName("")
    setDropDown(false)
  }

  const handleDelete = (item) => {
    let arr = selectedMedicine.filter((it) => item !== it._id);
    setSelectedMedicine(arr);
  }
  const checkInputInValid = () => {
    let invalid = false;
    selectedMedicine.map((item) => {
      if (item.requiredQuantity.trim().length === 0) {
        invalid = true;
      }
    })
    return invalid;
  }

  const handleOnSubmit = async () => {
    if (selectedMedicine.length === 0) return toast.error("Please select any medicine.");
    if (checkInputInValid()) return toast.error("Please enter all the fields.")
    props.showLoader()
    await axios.post('https://collagedispbackend.onrender.com/api/history/add', {
      roll:props.studentDetail.roll,
      student:props.studentDetail._id,
      medicines:selectedMedicine
    },{withCredentials:true}).then((response)=>{
      toast.success(response.data.message)
      setTimeout(()=>{
        props.handleCloseModal()
      },1000)
      
    }).catch((err)=>{
      toast.error(err?.response?.data?.error)
    }).finally(()=>{
      props.hideLoader();
    })
  }

  const onChangeHandle = (event, ind) => {
    const arr = selectedMedicine.map((item, index) => {
      if (index === ind) {
        if (parseInt(item.quantity) < parseInt(event.target.value)) {
          toast.error("You have not that much medicine in the store")
          return { ...item }
        }
        return { ...item, requiredQuantity: event.target.value }
      }
      return { ...item }
    })
    setSelectedMedicine(arr)
  }
  return (
    <div className='report-modal'>
      <div className='report-modal-card'>
        <div className='report-modal-header'>
          <div>Report</div>
          <div className='close-modal-report' onClick={() => props.handleCloseModal()}><CloseIcon /></div>
        </div>
        <div className='medicine-suggestion-block'>
          <SearchBox value={searchMedicineName} onChangeHandle={hanldeOnChange} placeholder={"Medicine Name"} />
          {
            dropdown && <div className='report-dropdown'>

              {
                stocks.map((item, index) => {
                  return (
                    <div key={index} className='report-medicine-drpdown' onClick={() => handleClickOnMedicine(item)}>{item.name}</div>
                  );
                })
              }

            </div>
          }
        </div>

        <div className='report-form-rows'>
          <div className='report-form-header'>
            <div className='col-1-rm'>Medicine Name</div>
            <div className='col-2-rm'>Quantity Left</div>
            <div className='col-3-rm'>Required Quantity</div>
            <div className='col-4-rm'>Delete</div>
          </div>
          <div className='report-form-row-block'>
            {
              selectedMedicine.map((item, index) => {
                return (
                  <div className='report-form-row' key={index}>
                    <div className='col-1-rm'>{item.name}</div>
                    <div className='col-2-rm'>{item.quantity}</div>
                    <div className='col-3-rm'><input value={selectedMedicine[index].requiredQuantity} onChange={(event) => onChangeHandle(event, index)} type='number' className='input-table' /></div>
                    <div className='delete-icon col-4-rm' onClick={() => handleDelete(item._id)}><DeleteIcon /></div>
                  </div>
                );
              })
            }
            {
              selectedMedicine.length === 0 ? <div>No any medicine selected</div> : null
            }


          </div>

          <div className='modal-submit' onClick={handleOnSubmit}>Submit</div>
        </div>
      </div>
    </div>
  )
}

export default ReportModal;