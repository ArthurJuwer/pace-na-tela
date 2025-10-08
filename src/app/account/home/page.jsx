'use client'
import Header from '@/components/Account/Header'
import CardInfo from '@/components/Account/Home/CardInfo'
import MainActivity from '@/components/Account/MainActivity'
import React, { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState("");
    const handleOpenLink = () => {
        const activityIdPattern = /activities\/(\d+)/; 
        const match = url.match(activityIdPattern); 

        if (match) {
            const activityId = match[1]; 
            window.location.href = `/activity/${activityId}`; 
            // TROCAR AQUI
        } else {
            alert("Por favor, insira um URL válido da atividade do Strava.");
        }
    };
  return (
    <div className=''>
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <MainActivity />
          <div className="flex items-center justify-center text-center flex-col gap-y-3">
                <h1 className="text-blueMain text-2xl font-bold w-11/12 italic">Carregar Atividade</h1>
                <p className="text-blueSecond text-xs font-medium w-11/12">Link da atividade do STRAVA</p>
            </div>
            <div className="w-11/12 relative">
                <input
                    type="text"
                    className="border border-blueMain rounded-xl p-3.5 w-full placeholder:italic placeholder:text-[#8C9BBC] text-xs"
                    placeholder="ex: https://www.strava.com/activities/1367221"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button
                    onClick={handleOpenLink}
                    className="bg-blueMain size-7 flex items-center text-white rounded-md justify-center absolute transform -translate-y-1/2 top-1/2 right-3"
                >
                    &rarr;
                </button>
            </div>
          <div className="w-[90%] grid grid-cols-2 gap-4">
              <CardInfo nome={'Distância'}/>
              <CardInfo nome={'Distância'}/>
              <CardInfo nome={'Distância'}/>
              <CardInfo nome={'Distância'}/>
          </div>
        </div>
    </div>
  )
}
