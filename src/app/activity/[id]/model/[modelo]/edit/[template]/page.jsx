'use client'
import React, { useEffect, useRef, useState } from "react";
import { Info, Pickaxe, Pipette } from "lucide-react";
import html2canvas from 'html2canvas';
import CheckboxInformacoes from "@/components/CheckboxInformacoes";
import useFormatValue from "@/hooks/useFormatValue"; // Ajuste o caminho conforme necessário
import logoStrava from "../../../../../../../../public/strava-logo-0.png"
// SUBSTITUIR NO FUTURO POR HTML,TAILWID

import { toPng } from 'html-to-image';


import { useImage } from "@/context/ImageContext";
import { redirect } from "next/navigation";
import TemplateButton from "@/components/Activity/TemplateButton";

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
    // { id: "trainer", nome: "Treinador", isSelect: false, value: undefined, type: "boolean" },
    { id: "kudos_count", nome: "Kudos", isSelect: false, value: undefined, type: "number" },
    { id: "location_city", nome: "Cidade", isSelect: false, value: undefined, type: "string" },
    { id: "location_state", nome: "Estado", isSelect: false, value: undefined, type: "string" },
    { id: "location_country", nome: "País", isSelect: false, value: undefined, type: "string" }
  ]);
  const buttonsFundo = [
    { bgColor: "url('/fundo-transparente.png')"}, // Transparente
    { bgColor: '#000000' }, // Preto
    { bgColor: '#2F2F2F' }, // Cinza escuro forte
    { bgColor: '#4B5563' }, // Cinza-600
    { bgColor: '#9CA3AF' }, // Cinza
    { bgColor: '#D1D5DB' }, // Cinza fraco
    { bgColor: '#2C6B2F' }, // Verde forte
    { bgColor: '#16A34A' }, // Verde-600
    { bgColor: '#1DB954' }, // Verde (Instagram)
    { bgColor: '#6B4226' }, // Marrom
    { bgColor: '#FF7F00' }, // Laranja
    { bgColor: '#FB923C' }, // Laranja-400
    { bgColor: '#FBBF24' }, // Amarelo-300
    { bgColor: '#F8C41A' }, // Amarelo (Instagram)
    { bgColor: '#0095F6' }, // Azul
    { bgColor: '#60A5FA' }, // Azul-400
    { bgColor: '#FF4D4D' }, // Vermelho fraco
    { bgColor: '#EF4444' }, // Vermelho-500
    { bgColor: '#FF0000' }, // Vermelho
    { bgColor: '#EC4899' }, // Rosa-500
    { bgColor: '#F472B6' }, // Rosa normal
    { bgColor: '#EC4899' }, // Rosa forte
    { bgColor: '#9B4D96' }, // Roxo
    { bgColor: '#6B21A8' }, // Roxo-700
];

const textButtons = [
  { textColor: '#FFFFFF' },
  { textColor: '#E5E7EB' },
  { textColor: '#D1D5DB' },
  { textColor: '#F9A8D4' },
  { textColor: '#F8C41A' },
  { textColor: '#F472B6' },
  { textColor: '#FF007F' },
  { textColor: '#FF4D4D' },
  { textColor: '#FFA07A' },
  { textColor: '#6B4226' },
  { textColor: '#D97706' },
  { textColor: '#0095F6' },
  { textColor: '#1E1E1E' },
  { textColor: '#FF7F00' },
  { textColor: '#1DB954' },
  { textColor: '#16A34A' },
  { textColor: '#2C6B2F' },
  { textColor: '#FF0000' },
  { textColor: '#9B4D96' },
  { textColor: '#EC4899' },
  { textColor: '#9CA3AF' },
  { textColor: '#2F2F2F' },
  { textColor: '#4B5563' },
  { textColor: '#000000' },

];

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

  const [activeSection, setActiveSection] = useState('Informações'); // Usando um único estado para gerenciar visibilidade

  const toggleVisibility = (section) => {
    setActiveSection(section === activeSection ? '' : section); // Toggle visibility of selected section
  };

  const moveSelectedItem = (index, direction) => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);
    const targetIndex = index + direction;
  
    if (targetIndex < 0 || targetIndex >= selectedItems.length) return;
  
    // Reorganiza diretamente na lista original com base na seleção
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
    
    const currentIndex = updatedCheckBoxInformacoes.findIndex(item => item.id === selectedItems[index].id);
    const targetItemIndex = updatedCheckBoxInformacoes.findIndex(item => item.id === selectedItems[targetIndex].id);
    
    // Troca os itens
    [updatedCheckBoxInformacoes[currentIndex], updatedCheckBoxInformacoes[targetItemIndex]] = 
    [updatedCheckBoxInformacoes[targetItemIndex], updatedCheckBoxInformacoes[currentIndex]];
  
    setCheckBoxInformacoes(updatedCheckBoxInformacoes);
  };
  


  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textShadow, setTextShadow] = useState('');
  const [bgColor, setBgColor] = useState('#1E1E1E'); 
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);

    if (Number(template) === 1) {
      const content = selectedItems.map((item, _index) => {
        return `
          <div class="text-center">
            <p class="text-xs text-gray-500">${item.nome}</p>
            <p style="font-size: 20px; font-weight: bold;color:${textColor};text-shadow:${textShadow}">${item.value}</p>
          </div>
        `;
      }).join('');
      
      
      const wrappedContent = `
  <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:24px; padding:32px; border-radius:24px; background:${bgColor}">
      ${content}
  </div>
`;


      setHtmlContent(wrappedContent); 
    } else if (Number(template) === 2) {
      const content = selectedItems.map((item, index) => {
        const borderColor = index === 1 ? 'orange' : index === 2 ? 'blue' : 'green';
        const marginClass = index === 1 ? '-ml-5 -mr-5 z-50 mb-16' : 'z-0';
    
        return `
          <div class="relative flex items-center justify-center w-28 h-28 border-4 border-${borderColor}-500 rounded-full ${marginClass}" style="background: ${bgColor};">
            <div class="text-center">
              <p class="text-xl" style="color: ${textColor}; text-shadow: ${textShadow};">${item.value}</p>
              <p class="text-xs text-gray-500">${item.nome}</p>
            </div>
          </div>
        `;
      }).join('');
    
      const wrappedContent = `
        <div class="mx-2 flex items-center justify-center p-8 rounded-3xl w-full" style="background: ${bgColor};">
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
  }, [template, checkBoxInformacoes, bgColor, textColor, textShadow]); // AQUI IRÁ ATUALIZAR O CONTEUDO HTML

  const PreHandleCapture = () => {
    if (bgColor === "url('/fundo-transparente.png')") {
      setBgColor('transparent');
      setTextShadow('');
    }
    setTimeout(() => {
        handleCapture(false, '', '');
    }, 500);
    

  };
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
  toPng(contentRef.current)
    .then((imgData) => {
      const image = new Image();
      image.src = imgData;

      const tempImage = new Image();
      tempImage.onload = () => {
        const scaleFactor = maxWidth / tempImage.width;

        let generatedName = '';
        if (Number(template) === 1) {
          generatedName = 'info_strava';
        } else if (Number(template) === 2) {
          generatedName = 'info_garmin';
        }

        updateAtualTemplate({
          src: imgData,
          width: maxWidth,
          height: Math.round(tempImage.height * scaleFactor),
          name: generatedName
        });

        redirect(`${template}/pos`);
      };
      tempImage.src = imgData;
    })
    .catch((error) => {
      console.error('Erro ao gerar imagem:', error);
    });
}

  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-y-12 font-inter">
      <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Quais Informações deseja mostrar?</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
          <div className="w-full flex justify-between items-center">
            <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
            <Info className="text-white size-8"/>
          </div>
          <div className="w-full flex flex-col items-center gap-10">
            <div className="w-full h-auto bg-transparent" ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <section className="w-full bg-blueThird py-4 rounded-xl">
              <ul className="flex justify-around text-white text-sm font-semibold">
                <li onClick={() => toggleVisibility('Informações')}>
                  Informações
                </li>
                <li onClick={() => toggleVisibility('Fundo')}>
                Fundo
                </li>
                <li onClick={() => toggleVisibility('Texto')}>
                  Texto
                </li>
                <li onClick={() => toggleVisibility('Ordem')}>
                  Ordem
                </li>
              </ul>
            </section>

            {activeSection === 'Informações' && 
              <div className="w-full px-3 flex flex-col gap-y-6 text-white">
              <h1 className="text-xl font-bold italic">Selecione as informações:</h1>
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
            }
            {activeSection === 'Fundo' && 
            <div className="w-full px-3 flex flex-col gap-y-6 text-white">
              <h1 className="text-xl font-bold italic">Cor do Fundo:</h1>
                <div className="grid grid-cols-5 gap-4" >

                  
                  <div className="p-7 bg-gradient-to-r from-violet-600 to-pink-500 border-gray-200 border-2 rounded-2xl flex items-center justify-center relative">
                    <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => {setBgColor(e.target.value)}}
                      className="size-10 cursor-pointer rounded-full border-2 border-gray-300 opacity-0 absolute z-10"  // Esconde o input mas mantém interativo
                    />
                    <Pipette className="absolute  z-0" size={30} />  {/* Ícone sobre o input */}
                  </div>

                  
                  {/* FAZER COM QUE PEGUE O TEXT ANTERIOR E ADICIONE O TEXT-SHADOW CASO FOR BRANCO */}

                  {buttonsFundo.map((button, index) => (
                    <TemplateButton 
                      key={index}
                      onClick={() => {
                        setBgColor(button.bgColor)
                        setTextShadow((button.bgColor == "url('/fundo-transparente.png')" && textColor == '#FFFFFF') ? '0px 0px 8px rgba(0, 0, 0, 1)' : '')
                      }}
                      bgColor={button.bgColor}
                    />
                  ))}
                </div>
              </div>
            }

          {activeSection === 'Texto' && 
          <div className="w-full px-3 flex flex-col gap-y-6 text-white">
              <h1 className="text-xl font-bold italic">Cor do Texto:</h1>
                <div className="grid grid-cols-5 gap-4" >

                  <div className="p-7 bg-gradient-to-r from-violet-600 to-pink-500 border-gray-200 border-2 rounded-2xl flex items-center justify-center relative">
                    <input 
                      type="color" 
                      value={textColor}
                      onChange={(e) => {setTextColor(e.target.value)}}
                      className="w-10 h-10 cursor-pointer rounded-full border-2 border-gray-300 opacity-0 absolute z-10"  // Esconde o input mas mantém interativo
                    />
                    <Pipette className="absolute  z-0" size={30} />  {/* Ícone sobre o input */}
                  </div>

                  {textButtons.map((button, index) => (
                    <TemplateButton 
                      key={index}
                      onClick={() => {setTextColor(button.textColor); setTextShadow(button.textColor === '#FFFFFF' && bgColor === "url('/fundo-transparente.png')" ? '0px 0px 8px rgba(0, 0, 0, 1)' : '')}}
                      bgColor={button.textColor}
                    />
                  ))}



                </div>
              </div>
          }
          {activeSection === 'Ordem' && (
            <div className="w-full px-3 flex flex-col gap-y-6 text-white">
              <h1 className="text-xl font-bold italic">Reordenar Informações Selecionadas:</h1>
              <div className="grid grid-cols-1 gap-4">
                {checkBoxInformacoes
                  .filter(item => item.isSelect)
                  .map((item, index, filteredItems) => (
                    <div key={item.id} className="flex justify-between items-center bg-blue-500 p-2 rounded">
                      <span>{item.nome}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => moveSelectedItem(index, -1)}
                          disabled={index === 0}
                          className={`px-2 py-1 rounded ${index === 0 ? 'opacity-50' : 'bg-green-500'}`}>
                          ▲
                        </button>
                        <button
                          onClick={() => moveSelectedItem(index, 1)}
                          disabled={index === filteredItems.length - 1}
                          className={`px-2 py-1 rounded ${index === filteredItems.length - 1 ? 'opacity-50' : 'bg-red-500'}`}>
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}


          </div>
        </div>
        
        <div className="flex items-center justify-between w-full mt-6 px-4">
          <button 
            onClick={()=> history.go(-1)}
            className="text-[#1E1E1E] font-semibold italic">
            &lt; voltar
          </button>
          <button onClick={PreHandleCapture} className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
            Avançar
          </button>
        </div>
      </div>
    </div>  
  );
}
