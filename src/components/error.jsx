export default function ErrorPage () {
    return(
        <div className="w-full flex justify-center items-center min-h-[700px]">
          <div className="flex flex-col text-center items-center gap-4 border-[1px] p-8 rounded bg-gray-200">
            <span className="text-black text-[100px]">Oops!</span>
            <span className="text-lg">Algo salió mal</span>
            <span>Lo sentimos. Recarga la página o intenta más tarde.</span>
            <button className="bg-[#8941ff] w-1/2 p-2 rounded text-white" onClick={() => {window.location.reload()}}>Recargar página</button>
          </div>  
        </div>
    )
}