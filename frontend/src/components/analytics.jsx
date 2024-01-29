import { useState, useEffect } from 'react'
import axios from 'axios'

const Analytics = () => {
    const [foods, setFoods] = useState([])
    const [sortByDate, setSortByDate] = useState(true)

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

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.')
        return new Date(`${year}-${month}-${day}`)
    }

    const sortedFoods = [...foods].sort((a, b) => {
        const dateA = parseDate(a.date)
        const dateB = parseDate(b.date)

        return sortByDate ? dateB - dateA : dateA - dateB
    })
   
    const toggleSortOrder = () => {
        setSortByDate((prevSortByDate) => !prevSortByDate)
    }

    const calculateCounts = () => {
        const foodCounts = {}

        sortedFoods.forEach((food) => {
            const { food: foodType } = food
            foodCounts[foodType] = (foodCounts[foodType] || 0) + 1
        })

        return foodCounts
    }

    const foodCounts = calculateCounts()

    return (
    <div>
        <h2>Katso tilastoja</h2>
        <button onClick={toggleSortOrder}>
            {sortByDate ?  'Vanhin ensin' : 'Uusin ensin'}
        </button>
        <p>Yhteensä:</p>
        <table>
    <thead>
      <tr>
        <th>Pitsa</th>
        <th>Kebab</th>
        <th>tbd</th>
        <th>tbd</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{foodCounts['Pitsa'] || 0}</td>
        <td>{foodCounts['Kebab'] || 0}</td>
        <td>tbd</td>
        <td>tbd</td>
      </tr>
    </tbody>
  </table>
        <ul>
            {sortedFoods.map(food => (
                <div key={food.id}>
                    <p>{food.food} {food.date}</p>
                </div>
            ))}
        </ul>
        
    </div>
    )
}

export default Analytics