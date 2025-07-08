import { useState } from 'react'
import LandingPage from './pages/landingPage/LandingPage'
import SignUp from './pages/SignUp/SignUp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*<LandingPage/> */}
      <SignUp/>
        
    </>
  )
}

export default App
