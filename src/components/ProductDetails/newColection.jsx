import useProductStore from "../../stores/productStore"

export default function NewColection(){
    const { products } = useProductStore();
    
    return (
        <div className="grid grid-cols-2 places-item-center bg-white dark:bg-slate-700 gap-10 w-full min-h-[60vh] py-8 px-10 animate-appearButton">
            {products?.length ? (
                <>
                    <img src={products[0]?.images[0]?.imageName} alt="product_image" className="w-full xs:h-[500px] lg:h-[500px] rounded object-cover px-20" />
                    <div className="flex flex-col justify-center gap-8 w-full">
                        <h1 className="text-4xl font-bold dark:text-white">Nueva colección</h1>
                        <p className="text-black dark:text-white">Descubre la nueva colección de Sen Íntimo, diseñada para mejorar tu experiencia y brindar mayor control. Con su fórmula especializada Ejaculation Delay, este lubricante íntimo ofrece un efecto prolongador para maximizar el placer y la satisfacción.</p> 
                        <h2 className="text-lg font-bold dark:text-white">Beneficios claves:</h2>
                        <ul className="list-disc pl-5 space-y-4 dark:text-white">
                            <li>Retrasa la eyaculación para encuentros más duraderos.</li>
                            <li>Textura suave y sedosa para una sensación placentera.</li>
                            <li>Fórmula de alta calidad, segura para la piel.</li>  
                        </ul>
                        <button className="bg-[#8941ff] text-white px-4 py-2 rounded w-1/4 max-w-[200px] font-bold" onClick={()=> window.location.href = `/${products[0].category}/${products[0].name}_${products[0].id}`}>Descubrir colección</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="animate-pulse px-20">
                        <div className="bg-gray-200 w-full h-[500px] rounded"></div>
                    </div>
                    <div className="flex flex-col justify-center gap-8 w-full animate-pulse">
                        <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="space-y-4 pl-5">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </>
            )}
        </div>
    )
}