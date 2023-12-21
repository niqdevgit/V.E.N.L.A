import { useState } from 'react'
import MainMenu from "./components/mainMenu"
import SignInPage from "./components/signIn"
import {
  Routes, Route,
} from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null) 

  return (
    <div>
      <Routes>
        <Route path="/kirjaudu" element={<SignInPage user={user} setUser={setUser} />} />
        <Route path="/" element={<MainMenu user={user} setUser={setUser}/>} />
      </Routes>
    </div>
  
  )
}

export default App
