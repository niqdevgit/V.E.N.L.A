import { useState } from "react"
import { useNavigate } from "react-router-dom"
import userService from '../services/user'

const DeleteUser = (user) =>{
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    const username = user.user
    const handleUserDeletion = async (event) => {
        event.preventDefault()
        try {
          await userService.delUser({
            username,
            password,
          })
  
          window.localStorage.clear()

          navigate('/')
          
        } catch (exception){
          setErrorMessage('Väärä salasana')
        
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
            } 
        }


    return(
        <div>
            <a href="/">Palaa</a>
            <p>Kirjoita kenttään salasanasi jos haluat poistaa tilisi ja kaikki sen tiedot</p>
            <p>Poistoa ei voi perua!</p>
            
            <form onSubmit={handleUserDeletion}>
       
  
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
        <button type="submit">Poista käyttäjä</button>
        <p style={{ color: 'red' }} >{errorMessage}</p>
        </div>
      </form>

            <p><a href="/unohtunutsalasana">Oletko unohtanut salasanasi?</a></p>
            
        </div>
    )
}

export default DeleteUser