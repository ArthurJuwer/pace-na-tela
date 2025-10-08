import { FolderOpenIcon, FootprintsIcon, HomeIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const itensMenu = [
  { icon: HomeIcon, link: "/account/home" },
  { icon: FootprintsIcon, link: "/account/atividades" },
  { icon: FolderOpenIcon, link: "/account/posts" },
  { icon: User2Icon, link: "/account/conta" },
]

function BottomMenu() {
  return (
    <div className="bg-[#02277C] w-[90%] rounded-full p-6 fixed bottom-12 transform -translate-x-1/2 left-1/2 flex justify-around shadow-xl">
      {itensMenu.map((item, index) => {
        let Icon = item.icon
        return (
          <Link href={item.link} key={index}>
            <Icon width={30} height={30} className="text-white" />
          </Link>
        )
      })}
    </div>
  )
}

export default BottomMenu
