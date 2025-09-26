import Image from "next/image";
// import LogoStrava from "../../../public/logo-apps-integracao/Strava.svg";
import LogoStrava from "../../../public/logo-apps-integracao/btn_strava_connect_with_orange.png";
import LogoAdidas from "../../../public/logo-apps-integracao/Adidas.svg";
import { useState } from "react";

export default function Modal({ closeModal }) {
    
    // VER PARA ADICIONAR ROUTER

    const handleLoginStrava = () => {
        window.location.href = '/api/auth/strava';
    }


    return (
        <div className="absolute transform -translate-x-1/2 left-1/2 bg-white min-h-2/5 w-11/12 px-8 py-10 z-50 rounded-3xl flex flex-col gap-y-3">
            <button className="absolute right-8 text-sm" onClick={() => closeModal(false)}>X</button>
            
            {/* <div className="flex items-center justify-between w-full">
                <span className="block w-full h-1 bg-blueMain"></span>
                <h1 className="text-blueMain text-2xl font-bold text-center px-4 italic">ou</h1>
                <span className="block w-full h-1 bg-blueMain"></span>
            </div> */}
            <div className="flex items-center justify-center flex-col gap-y-4">

                {/* ARRUMAR AQUI */}
                    {/* <button 
                        className="bg-[#8C9BBC] p-3 rounded-xl flex justify-center items-center gap-x-5 relative"
                        onClick={handleLoginStrava}
                    >
                            <Image src={LogoStrava} className="h-8 w-auto absolute left-4" alt="logo strava" />
                            <h1 className="text-center text-white font-semibold">Entrar com Strava</h1>
                    </button> */}
                        <h1 className="text-black">Conectar Abaixo pelo Strava</h1>
                        <Image src={LogoStrava} className="h-8 w-auto " alt="logo strava" />

                
                
                {/* <div className="bg-[#8C9BBC] p-3 rounded-xl flex items-center gap-x-5">
                    <Image src={LogoAdidas} className="h-8  w-auto" alt="logo adidas" />
                    <h1 className="text-center text-white font-semibold">Entrar com Adidas RUN</h1>
                </div> */}
                {/* <h1 cla ssName="text-center font-semibold text-blueSecond italic">Ver outros aplicativos</h1> */}
            </div>
        </div>
    );
}