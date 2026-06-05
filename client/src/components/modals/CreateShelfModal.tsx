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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type createShelfModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void | Promise<void>;
};

export function CreateShelfModal({
  open,
  onOpenChange,
  onCreated,
}: createShelfModalProps) {
  const { getToken } = useAuth();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setError(null);
    setLoading(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

      await onCreated?.();
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
      <ModalContent className="sm:max-w-[60vw] sm:h-[70vh] overflow-hidden p-0 bg-[#0E1013] border border-white/5 rounded-2xl shadow-2xl shadow-black/80">
        <div className="flex flex-col-reverse md:flex-row w-full h-full">
          <div className="w-full md:w-[45%] px-4 pb-4 md:p-10 flex flex-col justify-between border-r border-white/5 bg-gradient-to-b from-[#121519] to-[#0E1013] relative z-10">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 md:space-y-3">
                <h2 className="text-4xl font-bold text-[#F5F2EB] tracking-wide leading-tight">
                  Build a new shelf.
                </h2>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Give your collection a place to grow.
                </p>
              </div>

              <div className="space-y-4 md:space-y-2.5 my-auto">
                <Label
                  htmlFor="shelf-title"
                  className="block text-[12px] font-semibold text-zinc-500 uppercase tracking-widest bg-transparent border-0 p-0"
                >
                  Shelf Title
                </Label>
                <Input
                  id="shelf-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Midnight Melancholy, Runaway Fantasies..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-zinc-600 transition-all duration-300 outline-none"
                  disabled={loading}
                />
                {error && <p className="text-sm text-red-300">{error}</p>}
              </div>

              <div className="flex items-center justify-end my-4 md:my-0 space-x-5">
                <Button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={loading}
                  className="text-xs font-sans font-normal text-zinc-500 hover:text-zinc-300 hover:bg-transparent transition-colors duration-200 tracking-wide px-6 cursor-pointer py-3 h-auto"
                >
                  Abandon
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#F5F2EB] hover:bg-[#E5E2DC] text-[#0E1013] font-sans font-medium text-xs px-6 py-3 rounded-md shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer tracking-wide h-auto"
                >
                  {loading ? "Creating..." : "Create Shelf"}
                </Button>
              </div>
            </form>
          </div>

          <div className="md:w-[55%] h-32 md:h-full w-full bg-[#0A0C0E] relative flex items-center justify-center overflow-hidden">
            <div className="w-full h-full p-4 rounded-sm flex items-center justify-center relative z-10 opacity-80 hover:opacity-100 transition-opacity duration-700 ease-out">
              <Image
                src="/create_shelf.jpg"
                alt="Bibliophilic"
                width={450}
                height={450}
                className="w-full rounded-sm h-auto object-cover max-h-[85%] mix-blend-screen opacity-65 select-none pointer-events-none"
              />
            </div>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className="absolute top-6 right-6 text-zinc-600 hover:text-zinc-400 transition-colors duration-200 z-20"
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
