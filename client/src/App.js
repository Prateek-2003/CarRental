import './App.css';
import React from 'react';
 import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
 import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import PrivateRoute from './pages/PrivateRoute';
import BookingCar from './pages/BookingCar'
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
 //import 'antd/dist/antd.css';

const App = () => {
  
  return (
    <Router> 
    <Routes>
      <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute> 
          }
        />
      <Route path="/login" element={<Login/>}/> 
      <Route path="/register" element={<Register/>}/>

        <Route
          path="/booking/:carid"
          element={
            <PrivateRoute>
              <BookingCar />
            </PrivateRoute>
          }
        />

        <Route
          path="/userbookings"
          element={
            <PrivateRoute>
              <UserBookings />
            </PrivateRoute>
          }
        />
       <Route
          path="/addcar"
          element={
            <PrivateRoute>
              <AddCar/>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminHome/>
            </PrivateRoute>
          }
        />
        <Route
          path="/editcar/:carid"
          element={
            <PrivateRoute>
              <EditCar />
            </PrivateRoute>
          }
        />
     </Routes>
     </Router>  
  )
}

export default App;

