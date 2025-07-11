import LandingPage from './pages/landingPage/LandingPage'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Files from './pages/Files/Files'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Notes from './pages/Notes/Notes'
import Tasks from './pages/Tasks/Tasks'
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
    path:'/home',
    element: <Home/>
  },
  {
    path:'/profile',
    element: <Profile/>
  },
  {
    path:'/files',
    element: <Files/>
  },
  {
    path:'/notes',
    element: <Notes/>
  },
  {
    path:'/tasks',
    element: <Tasks/>
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
