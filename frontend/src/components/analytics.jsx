import { useState, useEffect } from 'react'
import axios from 'axios'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'

const Analytics = () => {
    const [foods, setFoods] = useState([])
    const [globalFoods, setGlobalFoods] = useState([])
    const [ownFoods, setOwnFoods] = useState([])
    const [globalStats, setGlobalStats] = useState(true)

    
    //global stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/foods")
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
                const response = await axios.get("/api/foods",config)

    
                setOwnFoods(response.data.data)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setFoods(globalStats ? globalFoods : ownFoods)
      }, [globalStats, globalFoods, ownFoods])

    const toggleSoloGLobal = () => {
        setGlobalStats(!globalStats)
    }
    
    return (
    <div>
        <button onClick={toggleSoloGLobal}>Vaihda</button>
    <p>{globalStats ?  'Näät globaalit tilastot' : 'Näät omat tilastot'}</p>
        <AnalyticsTable foods={foods}/>
        <br></br>
        <AnalyticsList foods={foods}/> 
    </div>
    )
}

export default Analytics