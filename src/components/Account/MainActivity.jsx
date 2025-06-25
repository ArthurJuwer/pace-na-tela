import Image from 'next/image'
import React from 'react'
import Mapa from '../../../public/map.png'

function MainActivity() {
  return (
    <div className='font-inter italic w-[90%] bg-[#D9D9D9] rounded-3xl p-6 flex justify-between'>
        <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-3">
                <h1 className='text-2xl font-bold '>Atividade</h1>
                <div className="">
                    <h1 className='text-3xl font-extrabold'>0,0</h1>
                    <h2 className='text-xl font-semibold'>km</h2>
                </div>
                
            </div>
            <div className="flex justify-between gap-x-4">
                <div className="flex flex-col items-center text-sm font-semibold">
                    <h3>0a</h3>
                    <span>Corrida</span>
                </div>
                <div className="flex flex-col items-center text-sm font-semibold">
                    <h3>-’-’’</h3>
                    <span>Pace.médio</span>
                </div>
                <div className="flex flex-col items-center text-sm font-semibold">
                    <h3>0:00</h3>
                    <span>Duração</span>
                </div>
            </div>
        </div>
        <div className="absolute right-10 flex items-center">
            <Image src={Mapa} alt='mapa' width={200}/>
            {/* TEM QUE FAZER UM JEITO PARA VER ESSE TAMANHO FICA BOM EM IPH 14, MAS PARA BAIXO FICA GRANDE */}
        </div>
    </div>
  )
}

export default MainActivity