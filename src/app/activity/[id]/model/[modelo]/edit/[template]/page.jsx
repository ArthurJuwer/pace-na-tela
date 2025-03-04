'use client'

import React, { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import html2canvas from 'html2canvas';
import CheckboxInformacoes from "@/components/CheckboxInformacoes";
import useFormatValue from "@/hooks/useFormatValue"; // Ajuste o caminho conforme necessário

import { useImage } from "@/context/ImageContext";
import { redirect } from "next/navigation";

export default function Edit({ params }) {

  const { template } = React.use(params);
  const { formatValue } = useFormatValue();
  const { activity, atualTemplate, updateAtualTemplate } = useImage();

  const [checkBoxInformacoes, setCheckBoxInformacoes] = useState([
    { id: "distance", nome: "Distância", isSelect: false, value: undefined },
    { id: "average_speed", nome: "Ritmo Médio", isSelect: false, value: undefined },
    { id: "elapsed_time", nome: "Tempo Total", isSelect: false, value: undefined },
    { id: "total_elevation_gain", nome: "Ganho Elevação", isSelect: false, value: undefined }, 
    { id: "elev_high", nome: "Elevação Max", isSelect: false, value: undefined }, 
    { id: "elev_low", nome: "Elevação Min", isSelect: false, value: undefined }, 
    { id: "calories", nome: "Calorias", isSelect: false, value: undefined }, 
    { id: "gear.nickname", nome: "Tênis", isSelect: false, value: undefined }, 
    { id: "kilojoules", nome: "Economia CO2", isSelect: false, value: undefined },  
    { id: "max_speed", nome: "Parcial mais rápida", isSelect: false, value: undefined },  
    { id: "average_watts", nome: "Bpm médio", isSelect: false, value: undefined },  
    { id: "steps", nome: "Passos", isSelect: false, value: undefined }, 
    { id: "moving_time", nome: "Tempo movimentação", isSelect: false, value: undefined }, 
    { id: "start_date", nome: "Data e Hora de Início", isSelect: false, value: undefined },
    { id: "athlete_count", nome: "Contagem de Atletas", isSelect: false, value: undefined },
    { id: "pr_count", nome: "Contagem de PRs", isSelect: false, value: undefined },
    { id: "trainer", nome: "Treinador", isSelect: false, value: undefined }, 
    { id: "pr_count", nome: "Contagem de PRs", isSelect: false, value: undefined },
    { id: "kudos_count", nome: "Kudos", isSelect: false, value: undefined },
    { id: "location_city", nome: "Cidade", isSelect: false, value: undefined },
    { id: "location_state", nome: "Estado", isSelect: false, value: undefined }, 
    { id: "location_country", nome: "País", isSelect: false, value: undefined }, 
  ]);

  const templateLimits = {
    4: 6,  
    5: 3,  
  };

  const contentRef = useRef(null); 
  

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

  const preencherValores = () => {
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
  
    updatedCheckBoxInformacoes.forEach((item) => {
      item.value = activity && activity[item.id] !== undefined 
        ? formatValue(item.id, activity[item.id]) 
        : "--";
    });
  
    setCheckBoxInformacoes(updatedCheckBoxInformacoes);
  };
  const selecionarAleatorios = () => {
    const maxSelections = templateLimits[Number(template)] || 3;
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];

    const filteredCheckBoxInformacoes = updatedCheckBoxInformacoes.filter(item => item.value !== undefined);

    filteredCheckBoxInformacoes.forEach(item => item.isSelect = false);

    const availableIndices = Array.from({ length: filteredCheckBoxInformacoes.length }, (_, i) => i);
    let selectedIndices = [];
    
    while (selectedIndices.length < maxSelections) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices[randomIndex];
      
      if (!selectedIndices.includes(selectedIndex)) {
        selectedIndices.push(selectedIndex);
        filteredCheckBoxInformacoes[selectedIndex].isSelect = true;
      }
    }
    setCheckBoxInformacoes(filteredCheckBoxInformacoes);
  };
  
  
  
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(()=>{
    preencherValores()
    selecionarAleatorios()
  }, [])
  
  useEffect(() => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);
   
    if (Number(template) === 4) {
      // TROCAR O TEMPLATE == (4) por uma busca do banco de dados, onde tera todos os valores e nao ira vir do nada
      
      const content = selectedItems.map((item, _index) => {
        return `
            <div class="text-center">
              <p class="text-xl font-bold text-gray-700">${item.value}</p>
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
          <div class="relative  flex items-center justify-center w-28 h-28 border-4 border-${index === 1 ? 'orange' : index === 2 ? 'blue' : 'green'}-500 rounded-full ${index === 1 ? ' -ml-5 -mr-5 z-50' : 'z-0'}">
            
            <div class="text-center">
              <p class="text-xl font-bold text-gray-700">${item.value}</p>
              <p class="text-xs text-gray-500">${item.nome}</p>
            </div>
          </div>
        `;
        // MELHORAR POR DENTRO
      }).join(''); 

      const wrappedContent = `
      <div class="mx-2 flex justify-center items-center">
          ${content}
      </div>
    `;

      setHtmlContent(wrappedContent); 
    } 
  }, [template, checkBoxInformacoes]);

  const handleCapture = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, {
        backgroundColor: null,
        useCORS: true
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); 
  
        const maxWidth = 160; 
        const scaleFactor = maxWidth / canvas.width;
  
        updateAtualTemplate({
          src: imgData,
          width: maxWidth,
          height: Math.round(canvas.height * scaleFactor) 
        });
  
        redirect(`${template}/pos`);
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
          <div className="w-full flex flex-col items-center gap-10">
            <div className="bg-gray-300 flex items-center justify-center p-8 rounded-3xl w-full ">
              <div className="w-full h-auto bg-transparent" ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <div className="grid grid-cols-2 place-content-center gap-5">
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
          <button 
            onClick={()=> history.go(-1)}
            className="text-[#1E1E1E] font-semibold italic">
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
