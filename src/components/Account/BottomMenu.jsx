'use client'
import { HomeIcon, TimerIcon, ImageIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const itensMenu = [
  { icon: HomeIcon, link: "/account/home", label: "Início" },
  { icon: TimerIcon, link: "/account/atividades", label: "Atividades" },
  { icon: ImageIcon, link: "/account/posts", label: "Posts" },
  { icon: UserRoundIcon, link: "/account/conta", label: "Perfil" },
]

function BottomMenu() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 px-4">
      <div className="bg-blueMain rounded-t-2xl px-3 py-3 flex justify-around shadow-2xl shadow-blueMain/40">
        {itensMenu.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.link || pathname.startsWith(item.link + '/')
          return (
            <Link
              href={item.link}
              key={index}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div
                className={`
                  flex items-center justify-center w-11 h-9 rounded-xl transition-all duration-200
                  ${isActive ? 'bg-white shadow-sm' : 'bg-transparent'}
                `}
              >
                <Icon
                  width={20}
                  height={20}
                  className={`transition-all duration-200 ${isActive ? 'text-blueMain' : 'text-white/40'}`}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>
              <span
                className={`text-[10px] font-semibold tracking-wide transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-white/35'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomMenu
