import Image from "next/image";
import LogoStrava from "../../../public/logo-apps-integracao/Strava.svg";
import { useState, useEffect } from "react";

export default function ModalDesktop({ closeModal }) {
    const [url, setUrl] = useState("");
    // VER PARA ADICIONAR ROUTER

    const handleLoginStrava = () => {
        window.location.href = '/api/auth/strava';
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md lg:max-w-lg overflow-hidden transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Conectar aplicativo</h2>
                    <button 
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => closeModal(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6">
                    <p className="text-gray-600 mb-6 text-center">
                        Conecte sua conta do Strava para sincronizar suas atividades e estatísticas.
                    </p>
                    
                    <div className="space-y-4">
                        <button 
                            className="w-full bg-[#1D6BC3] hover:bg-[#02277C] text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center relative shadow-md hover:shadow-lg"
                            onClick={handleLoginStrava}
                        >
                            <div className="absolute left-4 bg-white p-2 rounded-lg">
                                <Image src={LogoStrava} className="h-6 w-auto" alt="logo strava" />
                            </div>
                            <span>Conectar com Strava</span>
                        </button>
                    </div>
                    
                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-gray-500 text-sm">ou</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Não tem uma conta Strava?</p>
                        <a 
                            href="https://www.strava.com/register" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                            Criar conta Strava
                        </a>
                    </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        Ao conectar, você concorda com nossos{' '}
                        <a href="#" className="text-blue-500 hover:underline">Termos de Serviço</a> e{' '}
                        <a href="#" className="text-blue-500 hover:underline">Política de Privacidade</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}