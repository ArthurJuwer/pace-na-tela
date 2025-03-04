'use client'
import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(undefined);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState({}); 
  const [atualTemplate, setAtualTemplate] = useState({}); 
  const [activity, setActivity] = useState({}); 


  const updateImage = (url) => setImageUrl(url);
  const updateZoom = (newZoom) => setZoom(newZoom);
  const updatePosition = (newPosition) => setPosition(newPosition);
  const updateShapes = (newShapes) => setShapes(newShapes);
  const updateAtualTemplate = (newTemplate) => setAtualTemplate(newTemplate);
  const updateActivity = (newActivity) => setActivity(newActivity);



  return (
    <ImageContext.Provider
      value={{ 
          activity, updateActivity,
          imageUrl, updateImage,
          zoom, updateZoom,
          position, updatePosition,
          shapes, updateShapes,
          atualTemplate, updateAtualTemplate
         }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  return useContext(ImageContext);
};

