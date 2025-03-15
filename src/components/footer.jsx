const Footer = () => {
  return (
    <footer className="bg-black text-white py-7 px-8 w-full">
      <div className="justify-center grid xs:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 w-full">
        <div className="flex flex-col gap-2">
            <h1 className="xs:text-sm lg:text-xl font-bold">Sobre Nosotros</h1>
        </div>
        <div className="flex flex-col gap-4">
            <h1 className="xs:text-sm lg:text-xl font-bold">Servicio al cliente</h1>
            <ul className="flex flex-col gap-2">
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer">Contáctanos</li>
            </ul>
        </div>
        <div className="flex flex-col gap-4">
            <h1 className="xs:text-sm lg:text-xl font-bold">Links de Interés</h1>
            <ul className="flex flex-col gap-2">
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer">Lubricantes</li>
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer">Lencería</li>
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer">Carrito</li>
            </ul>
        </div>
        <div className="flex flex-col gap-4">
            <h1 className="xs:text-sm lg:text-xl font-bold">Redes Sociales</h1>
            <ul className="flex flex-col gap-2">
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer"><a href="https://www.facebook.com/DiscretasSeduccion" target="_blank" rel="noreferrer">Facebook</a></li>
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer"><a href="https://www.instagram.com/discretas.seduccion/" target="_blank" rel="noreferrer">Instagram</a></li>
                <li className="xs:text-xs lg:text-base hover:text-[#8941FF] text-gray-400 font-bold cursor-pointer"><a href="https://www.youtube.com/channel/UC-4-0-6-9-5-2-1-3-4" target="_blank" rel="noreferrer">Youtube</a></li>
            </ul>
        </div>
      </div>
      <div className="border-t-[1px] border-gray-800 py-2 text-center w-ful">
         <span className="xs:text-xs lg:text-sm">
          © {new Date().getFullYear()} Discretas. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;