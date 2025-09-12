import Image from "next/image";

export default function RunningCard() {
  return (
    <div className="relative w-[450px] 2xl:w-[500px] rounded-2xl overflow-hidden bg-white shadow-lg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[60px] bg-[#D8DFE3]    rounded-b-[30px] z-20 flex justify-center items-center">
        <button className="bg-[#0E8DB4] mb-4 items-center text-white font-bold text-sm px-7 py-3 2xl:px-12 rounded-full hover:bg-[#02277C] transition">
        VAMOS LÁ!
        </button>
      </div>

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
