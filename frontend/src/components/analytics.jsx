import { useState, useEffect } from 'react'
import axios from 'axios'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'

const Analytics = ({user,setUser}) => {
    const [foods, setFoods] = useState([])
    const [globalFoods, setGlobalFoods] = useState([])
    const [ownFoods, setOwnFoods] = useState([])
    const [globalStats, setGlobalStats] = useState(true)

    
    //global stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/foods")
                setGlobalFoods(response.data.data)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [])

    
    //personal stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const loggedUserJSON = window.localStorage.getItem('loggedappUser')
                const user = JSON.parse(loggedUserJSON)
                const token = `Bearer ${user.token}`
                const config = {
                    headers: { Authorization: token },
                  }
                const response = await axios.get("http://localhost:3001/api/foods",config)

    
                setOwnFoods(response.data.data)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [])

    const toggleSoloGLobal = () => {
        setGlobalStats(!globalStats) 
        if(globalStats){
            setFoods(globalFoods)
        }
        if(!globalStats){
            setFoods(ownFoods)
        }

    }
    
    return (
    <div>
        <a href="/">Palaa</a>
        <h2>Katso tilastoja</h2>
        <button onClick={toggleSoloGLobal}>
        {globalStats ?  'Omat tilastot' : 'Globaalit tilastot'}
    </button>
        <AnalyticsTable foods={foods}/>
        <br></br>
        <AnalyticsList foods={foods}/> 
    </div>
    )
}

export default Analytics