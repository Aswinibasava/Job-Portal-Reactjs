import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { assets, jobsData } from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
const ApplyJob = () => {
 //  here id used coz in app.jsx the path is <Route path='/apply-job/:id' element={<ApplyJob/>} /> :id is there so any after : should be added here 

  const{ id} = useParams()

  const [JobData,setJobData] = useState(null)

  const {jobs} =useContext(AppContext)

  const fetchJob = async () => { //async func?
    const data = jobs.filter(job => job._id == id)
    //if this id== id true then we have store that data in array like for that id what info we have
    if(data.length !== 0){
      setJobData(data[0])
      console.log(data[0])
    }
  }

  useEffect(() => {
    if(jobs.length >0) {
      fetchJob() 
    }
   
  },[id,jobs]) //this is dependency array this stores that id whenver job id changed this func is called

  return JobData ? ( //adding false{replaced with jobdata now} actually shows some type of loading until fetchdata fetches data from api loading animation is shown till then
    <>
    <Navbar/>
    <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
      <div className='bg-white text-black rounded-lg w-ful'>
        <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border-sky-400 rounded-xl'>
          <div className='flex flex-col md:flex-row items-center'>
            <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={JobData.companyId.image} alt="" />
            <div className='text-center md:text-left text-neutral-70'>
              <h1 className='text-2xl sm:text-4xl font-medium'>
                {JobData.title}
              </h1>
              <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                <span className='flex items-center gap-1'>
                  <img src={assets.suitcase_icon} alt="" />
                  {JobData.companyId.name}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.location_icon} alt="" />
                  {JobData.location}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.person_icon} alt='' />
                  {JobData.level}
                </span>

                <span className='flex items-center gap-1'>
                  <img src={assets.money_icon} alt='' />
                  CTC: {Kconvert.convertTo(JobData.salary)} {/*k-converter package is used here to convert 91000 to 91k u just need to paste one line which is npm i k-convert and boom */}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-end text-sm max-md:text-center'>
            <button className='bg-blue-600 p-2.5 px-10 text-white rounded'>Apply Now </button>
            <p className='mt-1 text-gray-600'>Posted {moment(JobData.date).fromNow()}</p>
          </div>

        </div>

        <div className='flex flex-col lg:flex-row justify-between items-start'>
        <div className='w-full lg:w-2/3' >
          <h2 className='font-bold text-2xl mb-4'>Job description</h2>
          <div className='rich-text' dangerouslySetInnerHTML={{__html:JobData.description}}></div> {/*just observed smtng if i give gap btw >< in //JobData.description}}></div>  my entire page is vanishied idk yy damnn also if i keep </div> in next it is working fine but if i give gap like >  </div> its not working*/}
           <button className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10'>Apply Now </button>

        </div>
        {/* right section to get more jobs*/}
        <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg-ml-8 space-y-5 '>
         <h2>More jobs from {JobData.companyId.name}</h2>
         {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
         .filter(job => true).slice(0,4) //this works when we create backend after user login we create filter that filter jobs then  applied job will not appear here will wrote that logic after creating backend 
         .map((job,index) => <JobCard key={index} job={job} /> )}  {/*so that right side we dont show the current searched job && 2nd condn is  we add job related to that searched company by comparing our jobdata company with searched job company*/}
        </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  ) : (
   <Loading/>
   
  )
}

export default ApplyJob