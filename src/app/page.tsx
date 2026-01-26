"use client"

import { Button } from '@/components/ui/button'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../convex/_generated/api'


const page = () => {

  const projects = useQuery(api.projects.get);

  return (
    <div className='font-bold text-red-600'>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {projects?.map((project)=>(
        <div>
          {project.name}
        </div>
      ))}
    </main>
      <Button >
        click me
      </Button>
    </div>
  )
}

export default page