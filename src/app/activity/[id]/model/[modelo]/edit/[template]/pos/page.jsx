'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Info } from "lucide-react";
import { useImage } from '@/context/ImageContext'; // Importa o hook do contexto
import { redirect } from 'next/navigation';

const PHONE_WIDTH = 230;
const PHONE_HEIGHT = 479;

export default function Pos({ params }) {
  const { id } = React.use(params);
  const { imageUrl, zoom, position, shapes: initialShapes, atualTemplate, updateShapes } = useImage();

  const [shapes, setShapes] = useState(Array.isArray(initialShapes) ? initialShapes : []);
  // const prevInitialShapesRef = useRef(initialShapes);

  // useEffect(() => {
  //   // Atualizar shapes apenas se `initialShapes` realmente mudou
  //   if (JSON.stringify(prevInitialShapesRef.current) !== JSON.stringify(initialShapes)) {
  //     if (initialShapes && initialShapes.length > 0) {
  //       setShapes(initialShapes);
  //     }
  //     prevInitialShapesRef.current = initialShapes;
  //   }
  // }, [initialShapes]);

  useEffect(() => {
    // Se não houver atualTemplate, não faz nada
    if (!atualTemplate) return;
  
      // Cria o novo shape
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
  
      const newShapes = [...shapes, newShape];
  
    setShapes(newShapes)

  }, [atualTemplate]);
  
  // console.log(shapes)

  const [selectedShape, setSelectedShape] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const phoneRef = useRef(null);

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
    const phoneRect = phoneRef.current?.getBoundingClientRect();
    if (!phoneRect) return;

    setIsResizing(true);
    setSelectedShape(shapeId);
    setResizeStart({
      x: touch.clientX,
      y: touch.clientY,
      width: shape.width,
      height: shape.height,
    });
  };

  const handleTouchMove = (e) => {
    if (!selectedShape || (!isDragging && !isResizing)) return;

    const phoneRect = phoneRef.current?.getBoundingClientRect();
    if (!phoneRect) return;

    const touch = e.touches[0];

    if (isDragging) {
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;

      setShapes(prevShapes => {
        const updatedShapes = prevShapes.map(shape => {
          if (shape.id === selectedShape) {
            let newX = shape.x + deltaX;
            let newY = shape.y + deltaY;
            return { ...shape, x: newX, y: newY };
          }
          return shape;
        });

        // Só atualiza se houver alteração real
        if (updatedShapes.some((shape, idx) => shape.x !== prevShapes[idx]?.x || shape.y !== prevShapes[idx]?.y)) {
          return updatedShapes;
        }
        return prevShapes;
      });

      setDragStart({ x: touch.clientX, y: touch.clientY });
    } else if (isResizing) {
      const deltaX = touch.clientX - resizeStart.x;
      const deltaY = touch.clientY - resizeStart.y;

      const widthChange = deltaX;
      const heightChange = deltaY;

      const aspectRatio = resizeStart.width / resizeStart.height;

      let newWidth = resizeStart.width + widthChange;
      let newHeight = resizeStart.height + heightChange;

      if (Math.abs(widthChange) > Math.abs(heightChange)) {
        newHeight = newWidth / aspectRatio;
      } else {
        newWidth = newHeight * aspectRatio;
      }

      setShapes(prevShapes => {
        const updatedShapes = prevShapes.map(shape => {
          if (shape.id === selectedShape) {
            return { ...shape, width: newWidth, height: newHeight };
          }
          return shape;
        });

        // Só atualiza se houver alteração real
        if (updatedShapes.some((shape, idx) => shape.width !== prevShapes[idx]?.width || shape.height !== prevShapes[idx]?.height)) {
          return updatedShapes;
        }
        return prevShapes;
      });

      setResizeStart({
        x: touch.clientX,
        y: touch.clientY,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleSubmit = () => {
    updateShapes(shapes);
    redirect(`/activity/${id}/model/customizavel`);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-y-12 font-inter">
      <h1 className="text-center text-3xl text-blueMain font-bold italic mt-14 w-10/12">Quais Informações deseja mostrar?</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-y-12 items-center w-full bg-blueMain rounded-3xl px-5 py-8">
          <div className="w-full flex justify-between items-center">
            <h2 className="px-10 py-2 bg-white text-blueMain font-semibold text-center text-sm italic rounded-xl">Posts interativo</h2>
            <Info className="text-white size-8" />
          </div>
          <div className="w-full flex flex-col items-center gap-x-5">
   
              <div className="w-8/12">
                <div className="flex">
                  <div className={`relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[30px] bg-gray-600 w-[${PHONE_WIDTH}px] h-[${PHONE_HEIGHT}px]`}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />
                    <div
                      className={`w-[${PHONE_WIDTH}px] h-[${PHONE_HEIGHT}px] ${imageUrl ? 'relative' : 'bg-gray-600'} overflow-hidden flex items-center justify-center`}
                      ref={phoneRef}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onTouchCancel={handleTouchEnd}
                    >
                      <img src={imageUrl} className={`max-w-none h-[${PHONE_HEIGHT}px]`} alt="imagem de dentro do celular" style={{ transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)` }} />
                      {shapes.length > 0 &&
                        shapes.map(shape => (
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
                            className={`border-2 cursor-pointer ${selectedShape === shape.id ? 'border-blue-500' : 'border-transparent'}`}
                            onClick={(e) => handleShapeClick(e, shape.id)}
                            onTouchStart={(e) => handleDragStart(e, shape.id)}
                          >
                            <img src={shape.templateUrl} alt="User added" className="w-full h-full object-cover" draggable="false" />
                            {selectedShape === shape.id && (
                              <div
                                className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize"
                                onTouchStart={(e) => handleResizeStart(e, shape.id)}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-6 px-4">
          <button onClick={() => history.go(-1)} className="text-[#1E1E1E] font-semibold italic">
            &lt; voltar
          </button>
          <button onClick={handleSubmit} className="bg-blueMain text-white px-10 py-1.5 rounded-2xl">
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
