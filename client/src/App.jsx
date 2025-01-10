import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import { toast } from 'sonner'
import { apiClient } from './lib/api-client'
import { USER_INFO_ROUTE } from '../utils/constants'

const PrivateRoute = ({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to='/auth'/>
}

const AuthRoute = ({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to='/chat'/>: children
}

const App = () => {

  const {userInfo , setUserInfo} = useAppStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async ()=>{
      try {
        const response = await apiClient.get(USER_INFO_ROUTE, {withCredentials:true});
        if(response.status === 200){
          setUserInfo(response.data)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }

    }
    if(userInfo){
      setLoading(false)
    }else{
      getUser()
    }
    
  }, [userInfo, setUserInfo])

    
  if(loading){
    return(
      <div className='animate-pulse'>loading.....</div>
    )
  }
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Navigate to={'/auth'}/>}/>
      <Route path='/auth' element={<AuthRoute>
        <Auth/>
        </AuthRoute>
        }/>
      <Route path='/chat' element={
        <PrivateRoute>
          <Chat/>
        </PrivateRoute>
        }/>
      <Route path='/profile' element={
        <PrivateRoute>
          <Profile/>
        </PrivateRoute>
        }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App