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
import DeleteUser from './components/deleteUser'
import ForgottenPassword from './components/forgottenPassword'
import EditUser from './components/editUser'
import Navbar from './components/navbar'
//import './style/dark.css'
//import './style/default.css'
import styleService from './services/style'
import { createGlobalStyle } from 'styled-components'

function App() {
  const location = useLocation()
  const [globalStyles, setGlobalStyles] = useState('')
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

 


  const getThemeStyles = async () => {
    let css
    switch (theme) {
      case 'dark':
        css = await styleService.getDarkStyle()
        setGlobalStyles(css)
        break
      case 'default':
      default:
        css = await styleService.getDefaultStyle()
        setGlobalStyles(css)
        break
    }
  }

  useEffect(() => {
    getThemeStyles()

  }, [theme,getThemeStyles])

  const GlobalStyle = createGlobalStyle`
  ${globalStyles}
`

  const shouldRenderNavbar = () => {
    const shouldRender = user !== null || location.pathname !== '/'
  return shouldRender

  }

  return (
    <div>
      <GlobalStyle />
       {shouldRenderNavbar() && <Navbar />}
      <Routes>
        <Route path="/kirjaudu" element={<SignInPage user={user} setUser={setUser} />} />
        <Route path="/luotili" element={<SignUpPage  />} />
        <Route path="/poistatili" element={<DeleteUser user={user} />} />
        <Route path="/unohtunutsalasana" element={<ForgottenPassword />} />
        <Route path="/vaihdasalasana" element={<EditUser user={user}/>} />
        <Route path="/" element={<MainMenu user={user} setUser={setUser} setTheme={setTheme}/>} />
        <Route path='/tilastot' element={<Analytics user={user} setUser={setUser}/>} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  
  )
}

export default App
