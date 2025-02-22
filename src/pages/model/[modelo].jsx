import { useRouter } from "next/router";
import "../../pages/globals.css";
import PostExample from "../../../public/postTeste.svg";
import PostLogo from "../../../public/postLogo.svg";
import PostUser from "../../../public/postUser.svg";
import Image from "next/image";
import { Facebook, Instagram, Upload } from "lucide-react";
import Link from "next/link";

export default function Modelo() {
  const router = useRouter();
  const { modelo } = router.query;

  return (
    <div>
    {
    (modelo === 'customizavel' || modelo === 'ambos') && 
        <div>
            Opção {modelo} selecionada
        </div>
    }
    {
    (modelo === 'interativo' || modelo === 'ambos') &&
        <div className="flex flex-col justify-center gap-y-6 p-8 font-inter">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-10">Compartilhe o modelo que deseja!</h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="flex items-center flex-col gap-y-2">
              <h2 className="px-8 py-2.5 bg-white text-blueMain font-semibold text-center text-xs italic rounded-xl">Posts interativo</h2>
              <h3 className="italic text-[#013E9D] font-semibold">Informações de <span className="underline">Distância</span></h3>
            </div>
            <div className="flex flex-col gap-y-8 items-center justify-center w-full">
              
              <div className="bg-white rounded-3xl border-blue-700 border-2 px-7 pt-6 pb-8 flex flex-col gap-y-7 items-center font-myanmar">
                <div className="w-full flex justify-between">
                  <Image src={PostLogo} alt="" className="w-8" />
                  <div className="flex items-center gap-2">
                    <Image src={PostUser} alt="" className="w-7 rounded-full" />
                    <h1 className="text-sm">Arthur_Juwer</h1>
                  </div>
                </div>
                <Image src={PostExample} alt="" className="w-9/12" />
                <div className="flex items-center flex-col gap-y-2">
                  <h1 className="text-[#1E1E1E] text-sm text-center font-semibold w-11/12 ">Você fez o equivalante a 25 voltas na pista de atletismo</h1>
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
