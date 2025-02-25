// import { useRouter } from "next/router";
import PostExample from "../../../../../../public/postTeste.svg";
import PostLogo from "../../../../../../public/postLogo.svg";
import PostUser from "../../../../../../public/postUser.svg";
import ModeloInfo from "../../../../../../public/informacoesStrava.svg";
import ModeloGarmin from "../../../../../../public/informacoesGarmin.svg";

import Phone from "../../../../../../public/phone.svg";
import Image from "next/image";
import { Facebook, Info, Instagram, Search, Upload } from "lucide-react";
import Link from "next/link";
import Templates from "@/components/Templates";

const PHONE_WIDTH = 230;
const PHONE_HEIGHT = 479;
const PHONE_CONTENT_PADDING = 6;

export default function Modelo({params}) {
//   const router = useRouter();
//   const { modelo } = router.query;
const { modelo } = params;

  return (
    <div className="font-inter">
    {
    (modelo === 'customizavel' || modelo === 'ambos') && 
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Escolha um template para customizar </h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="w-full flex justify-between items-center">
              <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
              <Info className="text-white size-8"/>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-y-10">

              <div className="w-8/12">
              <div className="flex">
                <div
                  className="flex-1 p-10 relative overflow-hidden flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute -inset-2.5 bg-black rounded-[30px]" />
                    <div
                      className={`w-[${PHONE_WIDTH}px] h-[${PHONE_HEIGHT}px] bg-gray-600 relative rounded-[25px] overflow-hidden`}
                      // TROCAR ESSE BG-WHITE PELA FOTO DA PESSOA
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl" />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="w-full flex h-12 relative">
                  <input type="text" className="w-full h-full flex bg-white rounded-lg text-sm pl-4 font-semibold placeholder:text-[#BCBCBC]" placeholder="O que você esta procurando?" />
                  <Search className="absolute transform -translate-y-1/2 top-1/2 right-4 text-[#1E1E1E]" />
              </div>
              <div className="flex flex-col gap-y-4 justify-start items-start w-full">

                <h1 className="text-white font-semibold italic ml-1">Strava</h1>
                {/* COLOCAR SCROLL BAR AQUI */}
                <div className="grid grid-cols-2 gap-4">
                  <Templates title='Informações Strava' image={ModeloInfo} template={1} />
                  <Templates title='Mapa Strava' image={ModeloInfo} template={2} />
                  <Templates title='Troféus Strava' image={ModeloInfo} template={3} />
                  
                </div>

                <h1 className="text-white font-semibold italic ml-1">Informações</h1>
                    <div className="grid grid-cols-2 gap-4">
                    <Templates title='informações Strava' image={ModeloInfo} template={4} />
                    <Templates title='informações Garmin' image={ModeloGarmin} template={5} />
                  </div>

              </div>
              

            </div>
 
          </div>
          <div className="flex items-center justify-between w-full mt-6 px-4">
            <button className="text-[#1E1E1E] font-semibold italic">
            &lt; voltar
            </button>
            <button
            className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
            Avançar
            </button>
            {/* ONCLICK PARA MUDAR A PARTE DOS TEMPLATES E APARECER OS DE COMPARTILHAR */}
        </div>
        </div>
    }
    {
    (modelo === 'interativo' || modelo === 'ambos') &&
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Compartilhe o modelo que deseja!</h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="flex items-center flex-col gap-y-2">
              <h2 className="px-12 py-3 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
              <h3 className="italic text-[#013E9D] font-semibold">Informações de <span className="underline">Distância</span></h3>
            </div>
            <div className="flex flex-col gap-y-8 items-center justify-center w-full">
              
              <div className="bg-white rounded-3xl border-blue-700 border-2 px-7 pt-6 pb-8 flex flex-col gap-y-7 items-center font-myanmar">
                <div className="w-full flex justify-between">
                  <Image src={PostLogo} alt="" className="w-9" />
                  <div className="flex items-center gap-2">
                    <Image src={PostUser} alt="" className="w-7 rounded-full" />
                    <h1 className="text-sm">Arthur_Juwer</h1>
                  </div>
                </div>
                <Image src={PostExample} alt="" className="w-9/12" />
                <div className="flex items-center flex-col gap-y-2">
                  <h1 className="text-[#1E1E1E] text-center font-semibold w-11/12 leading-relaxed">Você fez o equivalante a 25 voltas na pista de atletismo</h1>
                  <p className="text-xs text-[#989898] font-light text-center ">10km é um resultado Incrível</p>
                </div>
              </div>
              <div className="flex gap-5 items-center justify-center">
                <div className="size-2.5 rounded-full bg-white"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
              </div>
              <h3 className="text-white text-sm font-semibold italic">Compartilhe sua corrida - Tag @pacenatela</h3>
              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Instagram className="text-blueMain"/>
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <div className="flex items-center justify-center p-1 bg-blueMain rounded-full">
                      <Facebook className="text-white" fill="#ffffff" stroke="1"/>
                    </div>
                    
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Upload className="text-blueMain"/>
                  </div>
                  <span className="text-white text-xs font-semibold">Mais </span>
                </div>
              </div>
            </div>
          </div>
          <Link href={'/'} className="font-bold italic"> - Voltar</Link>
          {/* FAZER JAVASCRIPT GO HISTORY (-1) */}
        </div>
    }
  </div>

  );
}
