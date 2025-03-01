'use client'
// import React, { createContext, useState, useContext } from 'react';

// const ImageContext = createContext();

// export const useImageContext = () => {
//   return useContext(ImageContext);
// };

// export const ImageProvider = ({ children }) => {
//   const [imageUrl, setImageUrl] = useState('');

//   return (
//     <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };
import React, { createContext, useState, useContext } from 'react';

// Define o contexto
const ImageContext = createContext();

// Provedor do contexto
export const ImageProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updateImage = (url) => setImageUrl(url);
  const updateZoom = (newZoom) => setZoom(newZoom);
  const updatePosition = (newPosition) => setPosition(newPosition);

  return (
    <ImageContext.Provider
      value={{ imageUrl, zoom, position, updateImage, updateZoom, updatePosition }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useImage = () => {
  return useContext(ImageContext);
};

