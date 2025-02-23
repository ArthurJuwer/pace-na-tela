import Image from "next/image";
import Link from "next/link";

export default function Templates({title, image, template}) {
  return (
    <Link href={`customizavel/edit/${template}`}>
      <div className="bg-[#0084FF] w-full h-auto p-3 pb-5 rounded-xl flex flex-col">
          <h1 className="text-xs bg-white text-[#0084FF] p-1 text-center rounded-md font-semibold">{title}</h1>
          <Image src={image} alt={`${image}`} className="w-full mt-6" />
      </div>
    </Link>
  )
}
