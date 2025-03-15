export default function UserNotifications({ notifications, setStatusNotifications, userId }) {
    
    const updatingNotifications = async (data) => {
        const response = await setStatusNotifications(userId, { ...notifications, ...data });
        return response;
    }

    return (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold dark:text-white">Preferencias de Notificaciones</h1>
                <span className="text-sm text-gray-600 dark:text-gray-200">Gestiona cómo quieres recibir las notificaciones</span>
            </div>
            <div className="grid gap-4 w-full">
                <div className="flex justify-between gap-2 py-4 border-b-2 w-full">
                    <div>
                        <h2 className="text-base font-bold text-black dark:text-white">Ofertas Especiales</h2>
                        <span className="text-sm text-gray-700 dark:text-gray-200">Sé el primero en enterarte de nuestras ofertas exclusivas</span>
                    </div>
                    <div className="flex gap-2">
                        <button className={` border-2 ${notifications?.specialOffers === "EMAIL" ? "bg-[#8941ff] dark:border-[#8941ff]" : "bg-gray-600 dark:border-gray-600"} xs:text-xs lg:text-base text-white px-4 rounded-lg`} onClick={() => updatingNotifications({ specialOffers: "EMAIL" })}>Email</button>
                        <button className={` border-2 ${notifications?.specialOffers === "SMS" ? "bg-[#8941ff] dark:border-[#8941ff]" : "bg-gray-600 dark:border-gray-600"}  xs:text-xs lg:text-base text-white px-4 rounded-lg`} onClick={() => updatingNotifications({ specialOffers: "SMS" })}>SMS</button>
                    </div>
                </div>
                <div className="flex justify-between gap-2 py-4 border-b-2 w-full">
                    <div>
                        <h2 className="text-base font-bold text-black dark:text-white">Nuevas Colecciones</h2>
                        <span className="text-sm text-gray-600 dark:text-gray-200">Mantente al día con nuestros nuevos productos</span>
                    </div>
                    <div className="flex gap-2"> 
                        <button className={` border-2 ${notifications?.newCollections === "EMAIL" ? "bg-[#8941ff] dark:border-[#8941ff]" : "bg-gray-600 dark:border-gray-600"} xs:text-xs lg:text-base text-white px-4 rounded-lg`} onClick={() => updatingNotifications({ newCollections: "EMAIL" })}>Email</button>
                        <button className={` border-2 ${notifications?.newCollections === "SMS" ? "bg-[#8941ff] dark:border-[#8941ff]" : "bg-gray-600 dark:border-gray-600"}  xs:text-xs lg:text-base text-white px-4 rounded-lg`} onClick={() => updatingNotifications({ newCollections: "SMS" })}>SMS</button>
                    </div>
                </div>
                <div className="flex justify-between gap-2 py-4 border-b-2 w-full">
                    <div>
                        <h2 className="text-base font-bold text-black dark:text-white">Recordatorios de Carrito</h2>
                        <span className="text-sm text-gray-600 dark:text-gray-200">Recordatorios sobre productos en tu carrito</span>
                    </div>
                    <div className="flex gap-2">
                        <button className={` border-2 ${notifications?.shoppingCartReminder === "EMAIL" ? "bg-[#8941ff] dark:border-[#8941ff]" : "bg-gray-600 dark:border-gray-600"} xs:text-xs lg:text-base text-white px-4 rounded-lg`} onClick={() => updatingNotifications({ shoppingCartReminder: "EMAIL" })}>Email</button>
                        <button className={` border-2 ${notifications?.shoppingCartReminder === "SMS" ? "bg-[#8941ff] dark:border-[#8941ff]" : "bg-gray-600 dark:border-gray-600"}  xs:text-xs lg:text-base text-white px-4 rounded-lg`} onClick={() => updatingNotifications({ shoppingCartReminder: "SMS" })}>SMS</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}