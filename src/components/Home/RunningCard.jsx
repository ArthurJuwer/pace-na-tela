// components/RunningCard.tsx
import Image from "next/image";

export default function RunningCard() {
  return (
    <div className="relative w-[400px] rounded-2xl overflow-hidden bg-white shadow-lg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[60px] bg-[#D8DFE3]   rounded-b-[30px] z-20 flex justify-center items-center">
        <button className="bg-[#008EB6] text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-[#02277C] transition">
        VAMOS LÁ!
        </button>
      </div>

      {/* Imagem */}
      <Image
        src="/imagemhomedesktop.png"
        alt="Runner"
        width={500}
        height={300}
        className="w-full h-full relative z-10"
      />
    </div>
  );
}
