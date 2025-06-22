import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Managejobs from './pages/Managejobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
const App = () => {
//Routes help simulate multi-page behavior without reloading
  const{showRecruiterLogin} = useContext(AppContext) //if state is true here then only we render throught <recruiter/> component
  return (
    <div>
     { showRecruiterLogin && <RecruiterLogin /> } {/*this will render this compoennt if only showrecruiterlogin is true */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/dashboard' element={<Dashboard/>} >
        <Route path='add-job' element={<AddJob />} />
        <Route path='manage-jobs' element={<Managejobs />} />
        <Route path='view-applications' element={<ViewApplications />} />
        </Route> 
        
      </Routes>
    </div> //these are nested routes inside dashboard to run them we need outlet or else even u open http://localhost:5173/dashboard/add-job it will show dashboard only for that go to dashboard.jsx and change there
    //after adding <outlet/> in dashbaird now we get both dashbioard and add-job for http://localhost:5173/dashboard/add-job haha 

  )
}

export default App