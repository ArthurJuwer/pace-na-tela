'use client'
import Image from "next/image";

import Logo from "../../public/logo-pacenatela.svg";
import LogoBranca from "../../public/logobranca-pacenatela.svg";

import pwrdByStrava from "../../public/api_logo_pwrdBy_strava_horiz_white.png";
import cptblWithStrava from "../../public/api_logo_cptblWith_strava_horiz_white.png";

import LogoAdidas from "../../public/logo-apps-integracao/Adidas.svg"
import LogoAsics from "../../public/logo-apps-integracao/Asics.svg"
import LogoStrava from "../../public/logo-apps-integracao/Strava.svg"
import LogoUnder from "../../public/logo-apps-integracao/UnderArmounds.svg"

import LogoIconeInstagram from "../../public/redes-sociais/Instagram.svg"
import LogoIconeStrava from "../../public/redes-sociais/Strava.svg"

import Main from "../../public/main.png";
import Informacoes from "../../public/Informacoes.png";
import Templates from "../../public/templates.png";
import PostsDivertidos from "../../public/postsdivertidos.png";

import MenuHamburger from "@/components/MenuHamburger";
import AppIntegrationInfo from "@/components/Home/AppIntegrationInfo";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "@/components/Home/Modal";

export default function Home() {

  const [showModal, setShowModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`fixed bg-blueSecond h-screen pt-32 top-0 right-0 w-3/5 shadow-md rounded-lg ${isOpen ? 'block' : 'hidden'} z-0`}>
        <ul className="flex gap-y-10 flex-col items-center py-4 text-white">
          <li><a href="#entrar" className="">Carregar Atividade</a></li>
          <li><a href="#diferenciais" className="">Diferenciais</a></li>
          <li><a href="#integracoes" className="">Integrações</a></li>
          <li><a href="#integracoes" className="">Rodapé</a></li>
          <li><a href="#entrar" className="">Entrar</a></li>
          <li><a href="#integracoes" className="">Sobre</a></li>
        </ul>
    </div>

    <div className={"flex flex-col gap-y-10 w-full font-inter"}>
    
      <header className="flex items-center justify-between p-10 pb-0">
        <Image src={Logo} width={100} height={100} alt="logo pace na tela" className="w-auto h-auto" />
        <MenuHamburger onClick={toggleMenu} isOpen={isOpen} />

      
      </header>

      <Image src={Main} className="w-full h-auto" alt="logo pace na tela" priority={true} />

      <div className="flex gap-y-4 flex-col justify-center items-center">
        <h1 className="text-blueMain text-2xl font-bold text-center w-11/12 italic">Correu? Personalize aqui!</h1>
        <p className="text-blueSecond text-sm font-medium text-center w-9/12">You're invited to join the Runkeeper app community and unlock your running potential.</p>
        <button 
          id="entrar" 
          className="border border-blueMain border-dashed rounded-3xl w-10/12 h-36 flex items-center justify-center mt-2"
          onClick={()=> setShowModal(true)}

        >
          <h3 className="text-center text-sm text-blueMain font-semibold italic">Carregue sua atividade clicando aqui!</h3>
        </button>
        {showModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <Modal key={'modal'} closeModal={setShowModal}/>
          </>
        )}

      </div>

      <div id="diferenciais" className="bg-blueMain flex justify-center items-center p-8">
        <h1 className="text-white text-center text-2xl font-bold w-10/12 italic">O que consigo fazer de diferente com este site?</h1>
      </div>

      <div className="flex gap-y-4 flex-col justify-center items-center">
        <h1 className="text-blueMain text-2xl font-bold text-center w-11/12 italic">Escolha suas informações</h1>
        <p className="text-blueSecond text-sm font-medium text-center w-10/12">Compartilhe informações do seu gosto</p>
      </div>
      <Image src={Informacoes} className="w-full h-auto" alt="logo pace na tela" />

      <div className="flex gap-y-4 flex-col justify-center items-center">
        <h1 className="text-blueMain text-2xl font-bold text-center w-11/12 italic">Design Personalizável</h1>
        <p className="text-blueSecond text-sm font-medium text-center w-10/12">Deixe sua foto mais profissional e intuitiva</p>
      </div>
      <Image src={Templates} className="w-full h-auto" alt="logo pace na tela" />

      <div className="flex gap-y-4 flex-col justify-center items-center">
        <h1 className="text-blueMain text-2xl font-bold text-center w-11/12 italic">Posts Divertidos</h1>
        <p className="text-blueSecond text-sm font-medium text-center w-10/12">Esqueceu de tirar foto?<br />escolha um card de humor sobre sua corrida</p>
      </div>
      <Image src={PostsDivertidos} className="w-full h-auto px-4" alt="logo pace na tela" />

      {/* <div className="bg-blueMain flex justify-center items-center p-8">
        <h1 className="text-white text-center text-2xl font-bold w-10/12 italic">Quais apps o Pace na Tela tem integração?</h1>
      </div> */}

      <section id="integracoes" className="w-11/12 mx-auto grid grid-cols-4 place-content-center place-items-center gap-6">
        {/* <Image src={LogoStrava} height={40} className="w-48 h-auto" alt="logo Strava" />
        <Image src={LogoAdidas} height={40} className="w-48 h-auto" alt="logo Adidas" />
        <Image src={LogoUnder} height={40} className="w-48 h-auto" alt="logo Under Armour" />
        <Image src={LogoAsics} height={40} className="w-48 h-auto" alt="logo Asics" /> */}
      </section>

      <section  className="flex flex-col gap-5 items-center justify-center w-11/12 mx-auto">
        {/* <AppIntegrationInfo image={LogoStrava} name={'Strava'} index={0}/>
        <AppIntegrationInfo image={LogoAdidas} name={'Adidas RUNTASTIC'} index={1}/>
        <AppIntegrationInfo image={LogoUnder}  name={'Under Armour RUN'} index={2}/>
        <AppIntegrationInfo image={LogoAsics}  name={'Asics RUN'} index={3}/> */}
      </section>

      <footer className="bg-[#8C9BBC] w-full p-10 flex flex-col gap-y-8">
        <div className="flex items-center justify-between">
          <Image src={LogoBranca} width={100} height={100} alt="logo pace na tela" className="w-auto h-auto" />
          <div className="flex items-center gap-4">
            <div className="bg-white size-12 rounded-full flex items-center justify-center">
              <Image src={LogoIconeInstagram} width={25} height={25} alt="logo instagram" className="w-auto h-auto" />
            </div>
            <div className="bg-white size-12 rounded-full flex items-center justify-center">
              {/* <Image src={LogoIconeStrava} width={25} height={25} alt="logo strava" className="w-auto h-auto"/> */}
            </div>
          </div>
        </div>
        <nav className="">
        <ul className="grid grid-cols-3 place-items-center place-content-center">
          <Link href={'#entrar'} className="text-white font-medium text-center">Entrar</Link>
          <Link href={'#diferenciais'} className="text-white font-medium text-center">Diferenciais</Link>
          <Link href={'#integracoes'} className="text-white font-medium text-center">Integrações</Link>
        </ul>
        </nav>
        <div className="flex flex-col items-center justify-center ">
          <h3 className="text-[#8C9BBC] bg-white rounded-full font-medium px-8 py-3 text-center">© Copyright 2025 Arthur Juwer</h3>
          <div className="flex mt-10 gap-5">
            <Image className="w-40 " src={pwrdByStrava} alt="Logo Strava" />
            <Image className="w-40"src={cptblWithStrava} alt="Logo Strava" />
          </div>
          
        </div>
      </footer>
    </div>
    </>
  );
}
