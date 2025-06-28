import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Exemplo from "../../../../public/ExemploRemover.png"

function CardInfo({nome}) {
  return (
    <div className=' bg-[#1E1E1E]  rounded-3xl text-white'>
        <div className="flex justify-between border-b-2 border-[#3C3C3C] px-5 py-3">
            <h1 className='italic text-base font-semibold'>{nome}</h1>
            <ChevronRight color='#0084FF'/>
        </div>
        <div className="flex flex-col justify-center px-5 py-3">
            <label className='text-sm'>Semana</label>
            <h1 className='text-2xl text-[#0084FF] font-bold'>24,52<span className='text-sm'>KM</span></h1>
            <Image src={Exemplo} alt='exemplo' />
        </div>
    </div>
  )
}

export default CardInfo