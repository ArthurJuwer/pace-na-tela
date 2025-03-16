export default function MenuHamburger({onClick, isOpen}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-2 cursor-pointer z-50  right-10 ${isOpen ? 'fixed' : 'absolute'}` }
    >
      <span
        className={`block w-10 h-1 rounded-sm transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-y-2 bg-white' : 'bg-black'
        }`}
      ></span>
      <span
        className={`block w-10 h-1 bg-black rounded-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`block w-10 h-1  rounded-sm transition-transform duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2 bg-white' : 'bg-black'
        }`}
      ></span>
    </div>
  );
}