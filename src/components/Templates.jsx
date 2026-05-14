import Image from "next/image";
import Link from "next/link";

export default function Templates({ title, image, template }) {
  return (
    <Link href={`customizavel/edit/${template}`}>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden active:scale-95 transition-transform duration-150">
        <div className="h-28 bg-gradient-to-br from-blueMain/10 to-blue-50 flex items-center justify-center p-3">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="px-3 py-2.5">
          <p className="text-xs font-semibold text-[#1E1E1E] truncate">{title}</p>
        </div>
      </div>
    </Link>
  );
}
