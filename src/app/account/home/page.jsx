import BottomMenu from '@/components/Account/BottomMenu'
import Header from '@/components/Account/Header'
import MainActivity from '@/components/Account/MainActivity'
import React from 'react'

export default function Home() {
  return (
    <div>
        <Header/>
        <div className="w-full flex justify-center items-center">
          <MainActivity />
        </div>
        <BottomMenu />
    </div>
  )
}
