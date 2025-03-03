'use client'

import { useRef } from "react";

export default function DraggableBox() {
  const constraintsRef = useRef(null);

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-200">
      <div class="flex space-x-4">
          
          <div class="relative flex items-center justify-center w-40 h-40 border-4 border-blue-500 rounded-full">
              <div class="text-center">
                  <p class="text-2xl font-bold text-gray-700">146 <span class="text-lg">bpm</span></p>
                  <p class="text-sm text-gray-500">Frequência Cardíaca Média</p>
              </div>
          </div>
          
          <div class="relative flex items-center justify-center w-40 h-40 border-4 border-orange-500 rounded-full">
              <div class="text-center">
                  <p class="text-2xl font-bold text-gray-700">6,01 <span class="text-lg">km</span></p>
                  <p class="text-sm text-gray-500">Distância</p>
              </div>
          </div>
          
          <div class="relative flex items-center justify-center w-40 h-40 border-4 border-green-500 rounded-full">
              <div class="text-center">
                  <p class="text-2xl font-bold text-gray-700">5:02 <span class="text-lg">/km</span></p>
                  <p class="text-sm text-gray-500">Ritmo Médio</p>
              </div>
          </div>
      </div>
    </div>
  );
}
