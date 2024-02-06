import { useState, useEffect } from 'react'
import MainMenu from "./components/mainMenu"
import SignInPage from "./components/signIn"
import SignUpPage from './components/signUp'
import NotFound from './components/notFound'
import {
  Routes, Route, useLocation
} from 'react-router-dom'
import Analytics from './components/analytics'
import foodService from './services/foods'
import { defaultStyles } from './style/default'
import { darkStyles } from './style/dark'
import DeleteUser from './components/deleteUser'
import ForgottenPassword from './components/forgottenPassword'
import EditUser from './components/editUser'
import Navbar from './components/navbar'

function App() {
  const location = useLocation()
  const [user, setUser] = useState(null) 
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default'
  })

  useEffect(() => {
    document.title = "V.E.N.L.A"
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      foodService.setToken(user.token)
      setUser(user.username)
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return darkStyles
      case 'default':
      default:
        return defaultStyles
    }
  }

  const shouldRenderNavbar = () => {
    return location.pathname !== "/"
  }

  return (
    <div style={getThemeStyles()} >
       {shouldRenderNavbar() && <Navbar />}
      <Routes>
        <Route path="/kirjaudu" element={<SignInPage user={user} setUser={setUser} />} />
        <Route path="/luotili" element={<SignUpPage  />} />
        <Route path="/poistatili" element={<DeleteUser user={user} />} />
        <Route path="/unohtunutsalasana" element={<ForgottenPassword />} />
        <Route path="/vaihdasalasana" element={<EditUser user={user}/>} />
        <Route path="/" element={<MainMenu user={user} setUser={setUser} setTheme={setTheme}/>} />
        <Route path='/tilastot' element={<Analytics user={user} setUser={setUser}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  
  )
}

export default App
