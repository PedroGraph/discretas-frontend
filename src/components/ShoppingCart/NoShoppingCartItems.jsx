export default function NoShoppingCartItems() {
    const handleStore = () => {
        window.location.href = "/tienda";
    }
    return (
        <div className="w-full min-h-[600px] flex justify-center items-center">
            <div className="text-center flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold mb-4">Tu carrito de compras está vacío</h2>
                <p className="text-gray-500">Parece que aún no has añadido productos a tu carrito de compras.</p>
                <button className="bg-[#8941ff] p-2 text-white w-1/4 rounded" onClick={handleStore}>Ir a la tienda</button>
            </div>
        </div>
    )
}