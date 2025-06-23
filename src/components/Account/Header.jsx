import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/logo-pacenatela.svg'
import { BoltIcon } from 'lucide-react'

function Header() {
  return (
    <div className='p-10 flex justify-between items-center'>
        <Image src={Logo} alt='' width={120} height={120}/>
        <BoltIcon width={40} height={40}/>
    </div>
  )
}

export default Header