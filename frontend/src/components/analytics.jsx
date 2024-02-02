import { useState, useEffect } from 'react'
import axios from 'axios'
import AnalyticsTable from './analyticsTable'
import AnalyticsList from './analyticsList'

const Analytics = ({user,setUser}) => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        const storedUser = window.localStorage.getItem('loggedappUser')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser.name)
        }
        }, [])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const usernameQueryParam = encodeURIComponent(user)
                console.log(usernameQueryParam)
                const response = await axios.get("http://localhost:3001/api/foods")
                setFoods(response.data)
            } catch (error) {
                console.error('Error fetching food data:', error)
            }
        }
        fetchData()
    }, [user])

    
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