'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import postInterativos from "../../../../public/posts01.svg"
import postCustomizavel from "../../../../public/posts02.svg"
import Link from 'next/link';

const Activity = ({params}) => {
  const { id } = React.use(params); 
  // const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState({});

  // useEffect(() => {
  //   if (id) {
  //     const fetchActivity = async () => { 
  //       try {
  //         const response = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, {
  //           headers: {
  //             Authorization: `Bearer OCULTADO`, // Use uma variável de ambiente para o token
  //             // TROCAR AQUI PELO TOKEN DO .ENV
  //           },
  //         });
  //         setActivity(response.data);
  //         console.log('Dados da atividade:', response.data);

  //       } catch (err) {
  //         // Melhore o tratamento de erros
  //         if (err.response) {
  //           setError(err.response.data);
  //         } else {
  //           setError({ message: 'Erro ao buscar a atividade.' });
  //         }
  //       }
  //     };

  //     fetchActivity(); // Chama a função sem passar o ID fixo
  //   }

  //   // AQUI ESTAMOS VERIFICANDO SE TEM ATIVIDADE DEPOIS A PESSOA IRA ESCOLHER QUAL ELA DESEJA E SO IREMOS MANDAR PARA A OUTRA PAGINA
  //   // ONDE TEM AS INFORMAÇÔES OU O POST INTERATIVO O OBJETO PARA CONSEGUIR FILTRAR MELHOR ESTA PAGINA VERIFICA SE TEM E CASO
  //   // ATUALMENTE SO ESTA FUNCIONANDO AS ATIVIDADES DA MINHA CONTA ARTHUR JUWER

  // }, [id]);

  const handleSelectPost = (postType) => {
    setSelectedPosts((prev) => {
      const newSelection = { ...prev };

      if (newSelection[postType]) {
        delete newSelection[postType];
      } else {
        const values = Object.values(newSelection);
        if (values.length === 0) {
          newSelection[postType] = 1;
        } else if (values.length === 1) {
          newSelection[postType] = 2;
        }
      }

      const entries = Object.entries(newSelection);
      entries.sort((a, b) => a[1] - b[1]); 
      return Object.fromEntries(entries.map(([key], index) => [key, index + 1]));
    });

    
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className="min-h-screen text-white flex flex-col gap-y-12 items-center p-4 font-inter">
      <div className="bg-[#1E1E1E] text-white py-1.5 px-12 rounded-3xl italic">
        <p className="text-sm font-semibold">Sua atividade foi salva</p>
      </div>
      <h1 className="text-3xl font-bold text-center text-blueMain w-full italic">
        Selecione o tipo de post que deseja
      </h1>
      <div className="w-full max-w-3xl space-y-6">
      <div
          className={`p-6 rounded-lg bg-blueMain transition cursor-pointer relative ${
            selectedPosts.interativo ? "ring-4 ring-blue-500" : ""
          }`}
          onClick={() => handleSelectPost("interativo")}
        >
          {selectedPosts.interativo && (
            <div className="absolute top-3 left-3 shadow-2xl bg-white text-blueMain font-bold w-6 h-6 flex items-center justify-center rounded-full">
              {selectedPosts.interativo}
            </div>
          )}
          
          <div className='flex flex-col gap-y-4'>
            <Image src={postInterativos} alt='Seleção do Post Interativo' className='w-full h-auto mt-5' priority={true} />
            {/* COLOQUEI PRIORITY PQ A IMAGEM É PESADA, DIMINUIR O TAMANHO DELA */}
            <h2 className="font-bold bg-white text-blueMain p-2 text-center rounded-2xl">Post Interativo</h2>
            <p className="text-sm text-center">
              Receba um post humorístico de acordo com as informações da sua
              atividade.
            </p>
            <ul className="text-gray-400 text-sm list-disc flex justify-center gap-10 pl-5 mt-2">
              <li>Aleatório</li>
              <li>Informativo</li>
              <li>Curioso</li>
            </ul>
          </div>
          
        </div>
        <div
          className={`p-6 rounded-lg bg-blueMain transition cursor-pointer relative ${
            selectedPosts.customizavel ? "ring-4 ring-blue-500" : ""
          }`}
          onClick={() => handleSelectPost("customizavel")}
        >
          {selectedPosts.customizavel && (
            <div className="absolute top-3 left-3 shadow-2xl bg-white text-blueMain font-bold w-6 h-6 flex items-center justify-center rounded-full">
              {selectedPosts.customizavel}
            </div>
          )}
          <div className='flex flex-col gap-y-4'>
            <Image src={postCustomizavel} alt='Seleção do Post Customizável' className='w-full mt-5' />
            <h2 className="font-bold bg-white text-blueMain p-2 text-center rounded-2xl">Post Customizável</h2>
            <p className="text-sm text-center">
            Escolha entre templates
            famosos de instagram e as 
            informações mais relevantes
            sobre sua atividade 
            </p>
            <ul className="text-gray-400 text-sm list-disc flex justify-center gap-10 pl-5 mt-2">
              <li>Customizável</li>
              <li>Requer foto</li>
              <li>Opções</li>
            </ul>
          </div>
          
        </div>
      </div>
      <div className="flex items-center justify-between w-full max-w-3xl mt-6">
        <button className="text-[#1E1E1E] font-semibold italic">
          &lt; voltar
        </button>
        <Link 
          href={
              Object.keys(selectedPosts).length > 1 
              ? `/activity/${id}/model/ambos` : 
            (
              Object.keys(selectedPosts)[0] === "customizavel" 
              ? `/activity/${id}/model/customizavel` : `/activity/${id}/model/interativo`
            )
          }
          className="bg-blueMain text-white px-10 py-1.5 rounded-2xl" disabled={!selectedPosts.interativo && !selectedPosts.customizavel}>
          Avançar
        </Link>
      </div>
    </div>
    </>
  );
};

export default Activity;