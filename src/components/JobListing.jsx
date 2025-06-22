import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const{isSearched,searchFilter,setSearchFilter,jobs} =useContext(AppContext)

    const [showFilter,setShowFilter] =useState(true)
    const [currentPage,setCurrentPage] =useState(1) // like we are at page 1 
    const[selectedCategories,setSelectedCategories] = useState([]) //we created empty array and a state variable to store data of search result
    const[selectedLocations,setSelectedLocations]= useState([])

    const[filteredJobs,setFilteredJobs] = useState(jobs) //state variable to sotre filtered job data filteredjobs variable setfilteredjobs func and intiliase it with jobs data which we got from context intilisaing this filtered jobs using jobs array

    const handleCategoryChange =(category) => { //we get category here from input field
      setSelectedCategories(
      prev => prev.includes(category) ? prev.filter(c => c  !== category) : [...prev,category] //... is spread operator used to return that selected array
      ) //this logic works for if selected category is already there  it will  be removed  if it is not there then willl be added 
    }

    const handleLocationChange =(location) => { //we get category here from input field
      setSelectedLocations(
      prev => prev.includes(location) ? prev.filter(c => c  !== location) : [...prev,location] //... is spread operator used to return that selected array
      ) //this logic works for if selected loc is already there  it will  be removed  if it is not there then willl be added 
    }
    {/* we have selected category data from  const[selectedCategories,setSelectedCategories similarly for location in selectedlocations  and then searchfilter data in const[isSearched,searchfilter,setsearchfilter,jobs.. these all data we have which we got from hero] */}
    {/*  by using this data we will create a filter that willl filter the data and store it in array filterjobs which we created in  const[filteredJobs,setFilteredJobs] = useState(jobs) */}
    useEffect(() => {

      const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
      //so basically thos filter for length and sees if selectecd category is there or not if not there is .length==0 if there and if  we have filter for category and it includes the jobcategory and if that category already available then job is filtered

      const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
      //one more filter for title search if in search bar title is entered then we filter it
      const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
 //we used to lowercase here so that even if full stack is searched instead of Full Stack it should show result nahh thats whyyyyy --wohooooooo :)))
      const matchesSearchLocation = job => searchFilter.location=== "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

      const newFilteredJobs = jobs.slice().reverse().filter( //reverse used so that we get new data first
        job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
      ) // now this variable contains all the data that we used above
      // now we have all the data in newFileteredJobs now willl save this data in our state variable  filteredJob ---  const[filteredJobs,setFilteredJobs] = useState(jobs)
     
      
      setFilteredJobs(newFilteredJobs) // data is saved here in this variable 
      setCurrentPage(1) //pagination comes to first page

    },[jobs,selectedCategories,selectedLocations,searchFilter]) //[] this is dependency array  // in upperline if empty string we just pass all the data

    
  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 '>

        {/*sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
      
      {/* search filter from hero component*/}
      {// we use ternary operator if anything searched we will show that keywords in the side we display loc and title
          isSearched && (searchFilter.title !=="" || searchFilter.location !=="") && (
            <>
                <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                <div className='mb-4 text-gray-600'>
                    {searchFilter.title && (
                      <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                      {searchFilter.title} 
                       
                      <img onClick={ e => setSearchFilter(prev => ({...prev,title:""}))} className='cursor-pointer' src={assets.cross_icon} alt=''/>
                      </span>  
                    )}
                    
                    {searchFilter.location && (
                      <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                        {searchFilter.location} 
                      <img  onClick={ e => setSearchFilter(prev => ({...prev,location:""}))} className='cursor-pointer' src={assets.cross_icon} alt=''/>

                      </span>  
                    )}
                </div>
            </>
          )
      }
      <button onClick={ e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'> {/* this btn only for phone screen*/}
        {showFilter ? "Close" : "Filters"}
      </button>

      {/*category filter */}
      <div className={showFilter ? "": "max-lg:hidden"}>
        <h4 className='font-medium text-lg py-4 '>Search by Categories</h4>
        <ul className='space-y-4 text-gray-600'>
            {
                JobCategories.map((category,index)=>(
                    <li className='flex gap-3 items-center'key={index}>
                    <input
                     className='scale-125' 
                     type="checkbox" 
                     onChange={ () => handleCategoryChange(category)}
                      checked = {selectedCategories.includes(category)} //if selected category is already there returns true and give checked 
                     />
                    {category}
                    </li>
                ))
            }
        </ul>
      </div>
       {/*Location filter */}
       <div className={showFilter ? "": "max-lg:hidden"}>
        <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
        <ul className='space-y-4 text-gray-600'>
            {
                JobLocations.map((location,index)=>(
                    <li className='flex gap-3 items-center'key={index}>
                    <input
                     className='scale-125'
                      type="checkbox" 
                      onChange={ () => handleLocationChange(location)} //loc is cmng from map here
                      checked = {selectedLocations.includes(location)} //if array contains loc it becomes true and our checkbox willl be checked

                      />
                    {location}
                    </li>
                ))
            }
        </ul>
      </div>

      </div>  

      {/* Job listings */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2 ' id='job-list'>Latest jobs</h3>
        <p className='mb-8'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'> {/* to show only 6 per slide used slice method */}
        {/* intially wrote jobs.slice now it is filteredjobs.slice as it takes through search*/}
        {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=> (
            <JobCard key={index} job={job}/>
        ))}

        </div>

        {/* pagination*/} 
        {/* to update index-----so after doing filtering this is not updating like it is only showing that job resukts and next pages empty so for that change jobs.length to filteredjobs.len*/}
        {filteredJobs.length > 0 && (
            <div className='flex items-center justify-center space-x-2 mt-10'>
                <a href="#job-list">
                    <img onClick={() => setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" />         
                 </a> 
                 {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index) => (
                    <a key={index} href="#job-list"> {/* here setcurrentpage lets us show that six on 1st page then next 6 on 2nd page like that ---- template literals used down to write ternary condition */}
                        <button onClick={() => setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index+1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                    </a>
                 ))}
                 <a href="#job-list">
                    <img onClick={() => setCurrentPage(Math.min(currentPage+1),Math.ceil(filteredJobs.length/6))} src={assets.right_arrow_icon} alt="" />         
                 </a>  {/* now after changing all jobs to filteredjobs.len the down page is updated like if only 3 jobs it only shows page.no 1 down unlike 1 2 3 4  */}
            </div> //math.ceil helps you to calculate how many those blocks should be there for a page so for page 1 six so total/6 for pages basically
        )}
      </section>
    </div>
  )
}

export default JobListing