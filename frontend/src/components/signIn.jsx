import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'
import loginService from '../services/login'
import foodService from '../services/foods'

const SignInPage = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const logginUser = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(        
        'loggedappUser', JSON.stringify(logginUser)      
      ) 
      
      setUser(logginUser.username)
     
      foodService.setToken(logginUser.token)
      setUsername('')
      setPassword('')
      navigate('/')
      
    } catch (exception) {
      setErrorMessage('Väärä käyttäjänimi tai salasana')
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
    }

  return (
    <div className="sign-in-page">
      <h2>Kirjaudu sisään</h2>
      
      <p><a href="/luotili">Jos sinulla ei ole tiliä, Luo käyttäjä</a></p>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjänimi
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
  
        <div>
          Salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button type="submit">Kirjaudu</button>
        <p style={{ color: 'red' }} >{errorMessage}</p>
        </div>
      </form>
      <button><a href="/unohtunutsalasana">Oletko unohtanut salasanasi?</a></button>
      <button onClick={() => navigate('/')}>Peruuta</button>
    </div>
  )
}

SignInPage.propTypes = {
  setUser: PropTypes.func,
}

export default SignInPage
