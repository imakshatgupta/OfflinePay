import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import QrCode from './pages/QrCode'
import QrScanner from './pages/QrScanner'
import Transaction from './pages/Transaction'
import CheckBalance from './pages/CheckBalance'
import HomeOnline from './pages/HomeOnline'
import HomeOffline from './pages/HomeOffline'
import EncryptedData from './pages/EncryptedData'
import OfflinePay from './pages/OfflinePay'
import PayUPI from './pages/PayUPI'
import CheckBalanceOffline from './pages/CheckBalanceOffline'
import TransactionOffline from './pages/TransactionOffline'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeOnline />} />
        <Route path='/offlinePay' element={<HomeOffline />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/qr' element={<QrCode />} />
        <Route path='/qrscanner' element={<QrScanner />} />
        <Route path='/payUpi' element={<PayUPI />} />
        <Route path="/encrypt" element={<EncryptedData />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/transactionOffline' element={<TransactionOffline />} />
        <Route path='/checkBalance' element={<CheckBalance />} />
        <Route path="/offline" element={<OfflinePay />} />
        <Route path="/checkbalanceoffline" element={<CheckBalanceOffline />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
