import { FolderOpenIcon, FootprintsIcon, HomeIcon, User2Icon } from 'lucide-react'
import React from 'react'

function BottomMenu() {
  return (
    <div className='bg-[#02277C] w-[90%] rounded-full p-6 absolute bottom-12 transform -translate-x-1/2 left-1/2 flex justify-around'>
        <HomeIcon width={30} height={30} className='text-white'/>
        <FootprintsIcon width={30} height={30} className='text-white'/>
        <FolderOpenIcon width={30} height={30} className='text-white'/>
        <User2Icon width={30} height={30} className='text-white'/>
    </div>
  )
}

export default BottomMenu