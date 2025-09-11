import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { LoginSignin } from './components/LoginSignin'

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-signin' element={<LoginSignin />} />
      </Routes>
  )
}

export default App