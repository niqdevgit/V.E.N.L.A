import { useState } from "react"
import PropTypes from 'prop-types'
import loginService from '../services/login'

const SignInPage = ({user,setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const [errorMessage, setErrorMessage] = useState(null)
    
  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
      
    }

  console.log(username)
  return (
    <div className="sign-in-page">
      <h2>Sign In</h2>
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
  
        <button type="submit">Login</button>
      </form>
      <button><a href="/">Peruuta</a></button>
    </div>
  );
};

SignInPage.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func,
}

export default SignInPage;
