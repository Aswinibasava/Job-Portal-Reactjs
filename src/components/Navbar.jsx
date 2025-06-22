import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom' //react-router-dom the link component is import so that it navigates to multiple pages without refreshing
import { AppContext } from '../context/AppContext'
//these buttons helps you to create pop up,to user button and to check whether user logged in or not

const Navbar = () => {
//using this sign in func it opens sign in pop up   and to display it we add onclick fun for button login

    const{openSignIn} =useClerk()
    const{user}=useUser()//if user logged in we will get that data if not we wont

    const navigate = useNavigate() //when this logo clicked we go to homepage

    const {setShowRecruiterLogin} = useContext(AppContext)
    return (
        <div className='shadow py-4'>
            <div className='container px-4 2x1:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
               {
                user//after login recruiter login buttons should be vanished so its for that
                ?<div className='flex items-center gap-3'> 
                <Link to={'/applications'}>Applied Jobs</Link>
                <p>|</p>
                <p className='max-sm:hidden'>Hi,{user.firstName+" "+user.lastName}</p>
                <UserButton />
                </div>
                : <div className='flex gap-4 max-sm:text-xs'> {/*whenever user clicks on login it will enable recruiterlogin component here*/}
                    <button onClick={ e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                    <button onClick={ e => openSignIn()}className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full' >Login</button>
                </div>
               }
               
            </div>
        </div>
    )
}

export default Navbar