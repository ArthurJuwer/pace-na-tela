import Image from "next/image";
import LogoStrava from "../../../public/logo-apps-integracao/btn_strava_connect_with_orange.png";

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
                <button onClick={handleLoginStrava} className="cursor-pointer">
                    <Image src={LogoStrava} className="h-12 w-auto" alt="Conectar com Strava" />
                </button>
            </div>
        </div>
    );
}