import Image from "next/image"

export default function AppIntegrationInfo({image, name, index}) {
  return (
    <div className="flex items-center gap-x-6 w-full px-5 py-8 bg-[#EDEDED] rounded-3xl shadow-2xl">
        { index % 2 === 0 ? <Image src={image} className="h-full" alt="logo strava" /> : null}
        <div className="flex flex-col gap-y-2 ">
            <h1 className="text-[#1E1E1E] font-semibold italic">{name}</h1>
            <p className="text-[#989898] text-[10px] font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            bawe sda 200 text ever since the adgws</p>
        </div>
        { index % 2 === 1 ? <Image src={image} className="h-full" alt="logo strava" /> : null}
    </div>
  )
}
