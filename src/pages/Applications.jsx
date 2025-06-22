import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {
   
   //creating a state variable isedit so that if it is on we will provide option to edit resume 
   const[isEdit,setIsEdit] = useState(false)
   const[resume,setResume] = useState(null) //so basically this is used to store the rrsume data taht is added in the input field
  return (
    <>
    <Navbar />
    <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
      { //so basically usestate is false so first 2nd part of ternary operator will be there when it is set to true the 1st part works
        isEdit  //ternary operator is isedit if true 1st condn else 2nd
        ? <> 
        <label className='flex items-center' htmlFor='resumeupload' >
          <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Resume</p>
          <input id='resumeupload' onChange={ e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
          <img src={assets.profile_upload_icon} alt='' />
        </label>
        {/*here again setisedit state is changed to false so that when clicked on save we can able to see the resume edit again state is false clicking on save makes state to true and again changes and works that ternary operator 2nd func */}
        <button onClick={ e =>setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
        </>
        : <div className='flex gap-2'>
        <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">  {/* here link is for resume */}
          Resume
        </a>  {/*clicking on this makes setIsedit func true and this goes to isedit first part in the ternary func */}
        <button onClick={ () => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
          Edit
        </button>
          </div>
      }
      </div>
      <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
      <table className='min-w-full bg-white border rounded-lg'>
        <thead >
          <tr>
            <th className='py-3 px-4 border-b text-left'>Company </th>
            <th className='py-3 px-4 border-b text-left'>Job Title </th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden '>Location </th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date </th>
            <th className='py-3 px-4 border-b text-left'>Status</th>   
          </tr>
        </thead>
        <tbody>   {/*job.jobId(now changed to true) ( like when we create backend then we chk for jobid) 
        is actuallly checking if for the job we have if theres id then only we display applied jobs if we domt have jobid in our job then we will not render the data */}
          {jobsApplied.map( (job,index) => true ? (
           <tr>
           <td className='py-3 px-4 flex items-center gap-2 border-b'>
            <img  className='w-8 h-8'src={job.logo} alt='' />
            {job.company}
           </td>
           <td className='py-2 px-4 border-b'>{job.title}</td>
           <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
           <td className='py-2 px-4 border-b max-sm:hidden '>{job.location}</td>
           <td className='py-2 px-4 border-b'>
           <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100' } px-4 py-1.5 rounded`}>
           {job.status}
           </span>
          </td>

           </tr> 
          ) : (null) )}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  )
}

export default Applications