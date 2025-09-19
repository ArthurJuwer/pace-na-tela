'use client'

import LogoStrava from "../../public/redes-sociais/Strava.svg"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Image from "next/image"
import ModalDesktop from "./Home/ModalDesktop";
import Logo from "../../public/logo-pacenatela.svg";
import Main from "../../public/main.png";
import RunningCard from "./Home/RunningCard";
import Modal from "./Home/Modal";
import { useState } from "react";

export default function HomeDesktop() {
    const [showModal, setShowModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#D8DFE3] h-screen w-screen flex-col flex items-center">
            <header className="border-b-2 flex border-[#C7CBCE] w-[90vw] h-20 justify-around">
                <Image src={Logo} alt="logo pace na tela" className="w-20 h-20 cursor-pointer" />

                <ul className="flex justify-center items-center ml-20 gap-10 font-light">
                    <li className="hover:text-[#02277C] cursor-pointer transition">Diferenciais</li>
                    <li className="hover:text-[#02277C] cursor-pointer transition">Integrações</li>
                    <li className="hover:text-[#02277C] cursor-pointer transition">Rodapé</li>
                    <li className="hover:text-[#02277C] cursor-pointer transition">Sobre</li>
                    <li className="hover:text-[#02277C] cursor-pointer transition">Entrar</li>
                </ul>

                <div className="flex items-center">
                    <button
                        onClick={() => setShowModal(true)} // <- aqui!
                        className="rounded-2xl border border-blue-600 text-blue-600 hover:text-[#02277C] hover:border-[#02277C] transition w-48 h-10 flex items-center justify-center"
                    >
                        Carregar atividade
                    </button>
                    {showModal && (
                        <>
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                            <ModalDesktop key={'modal'} closeModal={setShowModal} />
                        </>
                    )}
                </div>

            </header>

            <div className="hero flex gap-5 flex-col text-4xl 2xl:text-7xl font-extrabold text-center justify-center items-center">
                <h1 className="mt-5 2xl:mt-10 block 2xl:hidden">
                    UMA NOVA FORMA DE
                    <br />
                    <span className="mt-2 mb-12 block border-2 border-[#C7CBCE] rounded-full p-3">
                        COMPARTILHAR SUAS CORRIDAS
                    </span>
                </h1>

                <h1 className="mt-10 hidden 2xl:block leading-tight">
                    UMA NOVA FORMA DE
                    <br />
                    <span className="block border-2 border-[#C7CBCE] rounded-full py-3 mb-1">
                        COMPARTILHAR
                    </span>
                    <span className="block">SUAS CORRIDAS</span>
                </h1>
            </div>
            <div className="w-screen mb-10 2xl:mb-0 h-screen relative flex items-center justify-center">
                <div className="z-10">
                    <RunningCard />
                </div>

                <div className="absolute bottom-14 left-28 max-w-md">
                    <h1 className="text-2xl 2xl:text-3xl font-bold">
                        Escolha suas<br /> <span className="text-[#1D6BC3]">informações.</span>
                    </h1>
                    <p className="font-light text-sm 2xl:text-base mt-3">
                        Escolha as informações a serem <br />compartilhadas da forma que quiser.<br /> De distância à economia de CO2.
                    </p>
                </div>

                {/* coluna 3 (em cima à direita) */}
                <div className="absolute right-20 2xl:top-28 2xl:right-72 font-bold max-w-md">
                    <div className="flex">
                        <AutoAwesomeIcon fontSize='large' className="text-[#1D6BC3] mr-5" />
                        <h1 className="text-2xl 2xl:text-3xl">
                            Correu? <br /><span className="text-[#1D6BC3]">Personalize aqui!</span>
                        </h1>
                    </div>
                    <p className="font-light mt-3 text-sm 2xl:text-base">
                        Deixe sua foto a sua cara com nossos templates
                        <br /> personalizáveis e muito mais.
                    </p>
                    
                    <div className='w-80 h-40 rounded-2xl mt-5 2xl:mt-8 bg-[#BECCDA] text-sm grid grid-cols-2 place-items-center'>
                        <div className="bg-[#1A1C1E] p-5 rounded-full">
                            <Image src={LogoStrava} height={40} className="w-20 h-auto" alt="logo Strava" />
                        </div>
                        <div>
                            <h1>Com quais apps o Pace na Tela tem integração? </h1>
                            <p className="font-light mt-2 text-[#02277C]">Saiba mais</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
