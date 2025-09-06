import { useState } from "react";
import Link from "next/link";

export default function MenuHamburger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-[65px] flex items-center px-6 relative z-50">

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-col justify-between w-8 h-6 focus:outline-none z-40 absolute top-0 right-0 transition-all duration-500 ${
    isOpen ? "translate-x-[50px]" : ""
  }`}
        >
          <span
            className={`h-[2px] w-7 rounded bg-[#1E1E23] transition-all duration-500 origin-top-left ${
              isOpen ? "rotate-45 translate-y-[1px]" : ""
            }`}
          ></span>
          <span
            className={`h-[2px] w-7 rounded bg-[#1E1E23] transition-all duration-500 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-[2px] w-7 rounded bg-[#1E1E23] transition-all duration-500 origin-bottom-left ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          ></span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
        )}

        <ul
          className={`fixed top-0 pt-[67px] right-0 h-screen w-80 bg-[#F5F6FA] flex flex-col justify-start shadow-4xl p-6 space-y-6 transition-transform duration-500 ease-in-out z-30 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <li className="w-56">
            <Link
              href="#entrar"
              className="block text-[#1E1E23] text-lg font-semibold px-2 py-1 rounded hover:bg-[#E4E6ED] transition-colors"
            >
              Carregar atividade
            </Link>
          </li>
          <li className="w-56">
            <Link
              href="#diferenciais"
              className="block text-[#1E1E23] text-lg font-semibold px-2 py-1 rounded hover:bg-[#E4E6ED] transition-colors"
            >
              Diferenciais
            </Link>
          </li>
          <li className="w-56">
            <Link
              href="#integracoes"
              className="block text-[#1E1E23] text-lg font-semibold px-2 py-1 rounded hover:bg-[#E4E6ED] transition-colors"
            >
              Integrações
            </Link>
          </li>
          <li className="w-56">
            <Link
              href="#integracoes"
              className="block text-[#1E1E23] text-lg font-semibold px-2 py-1 rounded hover:bg-[#E4E6ED] transition-colors"
            >
              Rodapé
            </Link>
          </li>
                    <li className="w-56">
            <Link
              href="#entrar"
              className="block text-[#1E1E23] text-lg font-semibold px-2 py-1 rounded hover:bg-[#E4E6ED] transition-colors"
            >
              Entrar
            </Link>
          </li>
                    <li className="w-56">
            <Link
              href="#integracoes"
              className="block text-[#1E1E23] text-lg font-semibold px-2 py-1 rounded hover:bg-[#E4E6ED] transition-colors"
            >
              Sobre
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}