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
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            <div className="absolute w-4 h-4 bg-green-500 rounded-full top-0 left-0 animate-ping"></div>
          </div>
        </div>
      </>
    );
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