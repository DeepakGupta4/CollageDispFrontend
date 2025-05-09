import React, { useEffect, useState } from 'react'
import './stock.css'
import CustomTable from '../../components/Table/table';
import SearchBox from '../../components/SearchBox/searchBox';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
const Stock = (props) => {
  const [medicineName, setMedicineName] = useState("");
  const [stocks, setStocks] = useState([]);


  const getFormattedData = (data)=>{
    let newarr = data.map((item,ind)=>{
      return {srNo:ind+1,name:item.name,quantity:item.quantity,usage:item.usage}
    })
    setStocks(newarr);
  }
  const headers = ["Sr No.", "Name", "Quantity", "Usage"];

  const handleMedicineCall = async()=>{
    
    await axios.get(`https://collagedispbackend.onrender.com/api/medicine/search-by-name?name=${medicineName}`).then((response)=>{
      
      if (response.data.medicines.length === 0){
        setStocks([]);
      }
      getFormattedData(response.data.medicines)
      props.hideGlobalError();

    }).catch(err => {
      props.showGlobalError();

    })
  }

  useEffect(()=>{
    handleMedicineCall()
  },[medicineName])

  const handleOnChangeInputField = (value) => {
    setMedicineName(value);
  }
  return (
    <div className='stock-page'>
      <ToastContainer/>
      <SearchBox placeholder={"Search Medicine"} value={medicineName} onChangeHandle={handleOnChangeInputField} />
      <div className='stock-page-card'>
        <CustomTable headers={headers} data={stocks} />
      </div>
    </div>
  )
}

export default Stock