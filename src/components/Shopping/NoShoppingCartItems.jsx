
export default function NoShoppingCartItems({ userInfo }) {
    const handleStore = () => {
        window.location.href = userInfo ? "/tienda" : "/login";
    }

    return !userInfo ? (
    <div className="w-full min-h-[91.1vh] flex justify-center items-center dark:bg-gray-900">
      <div className="xs:px-4 lg:px-0 lg:pb-10 text-center flex flex-col items-center gap-4">
        <img src="/usernotlogin.svg" alt="empty cart" className="w-full xs:h-[300px] lg:h-[600px]" />
        <p className="lg:text-lg xs:text-sm text-gray-500 dark:text-white">Para poder comprar debes registrarte o iniciar sesión.</p>
        <button className="bg-[#8941ff] xs:py-2 lg:p-2 text-white xs:w-1/2 lg:w-1/4 rounded xs:text-sm lg:text-base" onClick={handleStore}>Iniciar sesión</button>
      </div>
    </div>
    ) : (
    <div className="w-full min-h-[100vh] flex justify-center items-center dark:bg-gray-900">
      <div className="xs:px-4 lg:px-0 lg:pb-10 text-center flex flex-col items-center gap-4">
        <img src="/shopping/empty-cart.webp" alt="empty cart" className="w-full max-w-[150px] lg:max-w-[400px]" />
        <h2 className="lg:text-2xl xs:text-lg font-bold mb-4 dark:text-white">Tu carrito de compras está vacío</h2>
        <p className="lg:text-lg xs:text-sm text-gray-500">Parece que aún no has añadido productos a tu carrito de compras.</p>
        <button className="bg-[#8941ff] xs:py-2 lg:p-2 text-white xs:w-1/2 lg:w-1/4 rounded xs:text-sm lg:text-base" onClick={handleStore}>Ir a la tienda</button>
      </div>
    </div>
    )
}