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
      console.error("Error during login:", exception)
      setErrorMessage('Wrong credentials')
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
    }

  return (
    <div className="sign-up-page">
      <h2>Luo tili</h2>
      <form onSubmit={handleSingUp}>
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
  
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/')}>Peruuta</button>
    </div>
  )
}

SignUpPage.propTypes = {
  setUser: PropTypes.func,
}

export default SignUpPage;
