
import { useEffect } from 'react';
import './App.css';
import NavBar from './custom_components/NavBar';
import Admin from './pages/admin/Admin';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Routes,Route } from 'react-router-dom';
import { startApi } from './custom_components/StartupApiCall';
function App() {
useEffect(()=>
{
  startApi();
},[])


  return (
   <>
  
   <NavBar/>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/cp" element={<Admin/>}/>
    <Route path="/home/*" element={<Home/>}/>
    </Routes>
   
   </>
  );
}

export default App;
