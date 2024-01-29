import { useState, useEffect } from 'react'
import MainMenu from "./components/mainMenu"
import SignInPage from "./components/signIn"
import NotFound from './components/notFound'
import {
  Routes, Route,
} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null) 

  useEffect(() => {
    document.title = "V.E.N.L.A";
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/kirjaudu" element={<SignInPage user={user} setUser={setUser} />} />
        <Route path="/" element={<MainMenu user={user} setUser={setUser}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  
  )
}

export default App
