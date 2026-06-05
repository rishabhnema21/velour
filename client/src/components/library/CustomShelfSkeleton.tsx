const CustomShelfSkeleton = () => {
  return (
    <div className="min-h-42 animate-pulse rounded-xl border border-white/8 bg-[#0d1012]/85 p-4 sm:min-h-47.5 sm:p-5">
      <div className="h-20 rounded-md bg-white/10 sm:h-24" />
      <div className="mt-4 h-4 w-2/3 rounded bg-white/10" />
      <div className="mt-3 h-3 w-1/3 rounded bg-white/8" />
    </div>
  );
};

export default CustomShelfSkeleton;
