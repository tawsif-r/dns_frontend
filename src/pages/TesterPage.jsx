import React,{ useState, useEffect }from 'react'
import axios from 'axios'


const TesterPage = () => {

    //  ======================================================================== 
    //         STATES
    //  ======================================================================== 
    const [plans , setPlans] = useState([])


    //  ======================================================================== 
    //         FETCH
    //  ======================================================================== 


    useEffect(()=>{
        // use Effect us there to react to any kind of change
        const fetchPlans = async () => {
            const response = await axios.get("http://10.0.0.27:8000/admin/api/subscriptionplans/")
            // Now that we have the response we need to save it in a state to be able to use it 
            // inside the page and also react to it.

            setPlans(response.data)
            console.log(response.data)
        }
        fetchPlans()
    },[]
    
    )

        
    return (
        <div className='bg-slate-600 min-h-screen text-white'>
            {/* * Add fetch
            * Add Update
            * Add Add
            * Add Delete */}
        





        </div>

    )
}

export default TesterPage