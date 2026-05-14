import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/logo-pacenatela.svg'
import { BoltIcon } from 'lucide-react'

function Header() {
  return (
    <div className='p-10 flex justify-between items-center'>
        <Image src={Logo} alt='' width={100} height={100}/>
        <BoltIcon width={28} height={28}/>
    </div>
  )
}

export default Header