import Image from "next/image";
import LogoStrava from "../../../public/logo-apps-integracao/Strava.svg";
import LogoAdidas from "../../../public/logo-apps-integracao/Adidas.svg";
import { useState } from "react";

export default function Modal({ closeModal }) {
    const [url, setUrl] = useState("");
    // VER PARA ADICIONAR ROUTER

    const handleOpenLink = () => {
        const activityIdPattern = /activities\/(\d+)/; 
        const match = url.match(activityIdPattern); 

        if (match) {
            const activityId = match[1]; 
            window.location.href = `/activity/${activityId}`; 
            // TROCAR AQUI
        } else {
            alert("Por favor, insira um URL válido da atividade do Strava.");
        }
    };

    return (
        <div className="absolute transform -translate-x-1/2 left-1/2 bg-white min-h-2/5 w-11/12 px-8 py-10 z-50 rounded-3xl flex flex-col gap-y-3">
            <button className="absolute right-8 text-sm" onClick={() => closeModal(false)}>X</button>
            <div className="flex items-center justify-center text-center flex-col gap-y-3">
                <h1 className="text-blueMain text-2xl font-bold w-11/12 italic">Carregar Atividade</h1>
                <p className="text-blueSecond text-xs font-medium w-11/12">Link da atividade do STRAVA</p>
            </div>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border border-blueMain rounded-xl p-3.5 w-full placeholder:italic placeholder:text-[#8C9BBC] text-xs"
                    placeholder="ex: https://www.strava.com/activities/1367221"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button
                    onClick={handleOpenLink}
                    className="bg-blueMain size-7 flex items-center text-white rounded-md justify-center absolute transform -translate-y-1/2 top-1/2 right-3"
                >
                    &rarr;
                </button>
            </div>
            <div className="flex items-center justify-between w-full">
                <span className="block w-full h-1 bg-blueMain"></span>
                <h1 className="text-blueMain text-2xl font-bold text-center px-4 italic">ou</h1>
                <span className="block w-full h-1 bg-blueMain"></span>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="bg-[#8C9BBC] p-3 rounded-xl flex items-center gap-x-5">
                    <Image src={LogoStrava} className="h-8 w-auto" alt="logo strava" />
                    <h1 className="text-center text-white font-semibold">Entrar com Strava</h1>
                </div>
                <div className="bg-[#8C9BBC] p-3 rounded-xl flex items-center gap-x-5">
                    <Image src={LogoAdidas} className="h-8  w-auto" alt="logo adidas" />
                    <h1 className="text-center text-white font-semibold">Entrar com Adidas RUN</h1>
                </div>
                <h1 className="text-center font-semibold text-blueSecond italic">Ver outros aplicativos</h1>
            </div>
        </div>
    );
}