import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './custom_components/NavBar';
import Admin from './pages/admin/Admin';
import SuperAdmin from './pages/admin/SuperAdmin';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Routes, Route, useLocation } from 'react-router-dom';
import { startApi } from './custom_components/StartupApiCall';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    startApi();
    // Simulate authentication logic
    const userTypeString = localStorage.getItem("currentUser");
    if (userTypeString) {
      const currentUserData = JSON.parse(userTypeString);
      const userType = currentUserData?.user?.userType;
      const isAuthenticated = userType === 'admin' || userType === 'staff';
      setIsLoggedIn(isAuthenticated);
    }
  }, []);

  // Render NavBar only if logged in and not on the login page
  const renderNavBar = isLoggedIn && location.pathname !== '/';

  return (
    <>
      {renderNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cp" element={<Admin />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/SuperAdmin/*" element={<SuperAdmin />} />
      </Routes>
    </>
  );
}

export default App;
