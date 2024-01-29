import { useState, useEffect } from 'react'
import axios from 'axios'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'

const Analytics = () => {
    const [foods, setFoods] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/foods')
                setFoods(response.data)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [])

    
    return (
    <div>
        <a href="/">Palaa</a>
        <h2>Katso tilastoja</h2>
        <AnalyticsTable foods={foods}/>
        <br></br>
        <AnalyticsList foods={foods}/> 
    </div>
    )
}

export default Analytics