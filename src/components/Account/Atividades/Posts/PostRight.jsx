import React from 'react'

export default function PostRight({ date, title, subtitle, username }) {
  return (
    <div className='w-[95%] bg-[#D9D9D9] rounded-l-3xl p-4 flex flex-col gap-2'>
      <span className='text-xs text-[#928C8C]'>{date || '—'}</span>
      <div className="flex flex-col gap-1">
        <h1 className='font-semibold text-sm italic'>{title || '—'}</h1>
        <p className='text-xs text-[#928C8C]'>{subtitle || ''}</p>
        <h2 className='text-xs font-semibold text-blueMain'>{username || '—'}</h2>
      </div>
    </div>
  )
}
