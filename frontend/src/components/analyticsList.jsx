import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AnalyticsList = ({foods}) => {

    const [sortByDate, setSortByDate] = useState(true)
    const [foodsWithEmoji, setFoodsWithEmoji] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('default')

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.')
        return new Date(`${year}-${month}-${day}`)
    }

    const sortedFoods = [...foodsWithEmoji].sort((a, b) => {
        const dateA = parseDate(a.date)
        const dateB = parseDate(b.date)

        return sortByDate ? dateB - dateA : dateA - dateB
    })
   
    const toggleSortOrder = () => {
        setSortByDate((prevSortByDate) => !prevSortByDate)
    }


    useEffect(() => {
        const addEmojiToFood = (foodName) => {
            switch (foodName) {
                case 'Pitsa':
                    return '🍕'
                case 'Ranskalaiset':
                    return '🍟'
                case 'Kebab':
                    return '🌯'
                default:
                    return ''
            }
        }

        const filteredFoods = selectedFilter !== 'default' ? foods.filter(food => food.food === selectedFilter) : foods

        const foodsWithEmoji = filteredFoods.map(food => ({
            ...food,
            foodWithEmoji: food.food + ' ' + addEmojiToFood(food.food)
        }));

        setFoodsWithEmoji(foodsWithEmoji)
    }, [foods, selectedFilter])

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>
            <div className='flex-box'>
            <button onClick={toggleSortOrder}>
                {sortByDate ?  'Vanhin ensin' : 'Uusin ensin'}
            </button>
            <select id="selectFilter" onChange={handleFilterChange} value={selectedFilter}>
                <option value="default">Ei filtteriä</option>
                <option value="Pitsa">Pitsa</option> 
                <option value="Ranskalaiset">Ranskalaiset</option>
                <option value="Kebab">Kebab</option>
            </select>
            </div>
            <div className='scrollable-div'>
                <ul>
                    {sortedFoods.map(food => (
                         <div key={food.id} className="food-item">
                         <p className="food-name">{food.foodWithEmoji}</p>
                         <p className="food-date">{food.date}</p>
                     </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

AnalyticsList.propTypes = {
    foods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        food: PropTypes.string,
        date: PropTypes.string,
      })
    )
  }

export default AnalyticsList