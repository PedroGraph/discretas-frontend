export default function NotFound() {
    return (
        <div className="flex dark:bg-slate-900 flex-col items-center justify-center w-full h-screen gap-4">
            <img src="/404/404.svg" alt="404" className="w-full max-w-[300px] lg:max-w-[500px]" />
            <button className="bg-[#8941ff] hover:bg-black rounded text-white px-4 py-2 text-base" onClick={() => window.location.href = "/"}>Volver a la tienda</button>
        </div>
    )
}