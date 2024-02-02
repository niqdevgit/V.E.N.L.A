import MainTree from "./mainTree"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import loginService from '../services/login'
import foodService from '../services/foods'

const MainMenu = ({user,setUser, setTheme}) => {
  const [showSettings, setShowSettings] = useState(false)
  const [defaultTheme, setDefaultTheme] = useState(true)

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

    const handleVisitorClick = async (event) => {
      event.preventDefault()
      try {
        const logginUser = await loginService.login({
          username: "vieras",
          password: "password",
        })
  
        window.localStorage.setItem(        
          'loggedappUser', JSON.stringify(logginUser)      
        ) 
        
        setUser(logginUser.username)
       
        foodService.setToken(logginUser.token)
        
        
      } catch (exception) {
        console.error("Error during login:", exception)
        
        }
      } 
      
    

    const handleVisitorOutClick = () => {
      window.localStorage.removeItem('loggedappUser')
      setUser(null)
  }

  useEffect(() => {
  const storedUser = window.localStorage.getItem('loggedappUser')
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser.name)
  }
  }, [])

  const toggleTheme = () => {
    setDefaultTheme(prevTheme => !prevTheme)
    setTheme(prevTheme => (prevTheme === 'default' ? 'dark' : 'default'))
  }
  
  return (
    <div className="main-menu">
      <h1>V.E.N.L.A</h1>
      <i>Valitse Elintarvike Neidollesi Lyhyessä Ajassa</i>
      {user ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }} >
                  <p style={{ marginRight: '15px' }}>Hei,{user}!</p>  
                  <button onClick={handleVisitorOutClick}>Kirjaudu ulos</button>
                  <button onClick={toggleSettings}>asetukset </button>
                  <div 
                  style={{ display: showSettings ? 'block' : 'none' }}
                  >
                    <button>Muokkaa tiliä</button>
                    <button><a href="/poistatili">poista tili</a></button>
                    <button onClick={toggleTheme}>vaihda teema</button>
                  </div>
                  </div>
                    <MainTree />
                    <a href="/tilastot">Katso tilastoja</a>
                    
                </div>
            ) : (
                <div>
                    <p>Jotain lorem ipsumia mikä on sovelluksen idea.....</p>
                    <button><a href="/kirjaudu">Kirjaudu</a></button>
                    <button><a href="/luotili">Luo käyttäjä</a></button>
                    <button onClick={handleVisitorClick}>Käytä vieraana💀</button>
                </div>
            )}
    </div>
  )
}

MainMenu.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func,
}

export default MainMenu
