'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import Image from "next/image";
import InfoStrava from "../../../../../../../../public/informacoesStrava.svg"; 
import InfoGarmin from "../../../../../../../../public/informacoesGarmin.svg"; 
import CheckboxInformacoes from "@/components/CheckboxInformacoes";
import Link from "next/link";
import Canvas from "@/components/Canvas";

const checkBoxInformacoes = [
  { nome: "Distância", isSelect: true },
  { nome: "Ritmo Médio", isSelect: false },
  { nome: "Tempo Total", isSelect: false },
  { nome: "Elevação", isSelect: false },
  { nome: "Ganho Elevação", isSelect: true },
  { nome: "Elevação Max", isSelect: true },
  { nome: "Calorias", isSelect: false },
  { nome: "Tênis", isSelect: false },
  { nome: "Economia CO2", isSelect: true },
  { nome: "Parcial mais rápida", isSelect: false },
  { nome: "Bpm médio", isSelect: false },
  { nome: "Bpm mais alto", isSelect: true },
  { nome: "Passos", isSelect: false },
  { nome: "Tempo movimentação", isSelect: true }
]

export default function Edit({ params }) {
  const { template } = params; // Pegando o parâmetro 'template' da URL

  const [imagemMain, setImagemMain] = useState(null); 
    console.log(template)
    useEffect(() => {
    if (template == 4) {
        setImagemMain(InfoStrava);
    } else if(template == 5) {
        setImagemMain(InfoGarmin);
    }
    }, [template]); 

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-y-12">
    <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Quais Informações deseja mostrar?</h1>
    <div className="flex flex-col w-full ">
      <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
        <div className="w-full flex justify-between items-center">
          <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
          <Info className="text-white size-8"/>
        </div>
        <div className="w-full flex flex-col items-center gap-x-5">
          <div className="bg-black flex items-center justify-center p-12 rounded-3xl">
            <Image src={imagemMain} alt="imagem template" className="w-[400px]" />
          </div>
         
          <div className="grid grid-cols-2 place-content-center gap-y-5
          h-96 ">
            {checkBoxInformacoes.map((item, index)=>(
              <CheckboxInformacoes key={'checkbox ' + index} title={item.nome} isSelect={item.isSelect}/>
            ))}
            
          </div>
        </div>
        
      </div>
      <div className="flex items-center justify-between w-full mt-6 px-4">
        <button className="text-[#1E1E1E] font-semibold italic">
          &lt; voltar
        </button>
        <Link href={`${template}/pos/${template}`}
          className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
          Avançar
        </Link>
      </div>
    </div>
  </div>
  )
}
