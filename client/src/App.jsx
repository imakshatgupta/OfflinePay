import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import HomeOnline from './pages/HomeOnline'
import HomeOffline from './pages/HomeOffline'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomeOnline />} />
        <Route path='/offlinePay' element={<HomeOffline />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
