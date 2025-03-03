'use client'

import React from "react";

import { Info } from "lucide-react";

import Link from "next/link";
import Canvas from "@/components/Canvas";
import { useImage } from '@/context/ImageContext'; // Importa o hook do contexto


export default function Pos({params}) {
  const { id } = React.use( params );

  const { imageUrl, zoom, position, shapes, atualTemplate, updateShapes} = useImage();
  
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-y-12">
    <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Quais Informações deseja mostrar?</h1>
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
        <div className="w-full flex justify-between items-center">
          <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
          <Info className="text-white size-8"/>
        </div>
        <div className="w-full flex flex-col items-center gap-x-5">
        {atualTemplate && <Canvas template={atualTemplate} position={position} zoom={zoom} imageUrl={imageUrl} shapes={shapes} updateShapes={updateShapes} />}
        </div>
        
        
      </div>
      <div className="flex items-center justify-between w-full mt-6 px-4">
        <button 
          onClick={()=> history.go(-1)}
          className="text-[#1E1E1E] font-semibold italic">
          &lt; voltar
        </button>
        <Link href={`/activity/${id}/model/customizavel`}
          className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
          Avançar
        </Link>
      </div>
    </div>
  </div>
  )
}
