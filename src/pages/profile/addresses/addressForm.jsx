export default function AddressFormModal({ editingAddress, setEditingAddress, handleAddress }) {
    return (  <dialog
        id="addressModal"
        className="fixed inset-0 m-auto w-[500px] p-0 rounded-lg backdrop:bg-black/50 dark:bg-slate-800 open:animate-fade-in"
    >
        <form method="dialog" className="flex flex-col" onSubmit={handleAddress}>
            <div className="p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold dark:text-white">
                    {editingAddress ? 'Editar Dirección' : 'Añadir Nueva Dirección'}
                </h2>
                <div className='grid xs:grid-cols-2 gap-4'>
                    <div className="flex flex-col gap-2 col-span-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Nombre de la dirección</span>
                        <input
                            className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            type="text"
                            name="name"
                            defaultValue={editingAddress?.name}
                        />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Dirección</span>
                        <input
                            className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            type="text"
                            name="street"
                            defaultValue={editingAddress?.street}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Ciudad</span>
                        <input
                            className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            type="text"
                            name="city"
                            defaultValue={editingAddress?.city}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Departamento</span>
                        <input
                            className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            type="text"
                            name="state"
                            defaultValue={editingAddress?.state}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Zip code</span>
                        <input
                            className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            type="text"
                            name="zip"
                            defaultValue={editingAddress?.zip}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Teléfono</span>
                        <input
                            className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            type="tel"
                            name="phone"
                            defaultValue={editingAddress?.phone}
                        />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <span className="text-sm font-bold dark:text-white">Tipo de vivienda</span>
                        <div className="flex gap-4">
                            {["hogar", "apartamento"].map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-2 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 peer-checked:border-[#8941ff] dark:peer-checked:border-[#8941ff]"
                            >
                                <input
                                type="radio"
                                name="property"
                                value={type}
                                defaultChecked={editingAddress?.property === type}
                                className="peer hidden"
                                />
                                <div className="w-5 h-5 flex items-center justify-center border-2 border-gray-400 dark:border-gray-500 rounded-full peer-checked:border-[#8941ff] dark:peer-checked:border-[#8941ff] peer-checked:bg-[#8941ff] dark:peer-checked:bg-[#8941ff] duration-300">
                                <div className="w-3 h-3 bg-transparent rounded-full peer-checked:bg-[#8941ff] dark:peer-checked:bg-[#8941ff] transition-all"></div>
                                </div>
                                <span className="text-sm dark:text-white capitalize">{type}</span>
                            </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 col-span-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="default"
                            defaultChecked={editingAddress?.default}
                            className="peer hidden"
                        />
                        <div className="relative w-5 h-5 flex items-center bg-gray-300 dark:bg-slate-600 rounded-full p-1 duration-300 peer-checked:bg-[#8941ff] peer-checked:text-white peer-checked:duration-200"/>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Predeterminado</span>
                        </label>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <span className="xs:text-xs lg:text-sm font-bold dark:text-white">Indicaciones</span>
                        <textarea
                            className="w-full rounded-lg max-h-[100px] border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm"
                            name="indications"
                            defaultValue={editingAddress?.indications}
                        />
                    </div>
                </div>

            </div>
            <div className="border-t border-gray-200 p-4 flex justify-end gap-2">
                <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white"
                    onClick={() => {
                        setEditingAddress(null);
                        document.getElementById('addressModal').close();
                    }}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-black text-white dark:bg-[#8941ff] hover:dark:bg-black hover:bg-[#8941ff]"
                >
                    {editingAddress ? 'Actualizar' : 'Guardar'}
                </button>
            </div>
        </form>
    </dialog>
    )
}