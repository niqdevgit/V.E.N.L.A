import { useState, useEffect } from 'react'
import axios from 'axios'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'

const Analytics = ({user,setUser}) => {
    const [foods, setFoods] = useState([])
    const [globalStats, setGlobalStats] = useState(true)

    
    //global stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/foods")
                setFoods(response.data)
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
                const response = await axios.get("http://localhost:3001/api/foods")
                setFoods(response.data)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [])

    const toggleSoloGLobal = () => {
        setGlobalStats(!globalStats) 
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