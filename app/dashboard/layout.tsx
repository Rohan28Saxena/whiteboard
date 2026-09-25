import AppHeader from '@/components/custom/dashboard/AppHeader'
import { AppSidebar } from '@/components/custom/dashboard/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function DashboaedLayout({children}:{children:React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
    <div className='flex flex-1 flex-col'>
      <AppHeader/>
      <div className='p-3'>
       {children}
      </div>
       
    </div>
    </SidebarProvider>
  )
}

export default DashboaedLayout
