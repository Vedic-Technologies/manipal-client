
import './App.css';
import Admin from './pages/admin/Admin';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (
   <>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/cp" element={<Admin/>}/>
    <Route path="/home/*" element={<Home/>}/>
    </Routes>
   
   </>
  );
}

export default App;
