'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useImage } from '@/context/ImageContext'; // Importa o hook do contexto

import ModeloInfo from "../../../../../../public/informacoesStrava.svg";
import ModeloGarmin from "../../../../../../public/informacoesGarmin.svg";
import logoStrava from "../../../../../../public/strava-logo-0.png"

import { Info, Search } from "lucide-react";
import Link from "next/link";
import Templates from "@/components/Templates";
import { useRouter } from "next/navigation";

const PHONE_WIDTH = 230;
const PHONE_HEIGHT = 479;

export default function Modelo({ params }) {
  const { modelo } = React.use(params);
  const router = useRouter();
  useEffect(() => {
    if (modelo === "interativo") {
      router.push("interativo/finalizado"); // Redireciona automaticamente
    }
  }, [modelo]);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activity, imageUrl, zoom, position, shapes, updateImage, updateZoom, updatePosition } = useImage();
  const [localImages, setLocalImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");



  const [isDragging, setIsDragging] = useState(false); 
  const [startTouch, setStartTouch] = useState(null);

  const imageRef = useRef(null); 

  const disableScroll = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', disableScroll, { passive: false });
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchmove', disableScroll);
    }
  
    return () => {
      document.removeEventListener('touchmove', disableScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isDragging]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUrlSubmit = () => {
    if (newImageUrl) {
      updateImage(newImageUrl);
      setLocalImages((prev) => [newImageUrl, ...prev]); // Adiciona no início
      setNewImageUrl("");
      closeModal();
    }
  };
  

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      updateZoom((prevZoom) => prevZoom * (distance / 200)); // Ajusta o zoom com base na distância
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - startTouch.x;
      const dy = e.touches[0].clientY - startTouch.y;
      updatePosition((prevPos) => ({
        x: prevPos.x + dx,
        y: prevPos.y + dy,
      }));
      setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      updateZoom((prevZoom) => prevZoom * (distance / 200)); // Ajusta o zoom com base na distância
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const shapesArray = Array.isArray(shapes) ? shapes : [];

  useEffect(() => {
    console.log(activity?.photos?.primary?.urls);
    
    if (!imageUrl) {
      if (activity?.photos?.primary?.urls) {
        const keys = Object.keys(activity.photos.primary.urls)
          .map(Number) // Converte para número para poder comparar
          .sort((a, b) => b - a); // Ordena em ordem decrescente
        
        const largestKey = keys[0]; // Pega a maior chave
        const largestUrl = activity.photos.primary.urls[largestKey]; // Pega a URL correspondente
        
        console.log(largestUrl);
        updateImage(largestUrl);
      }
    }
  }, []);


  
  
  
  const [activeTab, setActiveTab] = useState('imagem'); // Estado para o menu
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="font-inter">
      {
        (modelo === 'customizavel' || modelo === 'ambos') &&
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Escolha um template para customizar </h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="w-full flex justify-between items-center">
              <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
              <Info className="text-white size-8" />
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-y-10">
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
                        <img src={imageUrl} className={`max-w-none h-[${PHONE_HEIGHT}px]`} alt="" ref={imageRef} style={{transform: `scale(${zoom}) 
                        translate(${position.x}px, ${position.y}px)`,  touchAction: 'none' }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        />
                        <button
                          className={`${imageUrl ? "hidden" : ""} bg-white p-3 rounded-full`}
                          onClick={openModal}
                        >
                          Carregar Imagem
                        </button>
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

              <div className="font-inter">
                {/* MENU DE SELEÇÃO */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleTabChange('imagem')}
                    className={`px-4 py-2 rounded-xl font-semibold ${activeTab === 'imagem' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Imagem
                  </button>
                  <button
                    onClick={() => handleTabChange('templates')}
                    className={`px-4 py-2 rounded-xl font-semibold ${activeTab === 'templates' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Templates
                  </button>
                </div>
                </div>

                {activeTab === 'imagem' && (
                  <div className="grid grid-cols-3 gap-4">
                  {/* Botão para carregar imagem */}
                  <button
                    onClick={openModal}
                    className="flex items-center justify-center w-full h-32 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
                  >
                    <span className="text-gray-700 font-semibold">Carregar Imagem</span>
                  </button>

                  {/* Renderiza imagens locais */}
                  {localImages.map((url, index) => (
                    <button
                      key={`local-${index}`}
                      onClick={() => updateImage(url)}
                      className="flex items-center justify-center w-full h-32 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200 overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`Imagem local ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}

  {/* Renderiza imagens da API (Strava) */}
  {activity?.photos?.primary?.urls &&
    Object.keys(activity.photos.primary.urls)
      .sort((a, b) => b - a) // Ordena pela resolução
      .slice(0, 4) // Mostra no máximo 4 imagens
      .map((key, index) => (
        <button
          key={`api-${index}`}
          onClick={() => updateImage(activity.photos.primary.urls[key])}
          className="flex items-center justify-center w-full h-32 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200 overflow-hidden"
        >
          <img
            src={activity.photos.primary.urls[key]}
            alt={`Imagem API ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
</div>

              )}


                {activeTab === 'templates' && 
                <>
                  <div className="w-full flex h-12 relative">
                    <input type="text" className="w-full h-full flex bg-white rounded-lg text-sm pl-4 font-semibold placeholder:text-[#BCBCBC]" placeholder="O que você esta procurando?" />
                    <Search className="absolute transform -translate-y-1/2 top-1/2 right-4 text-[#1E1E1E]" />
                  </div>

                  <div className="flex flex-col gap-y-4 justify-start items-start w-full">
                    <h1 className="text-white font-semibold italic ml-1">Informações</h1>
                    <div className="grid grid-cols-2 gap-4">
                      <Templates title='informações Strava' image={ModeloInfo} template={1} />
                      <Templates title='informações Garmin' image={ModeloGarmin} template={2} />
                    </div>
                    <h1 className="text-white font-semibold italic ml-1">Strava</h1>
                    <div className="grid grid-cols-2 gap-4">
                      <Templates title='Logo Strava' image={logoStrava} template={3} />
                    </div>
                  </div>
                </>
                }

              </div>
          </div>
          <div className="flex items-center justify-between w-full mt-6 px-4">
            <button 
              onClick={()=> history.go(-1)}
              className="text-[#1E1E1E] font-semibold italic">
              &lt; voltar
            </button>
            <Link href={'customizavel/finalizado'}
              className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
              Compartilhar
            </Link>
          </div>
        </div>
      }

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Digite o URL da imagem</h2>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="URL da imagem"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={closeModal} className="text-gray-500">Cancelar</button>
              <button
                onClick={handleUrlSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      
    
  </div>

  );
}