import React from 'react'
import Navbar from './componenets/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './componenets/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBooking from './pages/MyBooking'
import HotelReg from './componenets/HotelReg'

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner")
  return (
    <div>
      { !isOwnerPath && <Navbar/>}
      {false && <HotelReg/>}
      <div className=' min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<AllRooms/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBooking/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App