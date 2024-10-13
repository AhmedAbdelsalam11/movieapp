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
    <>
      <Navbar userData={userData} logOut={logOut} />
      <Drawer />
      <Routes>
       

          <Route
            index
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people"
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <People />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv"
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <Tv />
              </ProtectedRoute>
            }
          />
          <Route
            path="/moviedetails/:id"
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute
                isAllowed={!userData?.jwt}
                redirectPath="/"
                data={userData}
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute
                isAllowed={!userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <Register />
              </ProtectedRoute>
            }
          />
       


        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;