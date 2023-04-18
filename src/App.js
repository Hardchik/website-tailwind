import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Dashboard, SignIn, SignUp, Home, Auth} from './components'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/auth' element={<Auth />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<SignIn /> } />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/' element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}