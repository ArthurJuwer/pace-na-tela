export default function CheckboxInformacoes({title, isSelect }) {
  return (
    <div className="flex items-center gap-x-5 relative">
        <div className="size-4 bg-white border-blueSecond border-[2px] flex items-center justify-center">
            <span className={`${isSelect ? 'block' : 'hidden'} size-1.5 bg-blueSecond`}></span>
        </div>
        <h1 className="text-white">{title}</h1>
        
    </div>
  )
}
