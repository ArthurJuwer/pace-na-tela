import React from 'react'

export default function PostRight() {
  return (
    <div className='w-[95%] bg-[#D9D9D9] rounded-l-3xl p-4 flex flex-col gap-2'>
        <span className='text-xs text-[#928C8C]'>23/02/2025 - 15:45</span>
        <div className="flex flex-col gap-1">
            <h1 className='font-semibold text-sm italic'>Você fez o equivalente a 25 voltas na pista de atletismo</h1>
            <p className='text-xs text-[#928C8C]'>10km é um resultado incrível</p>
            <h2 className='text-xs font-semibold text-blueMain'>Arthur_Juwer</h2>
        </div>
    </div>
  )
}
