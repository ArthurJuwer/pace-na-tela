'use client'
import Image from "next/image";
import PostLogo from "../../../../../../../public/postLogo.svg";
import PostUser from "../../../../../../../public/postUser.svg";
import PostExample from "../../../../../../../public/postTeste.svg";
import { Facebook, Info, Instagram, Search, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useImage } from "@/context/ImageContext";


export default function FinalizadoPage({ params }) {
  const { modelo } = React.use(params); // Next.js automaticamente fornece os parâmetros
  const { imageUrl, zoom, position, shapes} = useImage();
  const PHONE_WIDTH = 230;
  const PHONE_HEIGHT = 479;
  const shapesArray = Array.isArray(shapes) ? shapes : [];

  return (
    <div>
      {modelo === "customizavel" ? (
        <div className="flex flex-col items-center justify-center gap-y-6">
        <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Compartilhe o modelo que deseja!</h1>
        <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
          <div className="flex items-start flex-col gap-y-2">
            <h2 className="px-12 py-3 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
            
          </div>
          <div className="flex flex-col gap-y-8 items-center justify-center w-full">
            
          <div className="w-8/12">
                          <div className="flex">
                            <div
                              className={`relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[30px] bg-gray-600 w-full h-[479px]`}
                              // ERA PARA SER PHONE_HEIGHT
                            >
                              {/* CASO A PESSOA COLOQUE A FOTO FORA DA TELA ELA PODE ESCOLHER A COR QUE DESEJA (ATUAL BG_GRAY_600) */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />
          
                                
                                <div
                                  className={`w-[${PHONE_WIDTH}px]  h-[${PHONE_HEIGHT}px] ${imageUrl ? 'relative' : 'bg-gray-600'} overflow-hidden flex items-center justify-center`}
                                >
                                  <img src={imageUrl} className={`max-w-none h-[${PHONE_HEIGHT}px]`} alt="" style={{transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`}} />
                                  
                                  {shapesArray.map(shape => (
                                <div
                                  key={shape.id}
                                  style={{
                                    position: 'absolute',
                                    left: shape.x,
                                    top: shape.y,
                                    width: shape.width,
                                    height: shape.height,
                                  }}
                                  className={`cursor-pointer`}
                                >
                                  <img
                                    src={shape.templateUrl}
                                    alt="User added"
                                    className="w-full h-full object-cover"
                                    draggable="false"
                                  />
                                </div>
                              ))}
                                </div>
                              </div>
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
      </div>
      ) : modelo === "interativo" ? (
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
        </div>
      ) : (
        <p>Modelo desconhecido.</p>
      )}
    </div>
  );
}
