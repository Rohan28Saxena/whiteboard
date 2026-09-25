"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { Sparkle } from 'lucide-react';
import React from 'react'

function WelcomeBanner() {
    const{user}=useUser();
  return (
    <div className='p-10 border rounded-xl bg-linear-to-r from-blue-400 to-purple-400'>
      <div >
        <h2 className='text-2xl font-bold'>Welcome Back, {user?.fullName}</h2>
        <p>Bring Your Ideas to life on infinite canvas</p>
      </div>

      <div className='flex items-center gap-2 mt-5'>
        <Button>+Create New Board</Button>
        <Button variant="outline"><Sparkle/>AI Helper</Button>

      </div>
    </div>
  )
}

export default WelcomeBanner
