import MainTree from "./mainTree"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import loginService from '../services/login'
import foodService from '../services/foods'
import { FaAlignRight } from "react-icons/fa"

const MainMenu = ({user,setUser, setTheme}) => {
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false)
  const [defaultTheme, setDefaultTheme] = useState(true)
  const [visitorOn, setVisitorOn] = useState(false)

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
  if (!storedUser){
    setUser(null)
  }
  }, [user])

  const toggleTheme = () => {
    setDefaultTheme(prevTheme => !prevTheme)
    setTheme(prevTheme => (prevTheme === 'default' ? 'dark' : 'default'))
  }

  useEffect(() => {
    if(user==='vieras'){
      setVisitorOn(true)
    }
    if(user!='vieras'){
      setVisitorOn(false)
    }
  }, [user])

  return (
    <div className="main-menu">
      
  
      {user ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }} >
                  <p style={{ marginRight: '15px' }}>Hei, {user}</p>  
                  
                  <button  onClick={toggleSettings}><FaAlignRight /></button>
                  <div style={{ display: showSettings ? 'block' : 'none' }}>
                    <div style={{ display: visitorOn ? 'none' : 'block' }}>
                    <button onClick={handleVisitorOutClick}>Kirjaudu ulos</button>
                    <button onClick={() => navigate('/vaihdasalasana')}>Vaihda salasana</button>
                    <button onClick={() => navigate('/poistatili')}>Poista tili</button>
                    </div>
                    <button onClick={toggleTheme}>Vaihda teema</button>
                  </div>
                  </div>
                    <MainTree />
                    <a href="/tilastot">Katso tilastoja</a>
                    
                </div>
            ) : (
                <div>
                    <h1 className="main-menu-title">V.E.N.L.A</h1>
                    <p className="main-menu-text">Tervetuloa, tämä sovellus auttaa sinua <br></br> Valitsemaan Elintarvike Neidollesi Lyhyessä Ajassa</p>
                   
                    <button className="main-menu-button" onClick={() => navigate('/kirjaudu')}>Kirjaudu</button>
                    <button className="main-menu-button" onClick={() => navigate('/luotili')}>Luo käyttäjä</button>
                    <button className="main-menu-button" onClick={handleVisitorClick}>Käytä vieraana💀</button>
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
