'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Move, Trash2Icon } from "lucide-react";
import { useImage } from '@/context/ImageContext';
import { redirect } from 'next/navigation';

const PHONE_WIDTH = 230;
const PHONE_HEIGHT = 479;

export default function Pos({ params }) {
  const { id } = React.use(params);
  const { imageUrl, zoom, position, shapes: initialShapes, atualTemplate, updateShapes } = useImage();

  const [shapes, setShapes] = useState(Array.isArray(initialShapes) ? initialShapes : []);
  const [selectedShape, setSelectedShape] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const phoneRef = useRef(null);

  useEffect(() => {
    if (!atualTemplate) return;
    const newShape = {
      id: shapes.length + 1,
      name: atualTemplate.name,
      type: 'image',
      x: (PHONE_WIDTH / 2) - 70,
      y: (PHONE_HEIGHT / 2) - 40,
      width: atualTemplate.width,
      height: atualTemplate.height,
      templateUrl: atualTemplate.src,
    };
    setShapes(prev => [...prev, newShape]);
  }, [atualTemplate]);

  const handleShapeClick = (e, shapeId) => {
    e.stopPropagation();
    setSelectedShape(shapeId);
  };

  const handleDragStart = (e, shapeId) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const shape = shapes.find(s => s.id === shapeId);
    if (!shape) return;
    const phoneRect = phoneRef.current?.getBoundingClientRect();
    if (!phoneRect) return;
    const offsetX = touch.clientX - (phoneRect.left + shape.x);
    const offsetY = touch.clientY - (phoneRect.top + shape.y);
    setIsDragging(true);
    setSelectedShape(shapeId);
    setDragStart({ x: touch.clientX, y: touch.clientY, offsetX, offsetY });
  };

  const handleResizeStart = (e, shapeId) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const shape = shapes.find(s => s.id === shapeId);
    if (!shape) return;
    setIsResizing(true);
    setSelectedShape(shapeId);
    setResizeStart({ x: touch.clientX, y: touch.clientY, width: shape.width, height: shape.height });
  };

  const handleTouchMove = (e) => {
    if (!selectedShape || (!isDragging && !isResizing)) return;
    const touch = e.touches[0];

    if (isDragging) {
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;
      setShapes(prev => prev.map(shape =>
        shape.id === selectedShape ? { ...shape, x: shape.x + deltaX, y: shape.y + deltaY } : shape
      ));
      setDragStart({ x: touch.clientX, y: touch.clientY });
    } else if (isResizing) {
      const deltaX = touch.clientX - resizeStart.x;
      const deltaY = touch.clientY - resizeStart.y;
      const aspectRatio = resizeStart.width / resizeStart.height;
      let newWidth = resizeStart.width + deltaX;
      let newHeight = resizeStart.height + deltaY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) newHeight = newWidth / aspectRatio;
      else newWidth = newHeight * aspectRatio;
      setShapes(prev => prev.map(shape =>
        shape.id === selectedShape ? { ...shape, width: newWidth, height: newHeight } : shape
      ));
      setResizeStart({ x: touch.clientX, y: touch.clientY, width: newWidth, height: newHeight });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleDeleteShape = (shapeId) => {
    setShapes(prev => prev.filter(s => s.id !== shapeId));
    setSelectedShape(null);
  };

  const handleSubmit = () => {
    updateShapes(shapes);
    redirect(`/activity/${id}/model/customizavel`);
  };

  return (
    <div className="font-inter min-h-dvh bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => history.go(-1)} className="text-blueMain font-semibold text-sm">
          ← Voltar
        </button>
        <h1 className="text-base font-bold text-[#1E1E1E]">Posicionar Template</h1>
        <button
          onClick={handleSubmit}
          className="bg-blueMain text-white text-sm px-4 py-1.5 rounded-xl font-semibold"
        >
          Concluir
        </button>
      </div>

      {/* Hint */}
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <Move size={12} className="text-gray-400" />
        <p className="text-[11px] text-gray-400">Arraste para mover · Canto inferior para redimensionar</p>
      </div>

      {/* Phone Preview */}
      <div className="flex justify-center py-2">
        <div
          className="relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[36px] bg-gray-800 shadow-2xl shadow-black/30"
          style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />
          <div
            className="overflow-hidden flex items-center justify-center relative"
            style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
            ref={phoneRef}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onClick={() => setSelectedShape(null)}
          >
            <img
              src={imageUrl}
              className="max-w-none"
              alt=""
              style={{
                height: PHONE_HEIGHT,
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              }}
            />
            {shapes.map(shape => (
              <div
                key={shape.id}
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                  zIndex: selectedShape === shape.id ? 10 : 1,
                }}
                className={`cursor-pointer border-2 rounded transition-all ${
                  selectedShape === shape.id ? 'border-white' : 'border-transparent'
                }`}
                onClick={(e) => handleShapeClick(e, shape.id)}
                onTouchStart={(e) => handleDragStart(e, shape.id)}
              >
                <img
                  src={shape.templateUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                {selectedShape === shape.id && (
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-tl-sm cursor-se-resize"
                    onTouchStart={(e) => handleResizeStart(e, shape.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layers list */}
      {shapes.length > 0 && (
        <div className="mx-5 mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Templates adicionados
          </p>
          {shapes.map((shape, index) => (
            <div
              key={shape.id}
              className={`flex items-center justify-between px-4 py-3 transition-all ${
                selectedShape === shape.id ? 'bg-blue-50' : ''
              } ${index < shapes.length - 1 ? 'border-b border-gray-50' : ''}`}
              onClick={() => setSelectedShape(shape.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100">
                  <img src={shape.templateUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-semibold text-[#1E1E1E]">{shape.name || `Template ${index + 1}`}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDeleteShape(shape.id); }}
                className="p-1.5 rounded-lg text-gray-300 active:text-red-400 transition-colors"
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
