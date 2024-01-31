import { useState, useEffect } from 'react'
import MainMenu from "./components/mainMenu"
import SignInPage from "./components/signIn"
import NotFound from './components/notFound'
import {
  Routes, Route,
} from 'react-router-dom'
import Analytics from './components/analytics'
import MainTree from './components/mainTree'

function App() {
  const [user, setUser] = useState(null) 

  useEffect(() => {
    document.title = "V.E.N.L.A"
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      MainTree.setToken(user.token)
    }
  }, [])


  return (
    <div>
      <Routes>
        <Route path="/kirjaudu" element={<SignInPage user={user} setUser={setUser} />} />
        <Route path="/" element={<MainMenu user={user} setUser={setUser}/>} />
        <Route path='/tilastot' element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  
  )
}

export default App
