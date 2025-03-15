export default function PersonalInformation({ userInfo, updateUserInformation}) {
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const information = {
            ...userInfo,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
        };
        updateUserInformation(information);
    };

    return (
        <form className="flex flex-col gap-8" onSubmit={handleUpdate}>
            <div>
                <h1 className="text-2xl font-bold dark:text-white">Información Personal</h1>
                <span className="text-sm text-gray-600 dark:text-gray-400">Actualiza tu información personal y datos de contacto</span>
            </div>
            <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold dark:text-white">Nombre</span>
                    <input className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" type="text" name="firstName" defaultValue={userInfo?.firstName} />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold dark:text-white">Apellidos</span>
                    <input className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" type="text" name="lastName" defaultValue={userInfo?.lastName}/>
                </div>
                <div className="flex flex-col gap-2 dark:text-white">
                    <span className="text-sm font-bold">Correo electrónico</span>
                    <input className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" type="email" name="email" defaultValue={userInfo?.email}/>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold dark:text-white">Teléfono</span>
                    <input className="w-full rounded-lg border-[1px] border-gray-300 dark:border-none dark:bg-slate-500 dark:text-white px-4 py-2 text-sm" type="text" name="phoneNumber" defaultValue={userInfo?.phoneNumber}/>
                </div>
            </div>
            <button className="mr-auto py-2 px-4 rounded bg-black text-white dark:bg-[#8941ff] hover:dark:bg-black hover:bg-[#8941ff] mt-auto mb-4">Guardar</button>
        </form>
    )
}