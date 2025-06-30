import Image from 'next/image'
import React from 'react'

export default function PostRight() {
  return (
    <div className='w-[95%] bg-[#D9D9D9] rounded-l-full p-4'>
        <span>23/02/2025 - 15:45</span>
        <div className="">
            <Image src={''} alt='' />
            <div className="">
                <h1>Você fez o equivalante a 25 voltas na  de atletismo</h1>
                <p>10km é um resultado Incrível</p>
                <div className="">
                    <Image src={''} alt='' />
                    <h2>Arthur_Juwer</h2>
                </div>
            </div>
        </div>
    </div>
  )
}
