"use client";

import { Modal, ModalContent } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/notifications/ToastProvider";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type createShelfModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateShelfModal({
  open,
  onOpenChange,
}: createShelfModalProps) {
  const { getToken } = useAuth();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const resetForm = () => {
    setTitle("");
    setError(null);
    setLoading(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = title.trim();

    if (name.length < 2) {
      setError("Shelf name must be at least 2 characters.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const res = await axios.post(
        `${API_BASE}/api/shelves`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast({
        type: "success",
        title: "Shelf created",
        message: res.data.message || `${name} is ready for books.`,
      });

      queryClient.invalidateQueries({ queryKey: ["library", "overview"] });
      handleOpenChange(false);
    } catch (err) {
      const message = axios.isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message || err.message
        : "Unable to create shelf.";

      setError(message);
      showToast({
        type: "error",
        title: "Could not create shelf",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <ModalContent
        className="sm:max-w-[60vw] sm:h-[70vh] overflow-hidden p-0 rounded-lg shadow-lg"
        style={{
          backgroundColor: "var(--velour-surface-secondary)",
          borderColor: "var(--velour-border)",
        }}
      >
        <div className="flex flex-col-reverse md:flex-row w-full h-full">
          <div
            className="w-full md:w-[45%] px-4 pb-4 md:p-10 flex flex-col justify-between border-r relative z-10"
            style={{
              backgroundColor: "var(--velour-surface)",
              borderColor: "var(--velour-border)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 md:space-y-3">
                <h2
                  className="text-4xl font-bold tracking-wide leading-tight"
                  style={{ color: "var(--velour-ink)" }}
                >
                  Build a new shelf.
                </h2>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--velour-text-muted)" }}
                >
                  Give your collection a place to grow.
                </p>
              </div>

              <div className="space-y-4 md:space-y-2.5 my-auto">
                <Label
                  htmlFor="shelf-title"
                  className="block text-[12px] font-semibold uppercase tracking-widest bg-transparent border-0 p-0"
                  style={{ color: "var(--velour-text-muted)" }}
                >
                  Shelf Title
                </Label>
                <Input
                  id="shelf-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Midnight Melancholy, Runaway Fantasies..."
                  className="w-full border rounded-lg px-4 py-3.5 text-sm transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: "var(--velour-surface-tertiary)",
                    borderColor: "var(--velour-border-light)",
                    color: "var(--velour-text)",
                  }}
                  disabled={loading}
                />
                {error && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--velour-shelf-dnf)" }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end my-4 md:my-0 space-x-5">
                <Button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={loading}
                  className="text-xs font-sans font-normal transition-colors duration-200 tracking-wide px-6 cursor-pointer py-3 h-auto"
                  style={{ color: "var(--velour-text-muted)" }}
                >
                  Abandon
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="font-sans font-medium text-xs px-6 py-3 rounded-md shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer tracking-wide h-auto"
                  style={{
                    backgroundColor: "var(--velour-accent)",
                    color: "var(--velour-surface)",
                  }}
                >
                  {loading ? "Creating..." : "Create Shelf"}
                </Button>
              </div>
            </form>
          </div>

          <div
            className="md:w-[55%] h-32 md:h-full w-full relative flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: "var(--velour-surface-secondary)",
            }}
          >
            <div className="w-full h-full p-4 rounded-sm flex items-center justify-center relative z-10 opacity-80 hover:opacity-100 transition-opacity duration-700 ease-out">
              <Image
                src="/create_shelf.jpg"
                alt="Bibliophilic"
                width={450}
                height={450}
                className="w-full rounded-sm h-auto object-cover max-h-[85%] mix-blend-multiply opacity-50 select-none pointer-events-none"
              />
            </div>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className="absolute top-6 right-6 transition-colors duration-200 z-20"
              style={{ color: "var(--velour-text-muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--velour-text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--velour-text-muted)";
              }}
              aria-label="Close modal"
            >
              <X />
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
