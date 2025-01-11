

export default function LoaderCard({ cards }) {
    return (
      <>
        {Array.from({ length: cards }, (_, i) => i + 1).map((card, index) => (
          <div
            key={`${index}`}
            className={`flex gap-4 bg-white border-[1px] border-gray-300 rounded p-2 w-full`}
          >
            <div className={`h-[150px] w-[150px] bg-gray-300 animate-pulse rounded`} />
            <div className="flex flex-col gap-4">
                <div className={`h-[20px] w-[200px] bg-gray-300 animate-pulse rounded`} />
                <div className={`h-[20px] w-[200px] bg-gray-300 animate-pulse rounded`} />
                <div className={`h-[20px] w-[200px] bg-gray-300 animate-pulse rounded`} />
                <div className={`h-[20px] w-[200px] bg-gray-300 animate-pulse rounded`} />
            </div>
          </div>
        ))}
      </>
    );
}

LoaderCard.propTypes = {
    cards: Number
}