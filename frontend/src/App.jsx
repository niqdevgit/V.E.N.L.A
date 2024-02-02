import { useState, useEffect } from 'react'
import MainMenu from "./components/mainMenu"
import SignInPage from "./components/signIn"
import SignUpPage from './components/signUp'
import NotFound from './components/notFound'
import {
  Routes, Route,
} from 'react-router-dom'
import Analytics from './components/analytics'
import foodService from './services/foods'

function App() {
  const [user, setUser] = useState(null) 

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


  return (
    <div>
      <Routes>
        <Route path="/kirjaudu" element={<SignInPage user={user} setUser={setUser} />} />
        <Route path="/luotili" element={<SignUpPage  />} />
        <Route path="/" element={<MainMenu user={user} setUser={setUser}/>} />
        <Route path='/tilastot' element={<Analytics user={user} setUser={setUser}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  
  )
}

export default App
