import React, { useState } from 'react'

const MainTree = () => {
    const [step, setStep] = useState(0)

    
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
        setStep(3)
      }

      const kebabSelection = () => {
        setStep(3)
      }

      const friesSelection = () => {
        setStep(3)
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
}

export default MainTree