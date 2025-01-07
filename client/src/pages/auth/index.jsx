import React from 'react'
import victory from '@/assets/victory.svg'
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

const Auth = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-2xl h-5/6 w-4/5 flex justify-center items-center">
        <div className="flex flex-col gap-2 ">
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
                placeholder="email"
                required
              />
              <Input
                className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                type="password"
                placeholder="password"
                required
              />
              <Button className="rounded-full mt-2">Login</Button>
            </TabsContent>
            <TabsContent value="signup" className="flex flex-col gap-2">
              <Input
                className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                type="email"
                placeholder="email"
                required
              />
              <Input
                className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                type="password"
                placeholder="password"
                required
              />
              <Input
                className="rounded-full outline-none text-xs placeholder:text-neutral-400 active:outline-none"
                type="password"
                placeholder="confirm password"
                required
              />
              <Button className="rounded-full mt-2">Login</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Auth