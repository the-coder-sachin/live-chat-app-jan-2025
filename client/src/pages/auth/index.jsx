import React, { useState } from 'react'
import victory from '@/assets/victory.svg'
import Background from '@/assets/login2.png'
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../../utils/constants';
import { toast } from 'sonner';
import { apiClient } from '../../lib/api-client';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const navigate = useNavigate()


  const validator = (signup)=>{
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!email){
      toast.error('please enter email')
      return false;
    }
  
    if (!regex.test(email)) {
      toast.error("please enter a valid email");
      return false;
    } 
     if (!password) {
      toast.error("please enter password");
      return false;
    } 
     if (password.length < 7) {
      toast.error("please enter a strong password");
      return false;
    } 
    if(signup){
      if (!confirmPassword) {
        toast.error("please confirm the password");
        return false;
      }
      if (password != confirmPassword) {
        toast.error("please enter correct password");
        return false;
      } 
    }
      return true;
    
  }

  const handleSignup = async ()=>{
    if(validator(true)){
      try {
        const response = await apiClient.post(SIGNUP_ROUTE, {
          email,
          password,
        }, {withCredentials: true});
        if(response.data.success){
          navigate('/profile')
          toast.success(`welcome ${response.data.user.email}`)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const handleLogin = async ()=>{
    if (validator(false)) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.data.success) {
          if(response.data.user.profileSetup){
            navigate('/chat')
          }else{
            navigate('/profile')
          }
          toast.success(`welcome ${response.data.user.email}`);
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-2xl h-5/6 w-4/5 flex justify-center items-center">
        <div className="flex flex-col md:flex-row md:gap-9 gap-2 ">
          <div>
            <div>
              <div className="flex items-center justify-center">
                <h2 className="text-4xl font-bold">Welcome</h2>
                <img src={victory} alt="victory" className="h-[100px]" />
              </div>
              <p className="mt-[-25px] text-xs font-semibold text-neutral-500">
                please Login/Signup first to enjoy our free chat app!
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full justify-center mt-4">
              <TabsList className="flex ">
                <TabsTrigger className="w-full" value="login">
                  Login
                </TabsTrigger>
                <TabsTrigger className="w-full" value="signup">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-2 ">
                <Input
                  className="mt-2 rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  required
                />
                <Input
                  className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value )}
                  placeholder="password"
                  required
                />
                <Button className="rounded-full mt-2" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-2">
                <Input
                  className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  required
                />
                <Input
                  className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
                <Input
                  className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="confirm password"
                  required
                />
                <Button onClick={handleSignup} className="rounded-full mt-2">
                  Sign up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          <img src={Background} alt="" className="h-[60vh] hidden md:block" />
        </div>
      </div>
    </div>
  );
}

export default Auth