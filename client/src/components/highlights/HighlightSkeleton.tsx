const skeletonCards = [
  "h-[260px]",
  "h-[340px]",
  "h-[220px]",
  "h-[400px]",
  "h-[300px]",
  "h-[250px]",
  "h-[360px]",
  "h-[280px]",
];

const QuoteSkeleton = () => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-3">
      {skeletonCards.map((height, index) => (
        <div
          key={index}
          className={`
            mb-3 inline-block w-full break-inside-avoid
            rounded-sm border border-neutral-200
            border-l-4 border-l-neutral-200
            bg-white px-5 py-4
            animate-pulse
            ${height}
          `}
        >
        
          <div className="space-y-3">
            <div className="h-5 w-full rounded bg-neutral-200" />
            <div className="h-5 w-[90%] rounded bg-neutral-200" />
            <div className="h-5 w-[70%] rounded bg-neutral-200" />
          </div>

         
          <div className="mt-5 rounded bg-neutral-100 p-3 space-y-2">
            <div className="h-3 w-full rounded bg-neutral-200" />
            <div className="h-3 w-[85%] rounded bg-neutral-200" />
            <div className="h-3 w-[60%] rounded bg-neutral-200" />
          </div>

        
          <div className="absolute" />

          <div className="mt-6 space-y-2">
            <div className="h-4 w-40 rounded bg-neutral-200" />
            <div className="h-3 w-24 rounded bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteSkeleton;