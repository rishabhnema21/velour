import { useEffect, useState } from "react";

import { useHighlightModalStore } from "@/store/HighlightModalStore";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddHighlight, useEditHighlight } from "@/hooks/useHighlight";

type HighlightForm = {
  quote: string;
  note?: string;
  pageNumber?: string;
};

const initialForm: HighlightForm = {
  quote: "",
  note: "",
  pageNumber: "",
};

const HighlightModal = () => {
  const { isOpen, mode, userBookId, editingHighlight, closeModal } = useHighlightModalStore();
  const { isPending: isAdding, mutate: addMutate } = useAddHighlight();
  const { isPending: isEditing, mutate: editMutate } = useEditHighlight();

  const isPending = isAdding || isEditing;

  const [form, setForm] = useState<HighlightForm>(initialForm);

  useEffect(() => {
    if (mode === "edit" && editingHighlight) {
      setForm({
        quote: editingHighlight.quote,
        note: editingHighlight.note ?? "",
        pageNumber: editingHighlight.pageNumber?.toString() ?? "",
      });
    } else if (isOpen) {
      setForm(initialForm);
    }
  }, [mode, editingHighlight, isOpen]);

  const updateField = (field: keyof HighlightForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setForm(initialForm);
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.quote.trim()) return;

    const note = form.note?.trim() || undefined;
    const pageNumber = form.pageNumber ? Number(form.pageNumber) : undefined;

    if (mode === "edit" && editingHighlight) {
      editMutate(
        {
          highlightId: editingHighlight.id,
          quote: form.quote.trim(),
          note,
          pageNumber,
        },
        { onSuccess: handleClose },
      );
    } else {
      if (!userBookId) return;
      addMutate(
        { userBookId, quote: form.quote.trim(), note, pageNumber },
        { onSuccess: handleClose },
      );
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <ModalContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-row items-center justify-between">
            <ModalTitle className="text-neutral-800">
              {mode === "edit" ? "Edit Highlight" : "Create Highlight"}
            </ModalTitle>
          </ModalHeader>

          <ModalBody className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quote</label>

              <textarea
                rows={5}
                value={form.quote}
                onChange={(e) => updateField("quote", e.target.value)}
                disabled={isPending}
                placeholder="Enter highlighted quote..."
                className="w-full rounded-md resize-none border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Note</label>

              <textarea
                rows={4}
                value={form.note}
                disabled={isPending}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="Add a note..."
                className="w-full rounded-md resize-none border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Page Number</label>

              <Input
                type="number"
                min={1}
                disabled={isPending}
                value={form.pageNumber}
                onChange={(e) => updateField("pageNumber", e.target.value)}
                placeholder="Page number"
              />
            </div>
          </ModalBody>

          <ModalFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default HighlightModal;