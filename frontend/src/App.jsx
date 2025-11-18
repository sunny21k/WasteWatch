import React from 'react'
import {Route, Routes, useLocation} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { LoginSignin } from './components/LoginSignin'
import ReportWaste from './pages/ReportWaste'
import CollectWaste from './pages/CollectWaste'
import Leaderboard from './pages/Leaderboard'
import Rewards from './pages/Rewards'
import Footer from './components/Footer'
import HowItWorks from './pages/HowItWorks'
import Dashboard from './pages/admin/Dashboard'
import AdminRoute from './components/admin/adminRoute'

const App = () => {

  const location = useLocation();

  const hideLayout = location.pathname === "/login-signin"

  return (
    <div className='flex flex-col min-h-screen '>
    {!hideLayout && <Navbar />}

    <main className='flex-grow'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-signin' element={<LoginSignin />} />
        <Route path='/report-waste' element={<ReportWaste />} />
        <Route path='/collect-waste' element={<CollectWaste />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/rewards' element={<Rewards />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/admin' 
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </main>

      {!hideLayout && <Footer />}
      </div>
  )
}

export default App