import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/Home/home';
import {Route,Routes,Navigate} from 'react-router-dom'
import Login from './pages/Login/login';
import Stock from './pages/Stock/stock';
import AdminDashboard from './pages/AdminPages/AdminHome/adminDashboard';
import RegisterStudent from './pages/AdminPages/RegisterStudent/registerStudent';
import ManageMedicine from './pages/AdminPages/ManageMedicine/manageMedicine';
import Record from './pages/AdminPages/Records/record';
import AdminFacilitiy from './pages/AdminPages/Facilities/adminFacilitiy';
import NearByHospitalsManage from './pages/AdminPages/NearByHospitals/nearByHospitalsManage';
import GallaryAdmin from './pages/AdminPages/Gallary/gallaryAdmin';
import StudentDashboard from './pages/StudentPages/StudentDashboard/studentDashboard';
import GlobalLoader from './components/GlobalLoader/globalLoader';
import { useState } from 'react';
import GlobalError from './components/GlobalError/globalError';

function App() {
  const [loader,setLoader] = useState(false);
  const [globalError,setGlobalError] = useState(false)
  const [isLogin,setIsLogin] = useState(localStorage.getItem("isLogin"));
  let role =localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")).role:null;
  let id =localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo"))._id:null;

  const handleLogin=(value)=>{
    setIsLogin(value)
  }
  const showLoader = ()=>{
    setLoader(true);
  }
  const hideLoader = ()=>{
    setLoader(false);
  }

  const showGlobalError = ()=>{
    setGlobalError(true);
  }
  const hideGlobalError = ()=>{
    setGlobalError(false)
  }
  return (
    <div className="App">
      <Header isLogin={isLogin} handleLogin={handleLogin} showLoader={showLoader} hideLoader={hideLoader} />
      {globalError && <GlobalError />}
      
      {<Routes>
        <Route path='/' element={<Home showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError} />} />
        <Route path='/login' element={isLogin?role==="student"?<Navigate to={`/student/${id}`} />:<Navigate to={'/admin/dashboard'} />:<Login handleLogin={handleLogin} showLoader={showLoader} hideLoader={hideLoader} />} />
        <Route path='/stock' element={<Stock showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}  />} />

        <Route path='/admin/dashboard' element={isLogin && role!=="student" ?<AdminDashboard showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />
        <Route path='/admin/register-student' element={isLogin && role!=="student" ?<RegisterStudent showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />
        <Route path='/admin/manage-medicine' element={isLogin && role!=="student" ?<ManageMedicine showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />
        <Route path='/admin/records' element={isLogin && role!=="student" ?<Record showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />
        <Route path='/admin/faciltity' element={isLogin && role!=="student" ?<AdminFacilitiy showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />
        <Route path='/admin/hospitals' element={isLogin && role!=="student" ?<NearByHospitalsManage showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />
        <Route path='/admin/gallary' element={isLogin && role!=="student" ?<GallaryAdmin showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />

        <Route path='/student/:id' element={isLogin && role==="student"?<StudentDashboard showLoader={showLoader} hideLoader={hideLoader} showGlobalError={showGlobalError} hideGlobalError={hideGlobalError}/>:<Navigate to="/" />} />


      </Routes>}
      {loader && <GlobalLoader />}
      <Footer />
    </div>
  );
}

export default App;
