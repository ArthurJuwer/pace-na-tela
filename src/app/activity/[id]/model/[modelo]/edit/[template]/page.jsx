'use client'
import React, { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import html2canvas from 'html2canvas';
import CheckboxInformacoes from "@/components/CheckboxInformacoes";
import useFormatValue from "@/hooks/useFormatValue"; // Ajuste o caminho conforme necessário
import logoStrava from "../../../../../../../../public/strava-logo-0.png"
import fundoTransparente from "../../../../../../../../public/fundo-transparente.png"
// SUBSTITUIR NO FUTURO POR HTML,TAILWID

import { useImage } from "@/context/ImageContext";
import { redirect } from "next/navigation";

export default function Edit({ params }) {

  const { template } = React.use(params);
  const { formatDate, formatTime, formatBoolean, formatValue } = useFormatValue();
  const { activity, updateAtualTemplate } = useImage();

  const [checkBoxInformacoes, setCheckBoxInformacoes] = useState([
    { id: "distance", nome: "Distância", isSelect: false, value: undefined, type: "number" },
    { id: "average_speed", nome: "Ritmo Médio", isSelect: false, value: undefined, type: "number" },
    { id: "elapsed_time", nome: "Tempo Total", isSelect: false, value: undefined, type: "time" },
    { id: "total_elevation_gain", nome: "Ganho Elevação", isSelect: false, value: undefined, type: "number" },
    { id: "elev_high", nome: "Elevação Max", isSelect: false, value: undefined, type: "number" },
    { id: "elev_low", nome: "Elevação Min", isSelect: false, value: undefined, type: "number" },
    { id: "calories", nome: "Calorias", isSelect: false, value: undefined, type: "number" },
    { id: "gear.nickname", nome: "Tênis", isSelect: false, value: undefined, type: "string" },
    { id: "kilojoules", nome: "Economia CO2", isSelect: false, value: undefined, type: "number" },
    { id: "max_speed", nome: "Parcial mais rápida", isSelect: false, value: undefined, type: "number" },
    { id: "average_watts", nome: "Bpm médio", isSelect: false, value: undefined, type: "number" },
    { id: "steps", nome: "Passos", isSelect: false, value: undefined, type: "number" },
    { id: "moving_time", nome: "Tempo movimentação", isSelect: false, value: undefined, type: "time" },
    { id: "start_date", nome: "Data e Hora de Início", isSelect: false, value: undefined, type: "date" },
    { id: "athlete_count", nome: "Contagem de Atletas", isSelect: false, value: undefined, type: "number" },
    { id: "pr_count", nome: "Contagem de PRs", isSelect: false, value: undefined, type: "number" },
    { id: "trainer", nome: "Treinador", isSelect: false, value: undefined, type: "boolean" },
    { id: "kudos_count", nome: "Kudos", isSelect: false, value: undefined, type: "number" },
    { id: "location_city", nome: "Cidade", isSelect: false, value: undefined, type: "string" },
    { id: "location_state", nome: "Estado", isSelect: false, value: undefined, type: "string" },
    { id: "location_country", nome: "País", isSelect: false, value: undefined, type: "string" }
  ]);

  const templateLimits = {
    1: 6,  
    2: 3,  
    3: 0
  };

  useEffect(() => {
    preencherValores();
  }, []);

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
      if (activity && activity[item.id] !== undefined) {
        if (item.type === 'number') {
          item.value = formatValue(item.id, activity[item.id]);
        } else if (item.type === 'time') {
          item.value = formatTime(activity[item.id]);
        } else if (item.type === 'date') {
          item.value = formatDate(activity[item.id]);
        } else if (item.type === 'boolean') {
          item.value = formatBoolean(activity[item.id]);
        } else {
          if (activity[item.id] !== null) {
            item.value = activity[item.id];
          } else {
            item.value = undefined;
          }
        }
      } else {
        item.value = undefined;
      }
    });
    const availableItems = updatedCheckBoxInformacoes.filter(item => item.value !== undefined && item.value !== null);
  
    setCheckBoxInformacoes(availableItems);
    selecionarAleatorios(availableItems);
  };

  const selecionarAleatorios = (availableItems) => {
    const maxSelections = templateLimits[Number(template)] || 3;

    if (availableItems.length === 0) return;

    availableItems.forEach(item => (item.isSelect = false));

    let selectedIndices = new Set();
    while (selectedIndices.size < Math.min(maxSelections, availableItems.length)) {
      selectedIndices.add(Math.floor(Math.random() * availableItems.length));
    }

    selectedIndices.forEach(index => (availableItems[index].isSelect = true));

    setCheckBoxInformacoes([...availableItems]);
  };

  const [htmlContent, setHtmlContent] = useState('');
  const [textColor, setTextColor] = useState('text-gray-700');
  const [bgColor, setBgColor] = useState('bg-gray-300'); // Novo estado para armazenar a cor de fundo

  useEffect(() => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);

    if (Number(template) === 1) {
      const content = selectedItems.map((item, _index) => {
        return `
            <div class="text-center">
              <p class="text-xs text-gray-500">${item.nome}</p>
              <p class="text-xl font-bold ${textColor}">${item.value}</p>
            </div>
          `;
      }).join(''); 
      
      const wrappedContent = `
      <div class="w-full grid grid-cols-2 gap-6 ${bgColor} p-8 rounded-3xl"> <!-- bgColor é utilizado aqui -->
          ${content}
      </div>
    `;

      setHtmlContent(wrappedContent); 
    } else if (Number(template) === 2) {
      const content = selectedItems.map((item, index) => {
        return `
          <div class="relative flex items-center justify-center w-28 h-28 border-4 border-${index === 1 ? 'orange' : index === 2 ? 'blue' : 'green'}-500 rounded-full ${index === 1 ? ' -ml-5 -mr-5 z-50' : 'z-0'}">
            <div class="text-center">
              <p class="text-xl font-bold ${textColor}">${item.value}</p>
              <p class="text-xs text-gray-500">${item.nome}</p>
            </div>
          </div>
        `;
      }).join(''); 

      const wrappedContent = `
      <div class="mx-2 ${bgColor} flex items-center justify-center p-8 rounded-3xl w-full"> <!-- bgColor é utilizado aqui -->
          ${content}
      </div>
    `;

      setHtmlContent(wrappedContent); 
    } 
    
    else if (Number(template) === 3) {
      handleCapture({
        semDados: true,
        imagem: logoStrava,
        name: 'logo_strava'
      });
    }
  }, [template, checkBoxInformacoes, bgColor]); // bgColor é dependência agora

  const handleCapture = ({ semDados, imagem, name }) => {
    const maxWidth = 160;

    if (semDados === true) {
      const scaleFactor = maxWidth / imagem.width;

      updateAtualTemplate({
        src: imagem.src,
        width: maxWidth,
        height: Math.round(imagem.height * scaleFactor), 
        name: name
      });
      redirect(`${template}/pos`);
    }
    if (contentRef.current) {
      html2canvas(contentRef.current, {
        backgroundColor: null,
        useCORS: true
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); 
        const scaleFactor = maxWidth / canvas.width;

        let generatedName = ''
        if (Number(template) === 1) {
          generatedName = 'info_strava'
        } else if(Number(template) === 2){
          generatedName = 'info_garmin'
        }

        updateAtualTemplate({
          src: imgData,
          width: maxWidth,
          height: Math.round(canvas.height * scaleFactor),
          name: generatedName
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
            <div className="w-full h-auto bg-transparent" ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <div className="flex gap-4">
              <button
                onClick={() => {setBgColor('bg-transparent'); setTextColor('text-white')}} 
                
                // ALTERAR PARA COLOCAR BG-IMAGE 

                style={{ backgroundImage: `url('${fundoTransparente.src}')`, backgroundSize: 'cover', backgroundPosition: "center" }}
                className="p-5 border-2 border-black rounded">
              </button>
              <button onClick={() => {setBgColor('bg-black'); setTextColor('text-white')}} className="p-5 bg-black border-black border-2 rounded"></button>
              <button onClick={() => {setBgColor('bg-white'); setTextColor('text-black')}} className="p-5 bg-white border-black border-2 rounded"></button>
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
