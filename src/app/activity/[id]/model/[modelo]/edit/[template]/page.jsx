'use client'
import React, { useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, Pipette } from "lucide-react";
import useFormatValue from "@/hooks/useFormatValue";
import logoStrava from "../../../../../../../../public/strava-logo-0.png";
import { toPng } from 'html-to-image';
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
    { id: "kudos_count", nome: "Kudos", isSelect: false, value: undefined, type: "number" },
    { id: "location_city", nome: "Cidade", isSelect: false, value: undefined, type: "string" },
    { id: "location_state", nome: "Estado", isSelect: false, value: undefined, type: "string" },
    { id: "location_country", nome: "País", isSelect: false, value: undefined, type: "string" }
  ]);

  const buttonsFundo = [
    { bgColor: "url('/fundo-transparente.png')" },
    { bgColor: '#000000' },
    { bgColor: '#2F2F2F' },
    { bgColor: '#4B5563' },
    { bgColor: '#9CA3AF' },
    { bgColor: '#D1D5DB' },
    { bgColor: '#2C6B2F' },
    { bgColor: '#16A34A' },
    { bgColor: '#1DB954' },
    { bgColor: '#6B4226' },
    { bgColor: '#FF7F00' },
    { bgColor: '#FB923C' },
    { bgColor: '#FBBF24' },
    { bgColor: '#F8C41A' },
    { bgColor: '#0095F6' },
    { bgColor: '#60A5FA' },
    { bgColor: '#FF4D4D' },
    { bgColor: '#EF4444' },
    { bgColor: '#FF0000' },
    { bgColor: '#EC4899' },
    { bgColor: '#F472B6' },
    { bgColor: '#9B4D96' },
    { bgColor: '#6B21A8' },
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

  const templateLimits = { 1: 6, 2: 3, 3: 0 };

  const contentRef = useRef(null);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textShadow, setTextShadow] = useState('');
  const [bgColor, setBgColor] = useState('#1E1E1E');
  const [htmlContent, setHtmlContent] = useState('');
  const [activeSection, setActiveSection] = useState('Informações');

  useEffect(() => {
    preencherValores();
  }, []);

  const toggleSelect = (index) => {
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
    const maxSelections = templateLimits[Number(template)] || 3;
    const selectedCount = updatedCheckBoxInformacoes.filter(item => item.isSelect).length;
    if (!updatedCheckBoxInformacoes[index].isSelect && selectedCount >= maxSelections) return;
    updatedCheckBoxInformacoes[index].isSelect = !updatedCheckBoxInformacoes[index].isSelect;
    setCheckBoxInformacoes(updatedCheckBoxInformacoes);
  };

  const preencherValores = () => {
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
    updatedCheckBoxInformacoes.forEach((item) => {
      if (activity && activity[item.id] !== undefined) {
        if (item.type === 'number') item.value = formatValue(item.id, activity[item.id]);
        else if (item.type === 'time') item.value = formatTime(activity[item.id]);
        else if (item.type === 'date') item.value = formatDate(activity[item.id]);
        else if (item.type === 'boolean') item.value = formatBoolean(activity[item.id]);
        else item.value = activity[item.id] !== null ? activity[item.id] : undefined;
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

  const moveSelectedItem = (index, direction) => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= selectedItems.length) return;
    const updatedCheckBoxInformacoes = [...checkBoxInformacoes];
    const currentIndex = updatedCheckBoxInformacoes.findIndex(item => item.id === selectedItems[index].id);
    const targetItemIndex = updatedCheckBoxInformacoes.findIndex(item => item.id === selectedItems[targetIndex].id);
    [updatedCheckBoxInformacoes[currentIndex], updatedCheckBoxInformacoes[targetItemIndex]] =
      [updatedCheckBoxInformacoes[targetItemIndex], updatedCheckBoxInformacoes[currentIndex]];
    setCheckBoxInformacoes(updatedCheckBoxInformacoes);
  };

  useEffect(() => {
    const selectedItems = checkBoxInformacoes.filter(item => item.isSelect);

    if (Number(template) === 1) {
      const content = selectedItems.map((item) => `
        <div class="text-center">
          <p class="text-xs text-gray-500">${item.nome}</p>
          <p style="font-size: 20px; font-weight: bold; color:${textColor}; text-shadow:${textShadow}">${item.value}</p>
        </div>
      `).join('');
      setHtmlContent(`
        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:24px; padding:32px; border-radius:24px; background:${bgColor}">
          ${content}
        </div>
      `);
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
      setHtmlContent(`
        <div class="mx-2 flex items-center justify-center p-8 rounded-3xl w-full" style="background: ${bgColor};">
          ${content}
        </div>
      `);
    } else if (Number(template) === 3) {
      handleCapture({ semDados: true, imagem: logoStrava, name: 'logo_strava' });
    }
  }, [template, checkBoxInformacoes, bgColor, textColor, textShadow]);

  const PreHandleCapture = () => {
    if (bgColor === "url('/fundo-transparente.png')") {
      setBgColor('transparent');
      setTextShadow('');
    }
    setTimeout(() => { handleCapture(false, '', ''); }, 500);
  };

  const handleCapture = ({ semDados, imagem, name }) => {
    const maxWidth = 160;
    if (semDados === true) {
      const scaleFactor = maxWidth / imagem.width;
      updateAtualTemplate({ src: imagem.src, width: maxWidth, height: Math.round(imagem.height * scaleFactor), name });
      redirect(`${template}/pos`);
    }
    if (contentRef.current) {
      toPng(contentRef.current).then((imgData) => {
        const tempImage = new Image();
        tempImage.onload = () => {
          const scaleFactor = maxWidth / tempImage.width;
          const generatedName = Number(template) === 1 ? 'info_strava' : 'info_garmin';
          updateAtualTemplate({ src: imgData, width: maxWidth, height: Math.round(tempImage.height * scaleFactor), name: generatedName });
          redirect(`${template}/pos`);
        };
        tempImage.src = imgData;
      }).catch((error) => console.error('Erro ao gerar imagem:', error));
    }
  };

  const sections = ['Informações', 'Fundo', 'Texto', 'Ordem'];
  const maxSelections = templateLimits[Number(template)] || 3;
  const selectedCount = checkBoxInformacoes.filter(i => i.isSelect).length;

  return (
    <div className="font-inter min-h-dvh bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => history.go(-1)} className="text-blueMain font-semibold text-sm">
          ← Voltar
        </button>
        <h1 className="text-base font-bold text-[#1E1E1E]">Customizar Template</h1>
        <button
          onClick={PreHandleCapture}
          className="bg-blueMain text-white text-sm px-4 py-1.5 rounded-xl font-semibold"
        >
          Aplicar
        </button>
      </div>

      {/* Live Preview */}
      {htmlContent && (
        <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div
            ref={contentRef}
            className="w-full"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}
      {!htmlContent && (
        <div ref={contentRef} className="hidden" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}

      {/* Bottom Panel */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-lg px-5 pt-5 pb-36">
        {/* Segmented control */}
        <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${
                activeSection === s
                  ? 'bg-white text-blueMain shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Informações */}
        {activeSection === 'Informações' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Toque para selecionar</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                selectedCount >= maxSelections
                  ? 'bg-blueMain/10 text-blueMain'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {selectedCount}/{maxSelections}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {checkBoxInformacoes.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => toggleSelect(index)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 ${
                    item.isSelect
                      ? 'bg-blueMain text-white shadow-sm shadow-blueMain/30'
                      : 'bg-gray-50 text-[#1E1E1E] border border-gray-100'
                  }`}
                >
                  <p className="text-xs font-semibold leading-tight">{item.nome}</p>
                  <p className={`text-[11px] mt-0.5 truncate ${item.isSelect ? 'text-white/70' : 'text-gray-400'}`}>
                    {item.value}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fundo */}
        {activeSection === 'Fundo' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-gray-400">Cor de fundo do template</p>
            <div className="grid grid-cols-6 gap-2.5">
              {/* Custom picker */}
              <div className="relative aspect-square bg-gradient-to-br from-violet-500 to-pink-400 rounded-xl overflow-hidden flex items-center justify-center">
                <input
                  type="color"
                  value={bgColor.startsWith('#') ? bgColor : '#1E1E1E'}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Pipette size={16} className="text-white pointer-events-none" />
              </div>
              {buttonsFundo.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setBgColor(button.bgColor);
                    setTextShadow(
                      button.bgColor === "url('/fundo-transparente.png')" && textColor === '#FFFFFF'
                        ? '0px 0px 8px rgba(0,0,0,1)' : ''
                    );
                  }}
                  className={`aspect-square rounded-xl border-2 transition-all duration-150 ${
                    bgColor === button.bgColor
                      ? 'border-blueMain scale-110 shadow-md'
                      : 'border-transparent'
                  }`}
                  style={{ background: button.bgColor }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Texto */}
        {activeSection === 'Texto' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-gray-400">Cor do texto do template</p>
            <div className="grid grid-cols-6 gap-2.5">
              {/* Custom picker */}
              <div className="relative aspect-square bg-gradient-to-br from-violet-500 to-pink-400 rounded-xl overflow-hidden flex items-center justify-center">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Pipette size={16} className="text-white pointer-events-none" />
              </div>
              {textButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTextColor(button.textColor);
                    setTextShadow(
                      button.textColor === '#FFFFFF' && bgColor === "url('/fundo-transparente.png')"
                        ? '0px 0px 8px rgba(0,0,0,1)' : ''
                    );
                  }}
                  className={`aspect-square rounded-xl border-2 transition-all duration-150 ${
                    textColor === button.textColor
                      ? 'border-blueMain scale-110 shadow-md'
                      : 'border-gray-200'
                  }`}
                  style={{ background: button.textColor }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ordem */}
        {activeSection === 'Ordem' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-gray-400">Reordene as informações selecionadas</p>
            <div className="flex flex-col gap-2">
              {checkBoxInformacoes
                .filter(item => item.isSelect)
                .map((item, index, filteredItems) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-semibold text-[#1E1E1E] truncate">{item.nome}</p>
                      <p className="text-xs text-gray-400 truncate">{item.value}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => moveSelectedItem(index, -1)}
                        disabled={index === 0}
                        className={`p-1.5 rounded-lg transition-all ${
                          index === 0
                            ? 'text-gray-200 bg-gray-50'
                            : 'text-blueMain bg-blue-50 active:bg-blue-100'
                        }`}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveSelectedItem(index, 1)}
                        disabled={index === filteredItems.length - 1}
                        className={`p-1.5 rounded-lg transition-all ${
                          index === filteredItems.length - 1
                            ? 'text-gray-200 bg-gray-50'
                            : 'text-blueMain bg-blue-50 active:bg-blue-100'
                        }`}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              {checkBoxInformacoes.filter(i => i.isSelect).length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">
                  Selecione informações na aba anterior
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
