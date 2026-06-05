import { GoPlus } from "react-icons/go";

type CreateShelfCardProps = {
  onClick?: () => void;
};

const CreateShelfCard = ({ onClick }: CreateShelfCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-white/25 bg-[#0b0d0f]/70 p-5 text-center transition hover:border-[#f0c978]/70 hover:bg-white/5 sm:min-h-47.5"
    >
      <GoPlus className="h-10 w-10 text-neutral-300" />
      <span className="mt-8 font-semibold text-white">Create Shelf</span>
      <span className="mt-1 text-sm text-neutral-500">
        Build your collection
      </span>
    </button>
  );
};

export default CreateShelfCard;
