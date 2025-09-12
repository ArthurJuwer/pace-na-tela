'use client'
import HomeMobile from "@/components/HomeMobile";
import HomeDesktop from "@/components/HomeDesktop";

export default function Home() {
  return (
    <>
    <div className="lg:hidden"><HomeMobile /></div>
    <div className="hidden lg:block"><HomeDesktop /></div>
   </>
  );
}
