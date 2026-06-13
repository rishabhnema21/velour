import { GoPlus } from "react-icons/go";

type CreateShelfCardProps = {
  onClick?: () => void;
};

const CreateShelfCard = ({ onClick }: CreateShelfCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: "var(--velour-surface-secondary)",
        borderColor: "var(--velour-border-light)",
        color: "var(--velour-text)",
      }}
      className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed p-5 text-center transition sm:min-h-47.5"
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.backgroundColor = "var(--velour-surface-tertiary)";
        target.style.borderColor = "var(--velour-shelf-reading)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLButtonElement;
        target.style.backgroundColor = "var(--velour-surface-secondary)";
        target.style.borderColor = "var(--velour-border-light)";
      }}
    >
      <GoPlus
        className="h-10 w-10"
        style={{ color: "var(--velour-text-muted)" }}
      />
      <span className="mt-8 font-semibold">Create Shelf</span>
      <span
        className="mt-1 text-sm"
        style={{ color: "var(--velour-text-muted)" }}
      >
        Build your collection
      </span>
    </button>
  );
};

export default CreateShelfCard;
