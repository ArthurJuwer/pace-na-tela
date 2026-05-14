'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useImage } from '@/context/ImageContext';

import ModeloInfo from "../../../../../../public/informacoesStrava.svg";
import ModeloGarmin from "../../../../../../public/informacoesGarmin.svg";
import logoStrava from "../../../../../../public/strava-logo-0.png";

import { ImagePlusIcon, Search, CheckCircle2Icon } from "lucide-react";
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
      router.push("interativo/finalizado");
    }
  }, [modelo]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activity, imageUrl, zoom, position, shapes, updateImage, updateZoom, updatePosition } = useImage();
  const [localImages, setLocalImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startTouch, setStartTouch] = useState(null);
  const imageRef = useRef(null);
  const [activeTab, setActiveTab] = useState('imagem');
  const [search, setSearch] = useState('');

  const templates = [
    { id: 1, title: "Info Strava", image: ModeloInfo, tags: ["info", "strava"] },
    { id: 2, title: "Info Garmin", image: ModeloGarmin, tags: ["info"] },
    { id: 3, title: "Logo Strava", image: logoStrava, tags: ["strava"] },
  ];

  const disableScroll = (e) => {
    if (isDragging) { e.preventDefault(); e.stopPropagation(); }
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

  const handleUrlSubmit = () => {
    if (newImageUrl) {
      updateImage(newImageUrl);
      setLocalImages((prev) => [newImageUrl, ...prev]);
      setNewImageUrl("");
      setIsModalOpen(false);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      updateZoom((prevZoom) => prevZoom * (distance / 200));
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - startTouch.x;
      const dy = e.touches[0].clientY - startTouch.y;
      updatePosition((prevPos) => ({ x: prevPos.x + dx, y: prevPos.y + dy }));
      setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      updateZoom((prevZoom) => prevZoom * (distance / 200));
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const shapesArray = Array.isArray(shapes) ? shapes : [];

  useEffect(() => {
    if (!imageUrl && activity?.photos?.primary?.urls) {
      const keys = Object.keys(activity.photos.primary.urls).map(Number).sort((a, b) => b - a);
      updateImage(activity.photos.primary.urls[keys[0]]);
    }
  }, []);

  const stravaImages = activity?.photos?.primary?.urls
    ? Object.keys(activity.photos.primary.urls)
        .sort((a, b) => b - a)
        .slice(0, 4)
        .map(k => activity.photos.primary.urls[k])
    : [];

  const allImages = [...localImages, ...stravaImages];

  const tagLabels = { info: 'Informações', strava: 'Strava' };

  return (
    <div className="font-inter min-h-dvh bg-gray-50 flex flex-col">
      {(modelo === 'customizavel' || modelo === 'ambos') && (
        <>
          {/* Header */}
          <div className="px-5 pt-12 pb-4 flex items-center justify-between">
            <button
              onClick={() => history.go(-1)}
              className="text-blueMain font-semibold text-sm"
            >
              ← Voltar
            </button>
            <h1 className="text-base font-bold text-[#1E1E1E]">Criar Post</h1>
            <Link
              href="customizavel/finalizado"
              className="bg-blueMain text-white text-sm px-4 py-1.5 rounded-xl font-semibold"
            >
              Pronto
            </Link>
          </div>

          {/* Phone Preview */}
          <div className="flex justify-center py-3">
            <div
              className="relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[36px] bg-gray-800 shadow-2xl shadow-black/30"
              style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />
              <div
                className="overflow-hidden flex items-center justify-center relative"
                style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="max-w-none"
                    alt=""
                    ref={imageRef}
                    style={{
                      height: PHONE_HEIGHT,
                      transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                      touchAction: 'none',
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  />
                ) : (
                  <button
                    className="flex flex-col items-center gap-2 bg-white/10 px-6 py-5 rounded-2xl border border-white/20"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <ImagePlusIcon className="text-white" size={28} />
                    <span className="text-white text-xs font-semibold">Adicionar foto</span>
                  </button>
                )}
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
                  >
                    <img src={shape.templateUrl} alt="" className="w-full h-full object-cover" draggable="false" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-400 mb-1">
            Arraste e faça pinch para ajustar a foto
          </p>

          {/* Bottom Panel */}
          <div className="flex-1 bg-white rounded-t-3xl shadow-lg px-5 pt-5 pb-36">
            {/* Tab switcher */}
            <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl">
              {[
                { key: 'imagem', label: 'Imagem' },
                { key: 'templates', label: 'Templates' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-white text-blueMain shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Image Tab */}
            {activeTab === 'imagem' && (
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="h-28 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-gray-200"
                >
                  <ImagePlusIcon size={20} className="text-gray-400" />
                  <span className="text-[11px] text-gray-400 font-semibold">Adicionar</span>
                </button>
                {allImages.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => updateImage(url)}
                    className={`h-28 rounded-2xl overflow-hidden relative transition-all duration-200 ${
                      imageUrl === url ? 'ring-2 ring-blueMain ring-offset-2' : ''
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    {imageUrl === url && (
                      <div className="absolute inset-0 bg-blueMain/20 flex items-center justify-center">
                        <CheckCircle2Icon className="text-white drop-shadow-md" size={22} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="flex flex-col gap-5">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full h-11 bg-gray-100 rounded-xl text-sm pl-4 pr-10 font-medium placeholder:text-gray-400 outline-none"
                    placeholder="Buscar template..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>

                {['info', 'strava'].map(tag => {
                  const filtered = templates.filter(t =>
                    t.title.toLowerCase().includes(search.toLowerCase()) &&
                    t.tags.includes(tag)
                  );
                  if (!filtered.length) return null;
                  return (
                    <div key={tag}>
                      <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        {tagLabels[tag]}
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        {filtered.map(item => (
                          <Templates
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            template={item.id}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* URL Modal — bottom sheet */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-end justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-3xl px-6 pt-5 pb-12"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-bold text-[#1E1E1E] mb-1">URL da imagem</h2>
            <p className="text-sm text-gray-400 mb-5">
              Cole o link de uma imagem para usar no post
            </p>
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full p-3.5 bg-gray-100 rounded-xl text-sm mb-4 outline-none focus:ring-2 focus:ring-blueMain"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <button
              onClick={handleUrlSubmit}
              className="w-full bg-blueMain text-white py-3.5 rounded-xl font-semibold text-sm"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
