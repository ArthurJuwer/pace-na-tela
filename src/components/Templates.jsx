import Image from "next/image";
import Link from "next/link";

export default function Templates({ title, image, template }) {
  return (
    <Link href={`customizavel/edit/${template}`}>
      <div className="bg-[#0084FF] w-full h-40 p-3 rounded-xl flex flex-col justify-between">
        <h1 className="text-xs bg-white text-[#0084FF] p-1 text-center rounded-md font-semibold">
          {title}
        </h1>
        <div className="flex-grow flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            className="w-full h-24 object-contain"
          />
        </div>
      </div>
    </Link>
  );
}
