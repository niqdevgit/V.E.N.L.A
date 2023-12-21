import { useState } from "react";


// eslint-disable-next-line react/prop-types
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

export default SignInPage;
