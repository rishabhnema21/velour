import { useMoveBooks } from "@/hooks/library";
import { useLibraryOverview } from "@/hooks/useLibraryOverview";
import { useMoveModalStore } from "@/store/MoveModalStore";
import { Check } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../modal";

const MoveBookModal = () => {
  const { isOpen, userBookId, currentShelfIds, closeModal } =
    useMoveModalStore();
  const { isLoading, overview } = useLibraryOverview();
  const { isPending, mutate } = useMoveBooks();

  const handleSelect = (shelfId: string) => {
    if (!userBookId) return;

    mutate(
      { userBookId, shelfId },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <ModalContent className="w-full max-w-3xl bg-neutral-200">
        <ModalHeader>
          <ModalTitle>
            <span className="text-neutral-800">
              Move Books from One Shelf to Another
            </span>
          </ModalTitle>
          <ModalDescription>
            <span className="text-neutral-700">
              Choose where this book belongs.
            </span>
          </ModalDescription>
        </ModalHeader>

        <ModalBody>
          {isLoading ? (
            <p
              className="text-sm"
              style={{ color: "var(--velour-text-muted)" }}
            >
              Loading shelves...
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "var(--velour-text-muted)" }}
                >
                  Move to Shelf
                </p>
                <div className="space-y-0">
                  {overview.defaultShelves.map((shelf) => {
                    const isCurrent = currentShelfIds.includes(shelf.id);
                    return (
                      <button
                        key={shelf.id}
                        disabled={isPending || isCurrent}
                        onClick={() => handleSelect(shelf.id)}
                        className="flex w-full items-center cursor-pointer hover:bg-neutral-200 justify-between rounded-md px-3 py-2 text-sm transition disabled:cursor-default"
                        style={{
                          color: "var(--velour-text)",
                          backgroundColor: isCurrent
                            ? "var(--velour-surface-tertiary)"
                            : "transparent",
                        }}
                      >
                        {shelf.name}
                        {isCurrent && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <hr style={{ borderColor: "var(--velour-border)" }} />

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "var(--velour-text-muted)" }}
                >
                  Add to Shelf
                </p>
                {overview.customShelves.length === 0 ? (
                  <p
                    className="text-sm"
                    style={{ color: "var(--velour-text-muted)" }}
                  >
                    No custom shelves yet.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {overview.customShelves.map((shelf) => {
                      const isCurrent = currentShelfIds.includes(shelf.id);
                      return (
                        <button
                          key={shelf.id}
                          disabled={isPending}
                          onClick={() => handleSelect(shelf.id)}
                          className="flex w-full items-center cursor-pointer text-neutral-800 hover:bg-neutral-200 justify-between rounded-md px-3 py-2 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {shelf.name}
                          {isCurrent && <Check size={16} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter className="flex justify-end gap-2">
          <ModalClose asChild>
            <button
              type="button"
              className="rounded-sm text-neutral-200 bg-neutral-800 border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MoveBookModal;
