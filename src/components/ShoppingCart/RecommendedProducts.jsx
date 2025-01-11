
import ItemsCarousel from "../itemscarousel";
export default function RecommendedProducts() {
  return (
    <div className="bg-white flex flex-col gap-4 p-2 rounded xl:max-w-[400px]">
      <span className=" text-center text-lg p-4 pb-1 border-b-[1px]">Productos recomendados</span>
      <div className="flex xs:flex-row xl:flex-col">
        <ItemsCarousel items={[1,2,3,4]} />
      </div>
      
    </div>
  );
}
