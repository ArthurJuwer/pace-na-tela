import CardAtividade from '@/components/Account/Atividades/CardAtividade'
import MainActivity from '@/components/Account/MainActivity'
import React from 'react'

export default function Atividades() {
  return (
    <div>
      
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="w-full flex items-center justify-center">
          <h1 className='text-2xl font-bold italic w-[90%]'>Atividades:</h1>
        </div>
          <MainActivity />
          <div className="w-[90%] flex flex-col gap-8 justify-center items-center">
            <CardAtividade />
            <CardAtividade />
            <CardAtividade />
            <CardAtividade />
          </div>
        </div>
    </div>
  )
}
