'use client'
import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

// Provedor do contexto
export const ImageProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(undefined);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState({}); 
  const [atualTemplate, setAtualTemplate] = useState({}); 
  // ADICIONADO MANUALMENTE

  const updateImage = (url) => setImageUrl(url);
  const updateZoom = (newZoom) => setZoom(newZoom);
  const updatePosition = (newPosition) => setPosition(newPosition);
  const updateShapes = (newShapes) => setShapes(newShapes);
  const updateAtualTemplate = (newTemplate) => setAtualTemplate(newTemplate);
    // ADICIONADO MANUALMENTE


  return (
    <ImageContext.Provider
      value={{ imageUrl, zoom, position, shapes, atualTemplate, updateImage, updateZoom, updatePosition, updateShapes, updateAtualTemplate }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useImage = () => {
  return useContext(ImageContext);
};

