import React, { use, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const RecruiterLogin = () => {
//3 hr 40 min can get your doubts clarified here 
    //state variable is created here to manage pop-up
    const[state,setState] =useState('Login') //so whenever we open default state is login
    const[name,setName] = useState('')
    const[password,setPassword] = useState('')
    const[email,setEmail] = useState('')
//image by recruiter company logo
    const[image,setImage] = useState('false')
 //to manage login btn func
    const[isTextDataSubmited,setIsTextDataSubmited] = useState(false)

//to vanish the recruiter login page when cross icon clicked
   const {setShowRecruiterLogin} = useContext(AppContext)
    

    const onSubmitHandler = async (e) => {
      e.preventDefault() // prevents from reload when u submit form

      if (state == "Sign Up" && !isTextDataSubmited){
        setIsTextDataSubmited(true)
      }

    }

    //so when login page opened it should not be able to scroll down on that homepage to stop that use useeffect
    useEffect(() =>{
      document.body.style.overflow = 'hidden'

      return () => {
      document.body.style.overflow = 'unset' //cannot scroll now
      }
    },[]) //dependency array

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
    <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500' >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm'>Welcome back! please sign in to continue</p>
        {state === "Sign Up" && isTextDataSubmited  //like if the data submitted for the recriter like company name mail and pass then this page opens recruiter sign up page 

        ? <> 
        <div className='flex items-center gap-4 my-10'>
          <label htmlFor="image">
            <img className='w-16 rounded-full' src={ assets.upload_area} alt=""/>
            <input onChange={e=>setImage(e.target.files[0])} type="file" id="image" hidden />
          </label> 
          <p>Upload Company <br /> logo</p> 
        </div> 



        </>
        :   <>

{state !== 'Login' &&  (
  <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
  <img src={assets.person_icon} alt='' />  {/*wehenevr we enter input value that is store in setname as we kept event there as e.target.value */}
  <input className='outline-none text-sm' onChange={ e => setName(e.target.value)} value={name} type='text' placeholder='Company name' required />
</div>
)} 

<div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
  <img src={assets.email_icon} alt='' />  {/*wehenevr we enter input value that is store in setname as we kept event there as e.target.value */}
  <input className='outline-none text-sm' onChange={ e => setEmail(e.target.value)} value={email} type='email' placeholder='Email Id' required />
</div>
<div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
  <img src={assets.lock_icon} alt='' />  {/*wehenevr we enter input value that is store in setname as we kept event there as e.target.value */}
  <input className='outline-none text-sm' onChange={ e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required />
</div>

</> }
        {state === "Login" && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password?</p>} 

       
        <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
            {state === 'Login' ? 'login' : isTextDataSubmited ? 'create account' : 'next'}
        </button>

        {
            state === 'Login'
           ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p>
           : <p className='mt-5 text-center'>Already haven an account? <span  className='text-blue-600 cursor-pointer'onClick={() => setState("Login")}>Login</span></p>
           
        }

        <img onClick={ e => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />

    </form>
    </div>
  )
}

export default RecruiterLogin