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

  useEffect(() => {
    const head = document.head
    const link = document.createElement("link")

    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = getThemeStyles()

    head.appendChild(link)

    return () => { head.removeChild(link) }

  }, [theme])


  const getThemeStyles = async () => {
    switch (theme) {
      case 'dark':
        const cssDark = await styleService.getDarkStyle()
        setGlobalStyles(cssDark)
        break
      case 'default':
      default:
        const css = await styleService.getDefaultStyle()
        setGlobalStyles(css)
        break
    }
  }

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
