import { useState, useEffect } from 'react'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'
import foodService from '../services/foods'

const Analytics = () => {
    const [foods, setFoods] = useState([])
    const [globalFoods, setGlobalFoods] = useState([])
    const [ownFoods, setOwnFoods] = useState([])
    const [globalStats, setGlobalStats] = useState(true)
    
    //global stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const foods = await foodService.getAll()
                setGlobalFoods(foods)
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
                const foods = await foodService.getUserFoods()
                setOwnFoods(foods)
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