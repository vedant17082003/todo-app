import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./Home"
import Registration from './Registration'  // Corrected the import
import User from './User'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <div className='bg-blue-400 text-white min-h-screen'>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
