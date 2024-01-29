import { useState, useEffect } from 'react'
import axios from 'axios'

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
        };

        fetchData()
    }, [])
   

   
  


    return (
    <div>
        <p>Katso tilastoja</p>
        <ul>
            {foods.map(food => (
                <li key={food.id}>
                    <p>Food: {food.food}</p>
                    <p>Date: {food.date}</p>
                </li>
            ))}
        </ul>
        
    </div>
    )
}

export default Analytics