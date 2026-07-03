"use client";

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from "@/components/modal";
import { useDeleteShelf } from "@/hooks/useShelfWithBooks";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  shelfId: string;
  shelfName?: string;
};

export default function DeleteShelfModal({
  shelfId,
  shelfName,
}: Props) {
    const router = useRouter();
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteShelf();

  const handleDelete = () => {
    deleteMutation.mutate(shelfId, {
      onSuccess: () => {
        setOpen(false);
        router.push("/my-library");
      },
    });
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm transition"
          style={{
            borderColor: "var(--velour-border)",
            color: "var(--velour-text-muted)",
          }}
        >
          <Trash className="h-4 w-4" />
        </button>
      </ModalTrigger>


      <ModalContent className="max-w-sm w-[20vw]">
        <ModalHeader>
          <ModalTitle><span className="text-neutral-800 font-[urbanist]">Delete Shelf</span></ModalTitle>
          <ModalDescription>
            <span className="font-medium text-neutral-800 font-[urbanist]">Are you sure you want to delete{" "}
            <span className="">
              {shelfName || "this shelf"}
            </span>
            ? This action cannot be undone.</span>
          </ModalDescription>
        </ModalHeader>


        <ModalFooter className="flex justify-end gap-2">
          <ModalClose asChild>
            <button
              type="button"
              className="rounded-sm border px-3 py-2 text-sm"
              style={{
                borderColor: "var(--velour-border)",
                color: "var(--velour-text-muted)",
              }}
            >
              Cancel
            </button>
          </ModalClose>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-md px-3 py-2 text-sm text-white bg-neutral-800 transition disabled:opacity-50"
          >
            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}