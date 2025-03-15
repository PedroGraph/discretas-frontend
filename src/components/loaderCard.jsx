

export default function LoaderCard({ cards, listOrGrid }) {
    return (
      <main className="flex flex-col gap-4 w-full">
        {Array.from({ length: cards }, (_, i) => i + 1).map((card, index) => (
          <div
            key={`${index}`}
            className={`flex gap-4 bg-white border-[1px] border-gray-300 dark:border-none dark:bg-slate-700 rounded p-2 w-full`}
          >
            <div className={`h-[150px] w-[150px] bg-slate-300 dark:bg-slate-500 animate-pulse rounded`} />
            <div className="flex flex-col gap-4">
                <div className={`h-[20px] w-[200px] bg-gray-300 dark:bg-slate-500 animate-pulse rounded`} />
                <div className={`h-[20px] w-[200px] bg-gray-300 dark:bg-slate-500 animate-pulse rounded`} />
                <div className={`h-[20px] w-[200px] bg-gray-300 dark:bg-slate-500 animate-pulse rounded`} />
                <div className={`h-[20px] w-[200px] bg-gray-300 dark:bg-slate-500 animate-pulse rounded`} />
            </div>
          </div>
        ))}
      </main>
    );
}

LoaderCard.propTypes = {
    cards: Number
}