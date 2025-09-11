import Image from "next/image"
import Logo from "../../public/logo-pacenatela.svg";


export default function HomeDesktop() {
    return (
        <div className="bg-[#D8DFE3] h-screen w-screen flex-col justify-center">
            <header className="border-b-2 flex border-[#C7CBCE] w-[90vw] h-20 justify-around">
            <Image src={Logo} alt="logo pace na tela" className="w-20 h-20" />
            
            <ul className="flex justify-center items-center ml-20 gap-10 font-light">
                <li>Diferenciais</li>
                <li>Integrações</li>
                <li>Rodapé</li>
                <li>Sobre</li>
                <li>Entrar</li>
            </ul>

            <div className="flex items-center">
                <button className="rounded-2xl border border-blue-600 text-blue-600 w-48 h-10 flex items-center justify-center">Carregar atividade</button>
            </div>

            </header>

            // resto da pagina 
            
            <div>

            </div>
        </div>
    )
}
