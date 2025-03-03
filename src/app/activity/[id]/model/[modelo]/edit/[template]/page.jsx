'use client'

import React, { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import html2canvas from 'html2canvas';

import Image from "next/image";
import InfoStrava from "../../../../../../../../public/informacoesStrava.svg"; 
import InfoGarmin from "../../../../../../../../public/informacoesGarmin.svg"; 
import CheckboxInformacoes from "@/components/CheckboxInformacoes";

import { useImage } from "@/context/ImageContext";
import { redirect } from "next/navigation";

export default function Edit({ params }) {

  const { template } = React.use(params);
  const { atualTemplate, updateAtualTemplate } = useImage();

  const [checkBoxInformacoes, setCheckBoxInformacoes] = useState([
    { nome: "Distância", isSelect: true }, 
    { nome: "Ritmo Médio", isSelect: true },
    { nome: "Tempo Total", isSelect: true },
    { nome: "Elevação", isSelect: false },
    { nome: "Ganho Elevação", isSelect: false },
    { nome: "Elevação Max", isSelect: false },
    { nome: "Calorias", isSelect: false },
    { nome: "Tênis", isSelect: false },
    { nome: "Economia CO2", isSelect: false },
    { nome: "Parcial mais rápida", isSelect: false },
    { nome: "Bpm médio", isSelect: false },
    { nome: "Bpm mais alto", isSelect: false },
    { nome: "Passos", isSelect: false },
    { nome: "Tempo movimentação", isSelect: false }
  ]);

  const templateLimits = {
    4: 6,  
    5: 3,  
  };

  const contentRef = useRef(null); // Ref para o conteúdo que será capturado
  

  const toggleSelect = (index) => {
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
    
    const maxSelections = templateLimits[Number(template)] || 3;
    
    const selectedCount = updatedCheckBoxInformacoes.filter(item => item.isSelect).length;
  
    if (!updatedCheckBoxInformacoes[index].isSelect && selectedCount >= maxSelections) {
      return;
    }
  
    updatedCheckBoxInformacoes[index].isSelect = !updatedCheckBoxInformacoes[index].isSelect;
    setCheckBoxInformacoes(updatedCheckBoxInformacoes);
  };


  const randomlySelectItems = () => {
    const maxSelections = templateLimits[Number(template)] || 3;
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
    updatedCheckBoxInformacoes.forEach(item => item.isSelect = false);
    
    const availableIndices = Array.from({ length: updatedCheckBoxInformacoes.length }, (_, i) => i);
    let selectedIndices = [];
    
    while (selectedIndices.length < maxSelections) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices[randomIndex];
      
      if (!selectedIndices.includes(selectedIndex)) {
        selectedIndices.push(selectedIndex);
        updatedCheckBoxInformacoes[selectedIndex].isSelect = true;
      }
    }
    setCheckBoxInformacoes(updatedCheckBoxInformacoes);
  };
  
  
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(()=>{
    randomlySelectItems()
  }, [])
  
  useEffect(() => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);
   
    if (Number(template) === 4) {
      // TROCAR O TEMPLATE == (4) por uma busca do banco de dados, onde tera todos os valores e nao ira vir do nada
      
      const content = selectedItems.map((item, _index) => {
        return `
            <div class="text-center">
              <p class="text-xl font-bold text-gray-700">X</p>
              <p class="text-xs text-gray-500">${item.nome}</p>
            </div>
          `;
      }).join(''); 
      
      const wrappedContent = `
      <div class="w-full grid grid-cols-2 gap-8">
          ${content}
      </div>
    `;

      setHtmlContent(wrappedContent); 
    } else if (Number(template) === 5) {
      const content = selectedItems.map((item, index) => {
        return `
          <div class="relative flex items-center justify-center w-28 h-28 border-4 border-${index === 1 ? 'blue' : index === 2 ? 'green' : 'red'}-500 rounded-full">
            <div class="text-center">
              <p class="text-xl font-bold text-gray-700">X</p>
              <p class="text-xs text-gray-500">${item.nome}</p>
            </div>
          </div>
        `;
      }).join(''); 

      const wrappedContent = `
      <div class="flex">
          ${content}
      </div>
    `;

      setHtmlContent(wrappedContent); 
    } 
  }, [template, checkBoxInformacoes]);

  const handleCapture = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        // Converte o canvas em uma imagem (Data URL)
        const imgData = canvas.toDataURL("image/svg");
        updateAtualTemplate(
          {
          src: imgData,
          width: 200,
          height: 80,
        }
      ); // Salva a imagem no estado
        redirect(`${template}/pos`)
      });
      
    }
  };

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
            <div className="bg-gray-400 flex items-center justify-center p-8 rounded-3xl w-full ">
              <div className="w-full h-auto" ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <div className="grid grid-cols-2 place-content-center gap-y-5 h-96">
              {checkBoxInformacoes.map((item, index) => (
                <CheckboxInformacoes
                  key={'checkbox ' + index}
                  title={item.nome}
                  isSelect={item.isSelect}
                  toggleSelect={() => toggleSelect(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-6 px-4">
          <button className="text-[#1E1E1E] font-semibold italic">
            &lt; voltar
          </button>
          <button onClick={handleCapture} className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
            Avançar
          </button>
        </div>
      </div>
    </div>  
  );
}
