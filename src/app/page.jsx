'use client'
import Image from "next/image";

import Logo from "../../public/logo-pacenatela.svg";
import LogoBranca from "../../public/logobranca-pacenatela.svg";

import LogoAdidas from "../../public/logo-apps-integracao/Adidas.svg"
import LogoAsics from "../../public/logo-apps-integracao/Asics.svg"
import LogoStrava from "../../public/logo-apps-integracao/Strava.svg"
import LogoUnder from "../../public/logo-apps-integracao/UnderArmounds.svg"

import LogoIconeInstagram from "../../public/redes-sociais/Instagram.svg"
import LogoIconeStrava from "../../public/redes-sociais/Strava.svg"

import Main from "../../public/main.png";
import Informacoes from "../../public/informacoes.png";
import Templates from "../../public/templates.png";
import PostsDivertidos from "../../public/postsdivertidos.png";

import MenuHamburger from "@/components/MenuHamburger";
import AppIntegrationInfo from "@/components/Home/AppIntegrationInfo";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "@/components/Home/Modal";
import HomeMobile from "@/components/HomeMobile";
import HomeDesktop from "@/components/HomeDesktop";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className="lg:hidden"><HomeMobile /></div>
    <div className="hidden lg:block"><HomeDesktop /></div>
   </>
  );
}
