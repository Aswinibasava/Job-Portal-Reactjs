import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter,setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false)

    const[jobs,setJobs] = useState([])

    //state variable for login btn on recruiter page
    const [showRecruiterLogin,setShowRecruiterLogin] = useState(false) // adding this state variabloe in the value set so that it can be used anywhere
    
    //fun to fetch jobs -- here we fetch from assets files
    const fetchJobs = async() => {
       setJobs(jobsData) 
    }
//the upper line works -- when we create backend  then we fetch jobsdata from our api
    useEffect (() => {
        fetchJobs()
    })
    // we have added here in this so that we can access from any component so these contexts created 
    const value = {  
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin //whenever cross icon clicked the wholes has to vanish for that this used

    }

    return (<AppContext.Provider value={value}>
    {props.children}
    </AppContext.Provider>)
}