'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useImageContext } from '@/context/ImageContext'; // Importa o hook do contexto
import PostExample from "../../../../../../public/postTeste.svg";
import PostLogo from "../../../../../../public/postLogo.svg";
import PostUser from "../../../../../../public/postUser.svg";
import ModeloInfo from "../../../../../../public/informacoesStrava.svg";
import ModeloGarmin from "../../../../../../public/informacoesGarmin.svg";

import Phone from "../../../../../../public/phone.svg";
import Image from "next/image";
import { Facebook, Info, Instagram, Search, Upload } from "lucide-react";
import Link from "next/link";
import Templates from "@/components/Templates";

const PHONE_WIDTH = 230;
const PHONE_HEIGHT = 479;
const PHONE_CONTENT_PADDING = 6;

export default function Modelo({ params }) {
  const { modelo } = React.use(params);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imageUrl, setImageUrl } = useImageContext(); 

  // TENHO QUE EXPORTAR O CELULAR DIV COM A IMAGEM E NAO SOMENTE A IMAGEM

  const [zoom, setZoom] = useState(1); 
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false); 
  const [startTouch, setStartTouch] = useState(null);

  const imageRef = useRef(null); 

  const disableScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    // Adiciona o evento de desabilitar scroll
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
    console.log("URL da imagem:", imageUrl); // Verificando se a URL foi atualizada corretamente
    closeModal();
  };

  // Função para lidar com o gesto de toque para mover a imagem
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Detecta o gesto de pinça para zoom
      const distance = getDistance(e.touches);
      setZoom((prevZoom) => prevZoom * (distance / 200)); // Ajusta o zoom com base na distância
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      // Mover a imagem com o toque
      const dx = e.touches[0].clientX - startTouch.x;
      const dy = e.touches[0].clientY - startTouch.y;
      setPosition((prevPos) => ({
        x: prevPos.x + dx,
        y: prevPos.y + dy,
      }));
      setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Detecta o gesto de pinça para zoom
      const distance = getDistance(e.touches);
      setZoom((prevZoom) => prevZoom * (distance / 200)); // Ajusta o zoom com base na distância
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
                    className="relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[30px] bg-gray-600"
                  >
                    {/* CASO A PESSOA COLOQUE A FOTO FORA DA TELA ELA PODE ESCOLHER A COR QUE DESEJA (ATUAL BG_GRAY_600) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />

                      
                      <div
                        className={`w-[${PHONE_WIDTH}px]  h-[${PHONE_HEIGHT}px] ${imageUrl ? 'relative' : 'bg-gray-600'} overflow-hidden flex items-center justify-center`}
                        // style={{
                        //   backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                        //   backgroundSize: 'cover',
                        //   backgroundPosition: 'center',
                        //   transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`, // Aplica o zoom e o movimento da imagem
                        // }}
                        // ref={imageRef}
                        // onTouchStart={handleTouchStart}
                        // onTouchMove={handleTouchMove}
                        // onTouchEnd={handleTouchEnd}
                      >
                        <img src={imageUrl} className={`max-w-none h-[${PHONE_HEIGHT}px]`} alt="" ref={imageRef} style={{transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`}}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}/>
                        <button
                          className={`${imageUrl ? "hidden" : ""} bg-white p-3 rounded-full`}
                          onClick={openModal}
                        >
                          Carregar Imagem
                        </button>
                      </div>
                    </div>
                  </div>
                        
              </div>

              <div className="w-full flex h-12 relative">
                <input type="text" className="w-full h-full flex bg-white rounded-lg text-sm pl-4 font-semibold placeholder:text-[#BCBCBC]" placeholder="O que você esta procurando?" />
                <Search className="absolute transform -translate-y-1/2 top-1/2 right-4 text-[#1E1E1E]" />
              </div>

              <div className="flex flex-col gap-y-4 justify-start items-start w-full">
                <h1 className="text-white font-semibold italic ml-1">Informações</h1>
                <div className="grid grid-cols-2 gap-4">
                  <Templates title='informações Strava' image={ModeloInfo} template={4} />
                  <Templates title='informações Garmin' image={ModeloGarmin} template={5} />


                </div>
              </div>
            </div>

          </div>
          <div className="flex items-center justify-between w-full mt-6 px-4">
            <button className="text-[#1E1E1E] font-semibold italic">
              &lt; voltar
            </button>
            <button
              className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
              Avançar
            </button>
          </div>
        </div>
      }

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Digite o URL da imagem</h2>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)} // Usando o setImageUrl do contexto
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="URL da imagem"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={closeModal} className="text-gray-500">Cancelar</button>
              <button
                onClick={handleUrlSubmit}
                className="bg-blueMain text-white px-4 py-2 rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {
    (modelo === 'interativo' || modelo === 'ambos') &&
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Compartilhe o modelo que deseja!</h1>
          <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
            <div className="flex items-center flex-col gap-y-2">
              <h2 className="px-12 py-3 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
              <h3 className="italic text-[#013E9D] font-semibold">Informações de <span className="underline">Distância</span></h3>
            </div>
            <div className="flex flex-col gap-y-8 items-center justify-center w-full">
              
              <div className="bg-white rounded-3xl border-blue-700 border-2 px-7 pt-6 pb-8 flex flex-col gap-y-7 items-center font-myanmar">
                <div className="w-full flex justify-between">
                  <Image src={PostLogo} alt="" className="w-9" />
                  <div className="flex items-center gap-2">
                    <Image src={PostUser} alt="" className="w-7 rounded-full" />
                    <h1 className="text-sm">Arthur_Juwer</h1>
                  </div>
                </div>
                <Image src={PostExample} alt="" className="w-9/12" />
                <div className="flex items-center flex-col gap-y-2">
                  <h1 className="text-[#1E1E1E] text-center font-semibold w-11/12 leading-relaxed">Você fez o equivalante a 25 voltas na pista de atletismo</h1>
                  <p className="text-xs text-[#989898] font-light text-center ">10km é um resultado Incrível</p>
                </div>
              </div>
              <div className="flex gap-5 items-center justify-center">
                <div className="size-2.5 rounded-full bg-white"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
                <div className="size-2.5 rounded-full bg-[#013E9D]"></div>
              </div>
              <h3 className="text-white text-sm font-semibold italic">Compartilhe sua corrida - Tag @pacenatela</h3>
              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Instagram className="text-blueMain"/>
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <div className="flex items-center justify-center p-1 bg-blueMain rounded-full">
                      <Facebook className="text-white" fill="#ffffff" stroke="1"/>
                    </div>
                    
                  </div>
                  <span className="text-white text-xs font-semibold">Storys</span>
                </div>
                
                <div className="flex flex-col gap-y-2 items-center">
                  <div className="size-12 rounded-full flex items-center justify-center bg-white">
                    <Upload className="text-blueMain"/>
                  </div>
                  <span className="text-white text-xs font-semibold">Mais </span>
                </div>
              </div>
            </div>
          </div>
          <Link href={'/'} className="font-bold italic"> - Voltar</Link>
          {/* FAZER JAVASCRIPT GO HISTORY (-1) */}
        </div>
    }
  </div>

  );
}