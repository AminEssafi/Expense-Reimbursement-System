import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Login } from './Components/LoginRegister/Login'
import { Register } from './Components/LoginRegister/Register'
import { Users } from './Components/Users/Users'
import { Reimbursements } from './Components/Reimbursements/Reimbursements'
import { PReimbursements } from './Components/Reimbursements/PReimbursements'
import { Managers } from './Components/Users/Managers'
import { Employees } from './Components/Users/Employees'
import { EReimbursements } from './Components/Reimbursements/EReimbursements'
import { PEReimbursements } from './Components/Reimbursements/PEReimbursements'
import { CReimbursements } from './Components/Reimbursements/CReimbursements'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path = "" element = {<Login/>}/>
        <Route path = "register" element = {<Register/>}/>
        <Route path = "users" element = {<Users/>}/>
        <Route path = "reimbursements" element = {<Reimbursements/>}/>
        <Route path = "preimbursements" element = {<PReimbursements/>}/>
        <Route path = "managers" element = {<Managers/>}/>
        <Route path = "employees" element = {<Employees/>}/>
        <Route path = "ereimbursements" element = {<EReimbursements/>}/>
        <Route path = "pereimbursements" element = {<PEReimbursements/>}/>
        <Route path = "creimbursements" element = {<CReimbursements/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App