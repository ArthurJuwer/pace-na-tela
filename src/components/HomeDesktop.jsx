import Image from "next/image"
import Logo from "../../public/logo-pacenatela.svg";
import Main from "../../public/main.png";
import RunningCard from "./Home/RunningCard";

export default function HomeDesktop() {
    return (
        <div className="bg-[#D8DFE3] h-screen w-screen flex-col flex items-center">
            <header className="border-b-2 flex border-[#C7CBCE] w-[90vw] h-20 justify-around">
            <Image src={Logo} alt="logo pace na tela" className="w-20 h-20" />
            
            <ul className="flex cursor-pointer justify-center items-center ml-20 gap-10 font-light">
                <li className="hover:text-[#02277C] transition">Diferenciais</li>
                <li className="hover:text-[#02277C] transition">Integrações</li>
                <li className="hover:text-[#02277C] transition">Rodapé</li>
                <li className="hover:text-[#02277C] transition">Sobre</li>
                <li className="hover:text-[#02277C] transition">Entrar</li>
            </ul>

            <div className="flex items-center">
                <button className="rounded-2xl border border-blue-600 text-blue-600  hover:text-[#02277C] hover:border-[#02277C] transition w-48 h-10 flex items-center justify-center">Carregar atividade</button>
            </div>

            </header>

            <div className="hero flex gap-5 flex-col font-stretch-expanded tracking-wider text-4xl font-extrabold text-center justify-center items-center">
                <h1 className="mt-10">UMA NOVA FORMA DE<br/><span className="mt-2 mb-2 block border-2 border-[#C7CBCE] rounded-full p-3">COMPARTILHAR</span>SUAS CORRIDAS</h1>
                <RunningCard />
            </div>
        </div>
    )
}
