'use client'
import React, { useState, useRef, useEffect } from 'react';


export default function Canvas({ imageUrl, position, zoom, template }) {

  const PHONE_WIDTH = 230;
  const PHONE_HEIGHT = 479;

  const [shapes, setShapes] = useState([
    {
      id: '1',
      type: 'image',
      x: 50,
      y: 50,
      width: 140,
      height: 80,
      templateUrl: template.src,
    },
  ]);

  const [selectedShape, setSelectedShape] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const canvasRef = useRef(null);
  const phoneRef = useRef(null);

  const handleShapeClick = (e, shapeId) => {
    e.stopPropagation();
    setSelectedShape(shapeId);
  };

  const handleDragStart = (e, shapeId) => {
    e.stopPropagation();

    // Usar o primeiro toque
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

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleResizeStart = (e, shapeId) => {
    e.stopPropagation();
  
    const touch = e.touches[0];
    const shape = shapes.find(s => s.id === shapeId);
    if (!shape) return;
  
    const phoneRect = phoneRef.current?.getBoundingClientRect();
    if (!phoneRect) return;
  
    const offsetX = touch.clientX - phoneRect.left;
    const offsetY = touch.clientY - phoneRect.top;
  
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
  
      setShapes(shapes.map(shape => {
        if (shape.id === selectedShape) {
          let newX = shape.x + deltaX;
          let newY = shape.y + deltaY;
  
          // Remover a limitação para permitir que a forma ultrapasse os limites
          newX = newX;
          newY = newY;
  
          return { ...shape, x: newX, y: newY };
        }
        return shape;
      }));
  
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
  
      newWidth = newWidth;
      newHeight = newHeight;
  
      setShapes(shapes.map(shape => {
        if (shape.id === selectedShape) {
          return { ...shape, width: newWidth, height: newHeight };
        }
        return shape;
      }));
  
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

  const handleDelete = () => {
    if (selectedShape) {
      setShapes(shapes.filter(shape => shape.id !== selectedShape));
      setSelectedShape(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShape]);

  return (
    <div className="w-8/12">
      <div className="flex">
        <div className={`relative overflow-hidden flex items-center justify-center border-black border-[10px] rounded-[30px] bg-gray-600 w-[${PHONE_WIDTH}px] h-[${PHONE_HEIGHT}px]`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl z-50" />
          
          <div
            className={`w-[${PHONE_WIDTH}px] h-[${PHONE_HEIGHT}px] ${imageUrl ? 'relative' : 'bg-gray-600'} overflow-hidden flex items-center justify-center`}
            ref={phoneRef}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd} // Finaliza o movimento ou redimensionamento
            onTouchCancel={handleTouchEnd} // Caso o toque seja cancelado
          >
            <img src={imageUrl} className={`max-w-none h-[${PHONE_HEIGHT}px]`} alt="imagem de dentro do celular" style={{ transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)` }} />
            
            {shapes.map(shape => (
              <div
                key={shape.id}
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                  zIndex: selectedShape === shape.id ? 10 : 1, // Garantir que o item selecionado esteja em cima
                }}
                className={`border-2 cursor-pointer ${selectedShape === shape.id ? 'border-blue-500' : 'border-transparent'}`}
                onClick={(e) => handleShapeClick(e, shape.id)}
                onTouchStart={(e) => handleDragStart(e, shape.id)} // Começar a movimentação ou redimensionamento
              >
                <img src={shape.templateUrl} alt="User added" className="w-full h-full object-cover" draggable="false" />
                {selectedShape === shape.id && (
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
                    onTouchStart={(e) => handleResizeStart(e, shape.id)} // Começar redimensionamento
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
