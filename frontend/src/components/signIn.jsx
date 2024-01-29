import { useState } from "react"
import PropTypes from 'prop-types'

const SignInPage = ({user,setUser}) => {
    const [username, setUsername] = useState('')
  

    console.log(user)
    const handleSignIn = () => {
        setUser(username)
        console.log('user set')
       
      };
    
      const handleInputChange = (event) => {
        setUsername(event.target.value)
      };

      console.log(username)
  return (
    <div className="sign-in-page">
      <h2>Sign In</h2>
      <input value={username}
        onChange={handleInputChange}></input>
      <br></br>
      <button onClick={handleSignIn}>Kirjaudu</button>
      <button><a href="/">Peruuta</a></button>
    </div>
  );
};

SignInPage.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func,
}

export default SignInPage;
