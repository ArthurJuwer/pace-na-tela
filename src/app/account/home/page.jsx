import Header from '@/components/Account/Header'
import CardInfo from '@/components/Account/Home/CardInfo'
import MainActivity from '@/components/Account/MainActivity'
import React from 'react'

export default function Home() {
  return (
    <div className=''>
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <MainActivity />
          <div className="w-[90%] grid grid-cols-2 gap-4">
              <CardInfo nome={'Distância'}/>
              <CardInfo nome={'Distância'}/>
              <CardInfo nome={'Distância'}/>
              <CardInfo nome={'Distância'}/>
          </div>
        </div>
    </div>
  )
}
