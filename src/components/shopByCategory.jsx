const ShopByCategory = () => {
    return (
        <div className="flex flex-col gap-8 p-8 bg-white dark:bg-gray-700 w-full">
            <h1 className="text-center xs:text-xl lg:text-4xl font-bold dark:text-white text-black">Categorías</h1>
            <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <div className="relative cursor-pointer group" onClick={() => window.location.href = "/lenceria"}>
                    <img src="/main/LingeriCategory.webp" className="w-full h-[300px] object-cover rounded-lg border-[1px] border-black dark:border-none" /> 
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-lg"></div>
                    <h1 className="absolute font-bold flex flex-col text-center lg:text-2xl xs:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white z-10">
                        Lenceria
                    </h1>
                </div>
                <div className="relative cursor-pointer group" onClick={() => window.location.href = "/lubricante"}>
                    <img src="/main/AccesoriesCategory.webp" className="w-full h-[300px] object-cover rounded-lg border-[1px] border-black dark:border-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-lg"></div>
                    <h1 className="absolute font-bold flex flex-col text-center lg:text-2xl xs:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white z-10">
                        Lubricantes
                    </h1>
                </div>
                <div className="relative cursor-pointer group" onClick={() => window.location.href = "/tienda"}>
                    <img src="/main/All.webp" className="w-full h-[300px] object-cover rounded-lg border-[1px] border-black dark:border-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-lg"></div>
                    <h1 className="absolute font-bold flex flex-col text-center lg:text-2xl xs:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white z-10">
                        Todos nuestros productos
                    </h1>
                </div>
                <div className="relative group">
                    <img src="/main/Soon.webp" className="w-full h-[300px] object-cover rounded-lg opacity-100 filter grayscale border-[1px] border-black dark:border-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/100 opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    <h1 className="absolute font-bold flex flex-col text-center lg:text-2xl xs:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white z-10">
                       Nuevos productos en breve
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default ShopByCategory;
