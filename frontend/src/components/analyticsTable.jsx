import PropTypes from 'prop-types'

const AnalyticsTable = ({foods}) =>{

    const calculateCounts = () => {
        const foodCounts = {}

        foods.forEach((food) => {
            const { food: foodType } = food
            foodCounts[foodType] = (foodCounts[foodType] || 0) + 1
        })

        return foodCounts
    }

    const foodCounts = calculateCounts()
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Pitsa</th>
                    <th>Kebab</th>
                    <th>Ranskalaiset</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{foodCounts['Pitsa'] || 0}</td>
                    <td>{foodCounts['Kebab'] || 0}</td>
                    <td>{foodCounts['Ranskalaiset'] || 0}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


AnalyticsTable.propTypes = {
    foods: PropTypes.arrayOf(
        PropTypes.shape({
            food: PropTypes.string.isRequired,
            
        })
    ).isRequired
}

export default AnalyticsTable