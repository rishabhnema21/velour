const CustomShelfSkeleton = () => {
  return (
    <div
      className="min-h-42 animate-pulse rounded-lg border p-4 sm:min-h-47.5 sm:p-5"
      style={{
        backgroundColor: "var(--velour-surface-secondary)",
        borderColor: "var(--velour-border)",
      }}
    >
      <div className="h-20 rounded-md bg-white/10 sm:h-24" />
      <div className="mt-4 h-4 w-2/3 rounded bg-white/10" />
      <div className="mt-3 h-3 w-1/3 rounded bg-white/8" />
    </div>
  );
};

export default CustomShelfSkeleton;
