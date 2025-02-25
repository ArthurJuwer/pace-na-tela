'use client'

import { useEffect, useRef, useState } from "react";

import { Info } from "lucide-react";
import Image from "next/image";
import InfoStrava from "../../../../../../../../../../public/informacoesStrava.svg"; 
import InfoGarmin from "../../../../../../../../../../public/informacoesGarmin.svg"; 

import CheckboxInformacoes from "@/components/CheckboxInformacoes";
import Link from "next/link";
import Canvas from "@/components/Canvas";

export default function Posicao({ params }) {
  const { posicao } = params; 
  const [imagemMain, setImagemMain] = useState(null); 
  console.log(posicao)
  useEffect(() => {
    if (posicao == 4) {
      setImagemMain(InfoStrava);
    } else if (posicao == 5) {
      setImagemMain(InfoGarmin);
    }
  }, [posicao]); 
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
        {imagemMain && <Canvas image={imagemMain} />}
        </div>
        
        
      </div>
      <div className="flex items-center justify-between w-full mt-6 px-4">
        <button className="text-[#1E1E1E] font-semibold italic">
          &lt; voltar
        </button>
        <Link href={'/'}
          className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
          Avançar
        </Link>
      </div>
    </div>
  </div>
  )
}
