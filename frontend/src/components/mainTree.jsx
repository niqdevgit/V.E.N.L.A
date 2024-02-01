import { useState } from 'react'
import axios from 'axios'
import foodService from '../services/foods'

const MainTree = () => {
    const [step, setStep] = useState(0)
    const [finalSelection, setFinalSelection] = useState('')
    
    const reset = () => {
        setStep(0)
      }

    const sizeSelection = () => {
        setStep(1)
      }

      const smallSelection = () => {
        setStep(2.1)
      }

      const largeSelection = () => {
        setStep(2)
      }

      const pizzaSelection = () => {
        setStep(4)
        setFinalSelection('Pitsa')
      }

      const kebabSelection = () => {
        setStep(4)
        setFinalSelection('Kebab')
      }

      const friesSelection = () => {
        setStep(3)
      }

      
      const saveData = () => {
        const today = new Date().toLocaleDateString()
        

        const foodObject = {
          food: finalSelection,
          date: today,
        }
      
        const config = {    
          headers: { Authorization: token },  
        }

        axios    
        .post('http://localhost:3001/api/foods', foodObject, config)    
        .then(response => {      
          console.log(response)    
        })

        setStep(0)
      }

    if(step === 0) {
    return (
    <div>
         <button onClick={sizeSelection}>Aloita ruuan valinta</button>
    </div>
    )
  }

  if(step === 1) {
    return (
    <div>
        <button onClick={smallSelection}>Pieni</button>
        <button onClick={largeSelection}>Iso</button>
        <button style={{ marginLeft: '15px' }} onClick={reset}>Alkuun</button>
    </div>
    )
  }

  if(step === 2) {
    return (
    <div>
        <button onClick={pizzaSelection}>Pitsa</button>
        <button onClick={kebabSelection}>Kebab</button>
        <button onClick={friesSelection}>Ranskalaiset</button>
        <button style={{ marginLeft: '15px' }} onClick={reset}>Alkuun</button>
    </div>
    )
  }

  if(step === 2.1) {
    return (
    <div>
        <p>Älä syö pineen nälkään</p>
        <button style={{ marginLeft: '15px' }} onClick={reset}>Alkuun</button>
    </div>
    )
  }

  if(step === 4) {
    return (
    <div>
        <p>Tallennetaanko valinta?</p>
        <button style={{ marginLeft: '15px' }} onClick={saveData}>Tallenna</button>
        <button style={{ marginLeft: '15px' }} onClick={reset}>Alkuun</button>
    </div>
    )
  }

}

export default MainTree