import './App.css'
import { Routes, Router, Route } from 'react-router-dom'
import AvmetTable from './Table'
import UpdateForm from './UpdateForm'

function App() {

  return (
    <>
      <h1>AvMet accountability</h1>
      <Routes>
          <Route path='/:id' element={ <UpdateForm />}/>
          <Route path='/' element={ <AvmetTable />}/>
      </Routes>

    </>
  )
}

export default App
