import { useState } from "react"
import { useNavigate } from "react-router-dom"
import userService from '../services/user'

const EditUser = (user) => {
    const [password, setPassword] = useState('')
    const [newpassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()

    const username = user.user
    const handleUserEdit = async (event) => {
        event.preventDefault()
        try {
          await userService.editUser({
            username,
            password,
            newpassword
          })

          navigate('/')
          
        } catch (exception) {
          setErrorMessage('Väärä käyttäjänimi tai salasana')
        
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
            } 
        }


    return (
        <div>
            <a href="/">Palaa</a>
            
            <form onSubmit={handleUserEdit}>
            <div>
            <p>Aseta uusi salasana</p>
            <input
                type="password"
                value={newpassword}
                name="newPassword"
                onChange={({ target }) => setNewPassword(target.value)}
            />
            </div>
            <div>
            <p>Anna nykyinen salasana</p>
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
  
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button type="submit">Vaihda salasana</button>
        <p style={{ color: 'red' }} >{errorMessage}</p>
        </div>
      </form>

            <p><a href="/unohtunutsalasana">Oletko unohtanut salasanasi?</a></p>
        </div>
    )
}

export default EditUser