"use client"
import { Button } from '@/components/ui/button'
import { Folder } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function ProjectList() {
  const [projectList,setProjectList]=useState([])
  return (
    <div>
      {projectList.length==0?(
        <div className='flex flex-col items-center p-10 border rounded-2xl mt-10 gap-3'>
          <Image src="/folder.png" alt='folder' height={90} width={90}/>
          <h2 className='text-2xl font-bold'>No Boards Found</h2>
          <p>Create your first board to start brainstorming, Planning</p>
          <Button>Create New Board</Button>
        </div>

      ):<div>
        </div>
        }
    </div>
  )
}

export default ProjectList
