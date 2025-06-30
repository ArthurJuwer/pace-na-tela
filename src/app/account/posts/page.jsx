import PostRight from '@/components/Account/Atividades/Posts/PostRight'
import React from 'react'

export default function Posts() {
  return (
    <div>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex items-center justify-center">
          <h1 className='text-2xl font-bold italic w-[90%]'>Seus Posts:</h1>
        </div>
        <div className="flex justify-end">
            <PostRight />
        </div>
        
        </div>
    </div>
  )
}
