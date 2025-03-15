import { PackageX } from "lucide-react"

export default function productNotFound() {
    return (    
        <div className="flex items-center justify-center w-full h-screen bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center gap-4 w-full max-w-lg">
                <PackageX className="w-32 h-32 text-red-500" />
                <h1 className="text-2xl font-bold dark:text-white">No se encontraron los detalles del producto</h1>
                <button className="bg-[#8941ff] bg-black hover:bg-[#8941ff] dark:bg-[#8941ff] dark:hover:bg-black rounded text-white px-4 py-2 text-sm" onClick={() => window.location.href = "/"}>Volver a la tienda</button>
            </div>
        </div>
    )
}