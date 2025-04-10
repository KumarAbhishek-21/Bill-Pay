import React from 'react'
import './App.css'
import Body from './Components/Body/Body'
import {Route, Routes} from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Complaints from './Pages/Complaints/Complaints'
import Transactions from './Pages/Transactions/Transactions'
import Bills from './Pages/Bills/Bills'
import UserPage from './Pages/UserPage/UserPage'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element= {<Body/>}/> 
      <Route path='/userpage' element={<UserPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/complaints' element={<Complaints/>}/>
      <Route path='/transactions' element={<Transactions/>}/>
      <Route path='/bills' element={<Bills/>}/>
      </Routes>
      
    </div>
  )
}

export default App
