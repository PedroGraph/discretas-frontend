import { UserX, RefreshCw } from "lucide-react"
export default function ErrorPage () {
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="text-center flex flex-col justify-center max-w-[600px]">
        <UserX className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Error al cargar la información de tu usuario</h1>
        <p className="text-gray-600 mb-4 dark:text-white">Lo sentimos, no pudimos cargar la información de tu usuario. Por favor, intenta de nuevo.</p>
        <button onClick={() => window.location.href = "/profile"} className=" bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex justify-center items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Intentar de nuevo
        </button>
      </div>
    </div>
    )
}