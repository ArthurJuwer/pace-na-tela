import React from 'react'

export default function TemplateButton({ onClick, bgColor }) {
  return (
    <button onClick={onClick} style={{background: bgColor, backgroundPosition: 'center'}} className={` p-7 border-gray-200 border-2 rounded-2xl`}></button>
  )
}
