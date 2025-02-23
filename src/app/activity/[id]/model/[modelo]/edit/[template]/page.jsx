import Templates from "@/components/Templates";
import { Info } from "lucide-react";
import Image from "next/image";
import Phone from "../../../../../../../../public/phone.svg";
import CheckboxInformacoes from "@/components/CheckboxInformacoes";
import Link from "next/link";

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

export default function Edit() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-y-12">
    <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Quais Informações deseja mostrar?</h1>
    <div className="h-[85dvh] flex flex-col ">
      <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8 h-4/5">
        <div className="w-full flex justify-between items-center">
          <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
          <Info className="text-white size-8"/>
        </div>
        <div className="w-full flex justify-between gap-x-5">

          <div className="w-7/12">
            <Image src={Phone} alt="" className="w-full z-40" />
          </div>
          <div className="flex flex-col gap-y-5
          h-96 overflow-y-auto 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:p-2
          [&::-webkit-scrollbar-thumb]:bg-[#8194BE]
          dark:[&::-webkit-scrollbar-track]:bg-[#2C3E50]  
          dark:[&::-webkit-scrollbar-thumb]:bg-[#5A6D8E]">
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
        <Link href={'/'}
          className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
          Avançar
        </Link>
      </div>
    </div>
  </div>
  )
}
