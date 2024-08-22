import './App.css'
import { Routes, Router, Route } from 'react-router-dom'
import AvmetTable from './Table'
import UpdateForm from './UpdateForm'
import LoginPage from './LoginPage'
import RegisterPage from './Register'
import axios from 'axios'

const url = 'http://localhost:3000/'

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  axios.defaults.withCredentials = true; // THIS IS VERY IMPORTANT TO INCLUDE!!!!
  return (
    <>
      <h1>AvMet accountability</h1>
      <Routes>
          <Route path='login' element= {<LoginPage/>}/>
          <Route path='register' element= {<RegisterPage/>}/>
          <Route path=':id' element={ <UpdateForm />}/>
          <Route path='/' element={ <AvmetTable />}/>
      </Routes>

    </>
  )
}

export default App
