import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'
import userService from '../services/user'
import foodService from '../services/foods'
import loginService from '../services/login'


const SignUpPage = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    
  
  const handleSingUp = async (event) => {
    event.preventDefault()
    try {
      await userService.singUp({
        username,
        password,
      })


      const logginUser = await loginService.login({
          username,
          password,
        })
        
      window.localStorage.setItem(        
        'loggedappUser', JSON.stringify(logginUser)      
      )
      foodService.setToken(logginUser.token)
      setUsername('')
      setPassword('')
      navigate('/')
      
    } catch (exception) {
      if(exception.response.status === 409){
        setErrorMessage('Käyttäjänimi on jo käytössä')
      } else {
        setErrorMessage('Virhe tapahtui, uritä myöhemmin uudelleen')
      }
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
    }

  return (
    <div className="sign-up-page">
      <form className="login-form" onSubmit={handleSingUp}>
      <h2>Luo tili</h2>
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
        <button type="submit">Luo tili</button>
        <p style={{ color: 'red' }} >{errorMessage}</p>
        </div>
      </form>
      <button onClick={() => navigate('/')}>Peruuta</button>
    </div>
  )
}

SignUpPage.propTypes = {
  setUser: PropTypes.func,
}

export default SignUpPage;
