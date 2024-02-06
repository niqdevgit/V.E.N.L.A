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
      
      
      <form className='login-form' onSubmit={handleLogin}>
      <h2>Kirjaudu sisään</h2>
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
        <div className="submit-button-error-box">
        <button type="submit">Kirjaudu</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
      <button onClick={() => navigate('/luotili')}>Jos sinulla ei ole tiliä, Luo käyttäjä</button>
      <button onClick={() => navigate('/unohtunutsalasana')}>Oletko unohtanut salasanasi?</button>
      <button onClick={() => navigate('/')}>Peruuta</button>
    </div>
  )
}

SignInPage.propTypes = {
  setUser: PropTypes.func,
}

export default SignInPage
