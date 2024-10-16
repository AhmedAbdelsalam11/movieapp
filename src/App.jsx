import React, { useEffect, useState } from 'react';
import Home from './Component/Home';
import Movies from './Component/Movies'; 
import Tv from './Component/Tv'; 
import People from './Component/People'; 
import MovieDetails from './Component/MovieDetails'; 
import Login from './Component/Login';
import Register from './Component/Register'; 
import Navbar from './Component/Navbar';
import Notfound from './Component/Notfound';
import { jwtDecode } from 'jwt-decode';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Drawer from './Component/Drawer';

const App = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  function saveUserData() {
    const encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken);
      } catch (error) {
        
        localStorage.removeItem('userToken');
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }, []);

  function logOut() {
    setUserData(null);
    localStorage.removeItem('userToken'); 
    navigate('/login');
  }
  
  function ProtectedRoute({ children }) {
    if (localStorage.getItem('userToken') === null) {
      return <Navigate to='/login' />;
    }
    return children;
  }

  return (
    <div className="App">
      <Navbar userData={userData} logOut={logOut} />
      <Drawer />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/people" element={<ProtectedRoute><People /></ProtectedRoute>} />
        <Route path="/tv" element={<ProtectedRoute><Tv /></ProtectedRoute>} />
        <Route path="/moviedetails/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path="/login" element={<Login saveUserData={saveUserData} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;