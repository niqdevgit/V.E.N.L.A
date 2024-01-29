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
        </div>
    )
}

export default AnalyticsTable