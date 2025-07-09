import LandingPage from './pages/landingPage/LandingPage'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
function App() {
let router = createBrowserRouter([
  {
    path :'/',
    element: <LandingPage/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/sign_up',
    element:<SignUp/>
  },
  {
    path : "*",
    element:<NotFound/>
  }
])

  return (
    <>
      <RouterProvider router={router}/>
        
    </>
  )
}

export default App
