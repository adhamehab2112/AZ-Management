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
import UserProfile from './pages/UserProfile/UserProfile'
import AuthUser from './router/AuthUser'
function App() {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/sign_up',
      element: <SignUp />
    },
    {
      path: '/home',
      element: <AuthUser><Home /> </AuthUser>
    },
    {
      path: '/profile',
      element: <AuthUser><Profile /></AuthUser>
    },
    {
      path: '/files',
      element: <AuthUser><Files /></AuthUser>
    },
    {
      path: '/notes',
      element: <AuthUser><Notes /></AuthUser>
    },
    {
      path: '/tasks',
      element: <AuthUser><Tasks /></AuthUser>
    },
    {
      path: '/user-profile/:username',
      element: <AuthUser><UserProfile /></AuthUser>
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />


    </>
  )
}

export default App
