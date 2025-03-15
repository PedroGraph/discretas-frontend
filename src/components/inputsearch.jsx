import { useState, XSquare } from "react";
import { SearchIcon } from "lucide-react";
import useProductStore from "../stores/productStore";
import Loader from "./loader";

export default function InputSearch() {

  const { foundProducts, queryProducts, searchProducts, searchEngineMessage, setQueryProducts, setProductFound, searchEngineLoading } = useProductStore();
  const [phoneMode, setPhoneMode] = useState(false);

  return (
    <div className="xl:bg-black transition-colors duration-300">
      <div className="relative max-w-[600px] w-full lg:p-4 xs:p-0">
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar productos..."
            defaultValue={queryProducts?.search}
            onChange={(e) => !e.target.value ? setProductFound([]) : setQueryProducts({ Name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && searchProducts(queryProducts)}
            className="flex-grow rounded-l-full rounded-r-none border border-gray-300 px-4 py-2 focus:outline-none hidden lg:block lg:bg-white lg:text-black"
          />
          <button
            className="xs:hidden lg:block rounded-l-none rounded-r-full xs:bg-black lg:bg-[#8941ff] hover:bg-[#8941ff] xs:p-0 lg:px-4 lg:py-2 text-white"
            onClick={() => searchProducts(queryProducts)}
          >
            <SearchIcon className="xs:h-6 xs:w-7 lg:h-4 lg:w-4" />
          </button>
          <button
            className="xs:block lg:hidden text-white absolute right-0 top-3 "
            onClick={() => setPhoneMode(!phoneMode)}
          >
            <SearchIcon className="xs:h-6 xs:w-7 lg:h-4 lg:w-4" />
          </button>
        </div>
        {searchEngineLoading && <div className="xs:hidden lg:flex absolute max-w-[550px] w-full z-10 bg-white xl:bg-white py-4 mt-1 rounded-md shadow-lg"> <Loader /></div>}
        {foundProducts && foundProducts.length > 0 && (
          <ul className="xs:hidden lg:flex lg:flex-col absolute max-w-[550px] w-full z-10 bg-white xl:bg-gray-800  mt-1 rounded-md shadow-lg">
            {[...foundProducts, ...foundProducts, ...foundProducts, ...foundProducts].slice(0, 3).map((suggestion, index) => (
              <li
                key={index}
                className="flex gap-4 px-2 py-2 hover:bg-gray-100 xl:hover:bg-gray-300 cursor-pointer xl:text-black  bg-white shadow-lg "
                onClick={() => window.location.href = `/${suggestion.category.toLowerCase()}/${suggestion.name}_${suggestion.id}`}
              >
                <img src={suggestion.images[0].imageName} alt={suggestion.name} className="w-1/6 xs:min-w-[50px] xs:w-[50px] xs:h-[50px] lg:min-w-[72px] lg:w-[72px] lg:h-[172x] rounded object-cover" />
                <span className="xs:text-sm font-medium text-gray-800">{suggestion.name}</span>
              </li>
            ))}
            <li
              className="px-4 py-2 bg-white hover:bg-gray-100 xl:hover:bg-gray-300 cursor-pointer border-t-[1px] border-gray-300 text-center text-slate-700 text-sm"
            // onClick={searchProducts}
            >
              Ver todos los resultados
            </li>
          </ul>
        )}
      </div>
      {
        phoneMode && (
          <div className="fixed h-screen inset-0 bg-white z-50 p-4 flex flex-col items-center">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar productos..."
                defaultValue={queryProducts?.search}
                onChange={(e) => !e.target.value ? setProductFound([]) : setQueryProducts({ Name: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && searchProducts(queryProducts)}
                className="flex-grow rounded-l-full rounded-r-none border border-gray-300 px-4 py-2 focus:outline-none block lg:bg-white lg:text-black"
              />
              <button
                className="xs:block rounded-l-none rounded-r-full xs:bg-black lg:bg-[#8941ff] hover:bg-[#8941ff] xs:px-4 xs:py-2 text-white"
                onClick={() => searchProducts(queryProducts)}
              >
                <SearchIcon className="xs:h-6 xs:w-7 lg:h-4 lg:w-4" />
              </button>
            </div>
            {searchEngineLoading && <div className="absolute top-16 max-w-[550px] w-full z-10 bg-white xl:bg-white py-4 mt-1 rounded-md"> <Loader /></div>}
            {foundProducts && foundProducts.length > 0 && (
              <ul className="absolute border-t-[1px] border-gray-300 top-16 max-w-[550px] w-full z-10 bg-white xl:bg-gray-800  mt-1 rounded-md shadow-lg">
                {console.log(foundProducts)}
                {[...foundProducts, ...foundProducts, ...foundProducts, ...foundProducts].slice(0, 3).map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => window.location.href = `/${suggestion?.category?.toLowerCase()}/${suggestion?.name}_${suggestion?.id}`}
                  >
                   <img src={suggestion.images[0].imageName} alt={suggestion.name} className="w-1/6 xs:min-w-[50px] xs:w-[50px] xs:h-[50px] lg:min-w-[72px] lg:w-[72px] lg:h-[172x] rounded object-cover" />
                   <span className="xs:text-sm font-medium text-gray-800">{suggestion.name}</span>
                  </li>
                ))}
                <li
                  key={"ver todos"}
                  className="px-4 py-2 bg-[#8941FF] text-white hover:bg-gray-100 xl:hover:bg-gray-300 cursor-pointer border-t-[1px] border-gray-300 text-center text-slate-700 text-sm"
                  onClick={searchProducts}
                >
                  Ver todos los resultados
                </li>
              </ul>
              )}
            <button className="absolute bottom-28 p-4 bg-[#8941ff] hover:bg-[#8941ff] text-white rounded-full" onClick={() => setPhoneMode(!phoneMode)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )
      }
    </div>
  )
}