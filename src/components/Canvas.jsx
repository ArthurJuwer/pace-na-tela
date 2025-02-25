'use client'
import React, { useState, useRef, useEffect } from 'react';

const PHONE_WIDTH = 230;
const PHONE_HEIGHT = 479;
const PHONE_CONTENT_PADDING = 5;
// w-[230px] h-[479px]

export default function Canvas({image}) {

  const [shapes, setShapes] = useState([
    {
      id: '1',
      type: 'image',
      x: 50,
      y: 50,
      width: 140,
      height: 75,
      imageUrl: image.src,
    },
  ]);
  

  const [selectedShape, setSelectedShape] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [resizeHandle, setResizeHandle] = useState(null);
  const canvasRef = useRef(null);
  const phoneRef = useRef(null);

  const handleShapeClick = (e, shapeId) => {
    e.stopPropagation();
    setSelectedShape(shapeId);
  };

  const handleDragStart = (e, shapeId) => {
    e.stopPropagation();
    const shape = shapes.find(s => s.id === shapeId);
    if (!shape) return;

    const phoneRect = phoneRef.current?.getBoundingClientRect();
    if (!phoneRect) return;

    const offsetX = e.clientX - (phoneRect.left + shape.x);
    const offsetY = e.clientY - (phoneRect.top + shape.y);

    setIsDragging(true);
    setSelectedShape(shapeId);
    setDragStart({ x: e.clientX, y: e.clientY, offsetX, offsetY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (!selectedShape || (!isDragging && !isResizing)) return;
    const phoneRect = phoneRef.current?.getBoundingClientRect();
    if (!phoneRect) return;
  
    setShapes(shapes.map(shape => {
      if (shape.id === selectedShape) {
        if (isDragging) {
          const deltaX = e.clientX - dragStart.x;
          const deltaY = e.clientY - dragStart.y;
          let newX = shape.x + deltaX;
          let newY = shape.y + deltaY;
  
          newX = Math.max(PHONE_CONTENT_PADDING, Math.min(PHONE_WIDTH - shape.width - PHONE_CONTENT_PADDING, newX));
          newY = Math.max(PHONE_CONTENT_PADDING, Math.min(PHONE_HEIGHT - shape.height - PHONE_CONTENT_PADDING, newY));
  
          setDragStart({ ...dragStart, x: e.clientX, y: e.clientY });
          return { ...shape, x: newX, y: newY };
        } else if (isResizing) {
          const deltaX = e.clientX - dragStart.x;
          const deltaY = e.clientY - dragStart.y;
  
          // Lógica de redimensionamento proporcional
          let newWidth = Math.max(20, shape.width + deltaX);
          let newHeight = Math.max(20, shape.height + deltaY);
  
          // Se você deseja manter a proporção
          const aspectRatio = shape.width / shape.height;
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
  
          setDragStart({ x: e.clientX, y: e.clientY });
          return { ...shape, width: newWidth, height: newHeight };
        }
      }
      return shape;
    }));
  };
  

  const handleResizeStart = (e, shapeId) => {
    e.stopPropagation();
    setIsResizing(true);
    setSelectedShape(shapeId);
    setDragStart({ x: e.clientX, y: e.clientY });
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
    <div className="flex">
      <div
        ref={canvasRef}
        className="flex-1 p-10 relative overflow-hidden flex items-center justify-center"
      >
        <div className="relative">
          <div className="absolute -inset-2.5 bg-black rounded-[30px]" />
          <div
            ref={phoneRef}
            className={`w-[${PHONE_WIDTH}px] h-[${PHONE_HEIGHT}px] bg-gray-600 relative rounded-[25px] overflow-hidden`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            // TROCAR ESSE BG-WHITE PELA FOTO DA PESSOA
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-4 bg-black rounded-b-3xl" />
            {shapes.map(shape => (
              <div
                key={shape.id}
                style={{
                  position: 'absolute',
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                }}
                className={`border-2 cursor-move ${selectedShape === shape.id ? 'border-blue-500' : 'border-transparent'}`}
                onClick={(e) => handleShapeClick(e, shape.id)}
                onMouseDown={(e) => handleDragStart(e, shape.id)}
              >
                <img src={shape.imageUrl} alt="User added" className="w-full h-full object-cover " draggable="false"/>
                {selectedShape === shape.id && (
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
                    onMouseDown={(e) => handleResizeStart(e, shape.id)}
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