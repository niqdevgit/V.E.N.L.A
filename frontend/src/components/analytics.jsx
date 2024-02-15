import { useState, useEffect } from 'react'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'
import foodService from '../services/foods'

const Analytics = () => {
    const [foods, setFoods] = useState([])
    const [globalFoods, setGlobalFoods] = useState([])
    const [ownFoods, setOwnFoods] = useState([])
    const [globalStats, setGlobalStats] = useState(true)
    const [foodStatus, setFoodStatus] = useState('global')
    const [foodOwnStatus, setOwnFoodStatus] = useState('')
    const [foodGlobalStatus, setGlobalFoodStatus] = useState('')
    
    //global stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const foods = await foodService.getAll()
                setGlobalFoods(foods.data)
                setGlobalFoodStatus(foods.status)
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
                setOwnFoods(foods.data)
                setOwnFoodStatus(foods.status)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [])
    
    
    
    useEffect(() => {
        setFoods(globalStats ? globalFoods : ownFoods)
        setFoodStatus(globalStats ? foodGlobalStatus : foodOwnStatus)
    }, [globalStats, globalFoods, ownFoods, foodStatus])
    
    const toggleSoloGLobal = () => {
        setGlobalStats(!globalStats)
    }
    return (
    <div>
        <button onClick={toggleSoloGLobal}>Vaihda</button>
    <p>{globalStats ?  'Näät globaalit tilastot' : 'Näät omat tilastot'}</p>
        <AnalyticsTable foods={foods}/>
        <br></br>
        <AnalyticsList foods={foods} foodStatus={foodStatus}/> 
    </div>
    )
}

export default Analytics