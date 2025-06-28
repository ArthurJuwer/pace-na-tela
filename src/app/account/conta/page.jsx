import { Camera, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import LogoAdidas from "../../../../public/logo-apps-integracao/Adidas.svg"
import LogoAsics from "../../../../public/logo-apps-integracao/Asics.svg"
import LogoStrava from "../../../../public/logo-apps-integracao/Strava.svg"

export default function Conta() {
  return (
    <div className='italic flex flex-col gap-8'>
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className="size-32 bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Camera size={50} />
            </div>
            <h1 className='text-2xl font-bold'>Arthur Juwer</h1>
            <button className='border italic border-black rounded-full px-4 py-2 font-semibold text-xl'>
                Editar o perfil
            </button>
        </div>
        
        <div className="w-full flex items-center justify-center">
          <h1 className='text-2xl font-bold italic w-[90%]'>Contas conectadas:</h1>
        </div>
        <div className="grid grid-cols-3 place-content-center place-items-center">
            <Image src={LogoStrava} className="size-24" alt="logo Strava" />
            <Image src={LogoAdidas} className="size-24" alt="logo Adidas" />
            <Image src={LogoAsics} className="size-24" alt="logo Asics" />
        </div>

        <div className="w-full flex flex-col items-center justify-center ">
            <div className="w-[90%] flex flex-col gap-2 pb-8 border-b border-[#02277C]">
                <div className="flex justify-between">
                    <h1 className='text-2xl font-bold italic w-full'>Caixa de entrada</h1>
                    <ChevronRight size={30} />
                </div>
                <h2 className='text-[#A9A9A9] font-semibold'>Ver mensagens</h2>
            </div>
        </div>
    </div>
  )
}
