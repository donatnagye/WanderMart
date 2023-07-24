import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import './css/header.css'
import './css/login.css'
import './css/userHeader.css'
import './css/userProfile.css'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import HawkerSignUp from './pages/HawkerSignUp'
import HawkerSignIn from './pages/HawkerSignIn'
import UserProfile from './pages/UserProfile';
import HawkerProfile from './pages/HawkerProfile';
import HawkerEditProfile from './pages/HawkerEditProfile';
import Inventory from './pages/HawkerInventory';
import Verify from './pages/Verify';
import Favorite from './pages/Favorites';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path='/' element={<UserSignIn />} />
          <Route path='/user/signin' element={<UserSignIn />} />
          <Route path='/user/signup' element={<UserSignUp />} />
          <Route path='/hawker/signin' element={<HawkerSignIn />} />
          <Route path='/hawker/signup' element={<HawkerSignUp />} />
          <Route path='/:type/verify/:id' element={<Verify />} />
          <Route path='/user/home' element={<UserProfile />} />
          <Route path='/hawker/home' element={<HawkerProfile />} />
          <Route path='/hawker/edit/profile' element={<HawkerEditProfile />} />
          <Route path='/hawker/inventory' element={<Inventory />} />
		  <Route path='/user/favorite' element={<Favorite/>}/>
        </Routes>
      </Router>
    </div>
  );
}

