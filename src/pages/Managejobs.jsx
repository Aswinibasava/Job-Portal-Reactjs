import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'


const Managejobs = () => {
//navigate so when add new job clicked it takes to addjob page
  const navigate =  useNavigate()


  return (
    <div className='container p-4 max-w-5xl'>
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'> 
        <thead>
        <tr>
          <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
          <th className='py-2 px-4 border-b text-left'>Job title</th>
          <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
          <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
          <th className='py-2 px-4 border-b text-center'>Applicants</th>
          <th className='py-2 px-4 border-b text-left'>Visible</th>
          </tr>
        </thead>
        <tbody>
          {/*using dummy data from assets file which is around at line 96 where u have managejobsdata in that u have id title date and all  */}
          {/*for view applicatioms we took applicant and index to point to that here we use jobs an dindex ae we are referring to jobs here */}
          {manageJobsData.map( (job,index) => (
            <tr key={index} className='text-gray-700'>
            <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
            <td className='py-2 px-4 border-b'>{job.title}</td>
            <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td> {/*moment package contains the timestamp when the job was posted */}
            <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
            <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
            <td className='py-2 px-4 border-b'>
              <input className='scale-125 ml-4' type="checkbox" />
            </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='mt-4 flex justify-end'>
      <button onClick={ () => navigate('/dashboard/add-job')} className='bg-black text-white px-2 py-4 rounded' >Add new job</button>
    </div>
    </div>
  )
}

export default Managejobs