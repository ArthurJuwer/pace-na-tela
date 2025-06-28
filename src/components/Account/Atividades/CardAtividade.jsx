import Image from 'next/image'
import React from 'react'
import Mapa from '../../../../public/map.png'

export default function CardAtividade() {
  return (
    <div className='w-full flex justify-between items-center'>
        <div className="flex items-center gap-4">
            <Image src={Mapa} alt='' className='size-28 bg-[#D9D9D9] p-2 rounded-2xl' />
            <div className="italic flex flex-col gap-y-2">
                <h1 className='text-[#1E1E1E] font-bold'>Título da atividade</h1>
                <h2 className='text-[#ACACAC] text-sm font-semibold'>22/02/2025 - 15:45</h2>
                <h3 className='text-[#ACACAC] text-xs font-semibold'>São Leopoldo, Rio grande do Sul</h3>
                <div className="">
                    <span className='bg-[#02277C] text-white text-xs py-1 px-6 rounded-full italic font-semibold'>Corrida</span>
                </div>
        </div>
        </div>
        
        <span className='text-[#928C8C] text-4xl'>
            ...
        </span>
    </div>
  )
}
