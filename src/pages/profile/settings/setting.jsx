export default function Settings() {
    return (
        <form className="flex flex-col gap-8">
             <div>
                <h1 className="text-2xl font-bold dark:text-white">Configuración de la Cuenta</h1>
                <span className="text-sm text-gray-600 dark:text-gray-400">Gestiona la configuración de tu cuenta y preferencias</span>
            </div>
            <div className="grid xs:grid-cols-1 gap-4 w-full">
                <h2 className="text-base font-bold text-black dark:text-white">Contraseña</h2>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Contraseña actual</span>
                    <input type="password" className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" placeholder="******" />
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Nueva Contraseña</span>
                    <input type="password" className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" placeholder="******" />
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Confirmar Contraseña</span>
                    <input type="password" className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" placeholder="******" />
                </div>
                <div className="flex justify-end">
                    <button className="mr-auto py-2 px-4 rounded bg-black text-white dark:bg-[#8941ff] hover:dark:bg-black hover:bg-[#8941ff] mt-auto mb-4">Guardar</button>    
                </div>
            </div>
        </form>
    )
}