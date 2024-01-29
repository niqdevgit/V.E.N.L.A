import { useState } from 'react'

const AnalyticsList = ({foods}) => {

    const [sortByDate, setSortByDate] = useState(true)

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

    return (
        <div>
            <button onClick={toggleSortOrder}>
        {sortByDate ?  'Vanhin ensin' : 'Uusin ensin'}
    </button>
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

export default AnalyticsList