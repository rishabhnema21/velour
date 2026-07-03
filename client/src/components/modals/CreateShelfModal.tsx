"use client";

import { useToast } from "@/components/notifications/ToastProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImageToCloudinary, validateFile } from "@/lib/upload";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type CreateShelfModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateShelfModal({
  open,
  onOpenChange,
}: CreateShelfModalProps) {
  const { getToken } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setPreviewUrl(null);
    setIsDragging(false);
    setLoading(false);
    setError(null);
    setFileError(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  // cleanup object URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (selected: File) => {
    const validationError = validateFile(selected);
    if (validationError) {
      setFileError(validationError);
      return;
    }
    setFileError(null);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFileSelect(dropped);
  }, []);

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      let coverImage: string | undefined;

      if (file) {
        coverImage = await uploadImageToCloudinary(file, token!);
      }

      const res = await axios.post(
        `${API_BASE}/api/shelves`,
        { name, coverImage },
        { headers: { Authorization: `Bearer ${token}` } },
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

        console.log(err);

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
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => !loading && handleOpenChange(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] border grid md:grid-cols-[1fr_420px]"
            style={{
              background: "var(--velour-surface)",
              borderColor: "var(--velour-border-light)",
            }}
          >
            {/* Close */}
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOpenChange(false)}
              className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left — Form */}
            <div className="p-8 md:p-12">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 font-[urbanist]"
              >
                <div className="space-y-3">
                  <h2
                    className="text-4xl font-bold"
                    style={{ color: "var(--velour-ink)" }}
                  >
                    Build a new shelf.
                  </h2>
                  <p
                    className="max-w-md text-[15px] leading-7"
                    style={{ color: "var(--velour-text-muted)" }}
                  >
                    Give your collection a place to grow. Organize stories,
                    memories, and adventures into a shelf that feels uniquely
                    yours.
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-3">
                  <Label
                    htmlFor="shelf-title"
                    className="text-xs uppercase tracking-[0.25em]"
                    style={{ color: "var(--velour-text-muted)" }}
                  >
                    Shelf Title
                  </Label>
                  <Input
                    id="shelf-title"
                    value={title}
                    disabled={loading}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Midnight Melancholy..."
                    className="h-12 rounded-xl border px-4"
                    style={{
                      background: "var(--velour-surface-tertiary)",
                      borderColor: "var(--velour-border-light)",
                      color: "var(--velour-text)",
                    }}
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

                {/* Cover Upload */}
                <div className="space-y-3">
                  <Label
                    className="text-xs uppercase tracking-[0.25em]"
                    style={{ color: "var(--velour-text-muted)" }}
                  >
                    Shelf Cover
                  </Label>

                  {!file ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition"
                      style={{
                        borderColor: isDragging
                          ? "var(--velour-accent)"
                          : "var(--velour-border)",
                        background: isDragging
                          ? "var(--velour-surface-secondary)"
                          : "var(--velour-surface-tertiary)",
                      }}
                    >
                      <UploadCloud
                        size={32}
                        style={{
                          color: isDragging
                            ? "var(--velour-accent)"
                            : "var(--velour-text-muted)",
                        }}
                      />
                      <p
                        className="mt-3 text-sm"
                        style={{ color: "var(--velour-text-muted)" }}
                      >
                        {isDragging
                          ? "Drop it here"
                          : "Drag & drop or click to browse"}
                      </p>
                      <span
                        className="mt-1 text-xs"
                        style={{ color: "var(--velour-text-muted)" }}
                      >
                        PNG, JPG, WEBP · max 5 MB
                      </span>
                    </div>
                  ) : (
                    <div className="relative h-44 overflow-hidden rounded-2xl">
                      <Image
                        src={previewUrl!}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        disabled={loading}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {fileError && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--velour-shelf-dnf)" }}
                    >
                      {fileError}
                    </p>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    disabled={loading}
                    onClick={() => handleOpenChange(false)}
                    className="rounded-xl px-6 h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl px-6 h-11"
                    style={{
                      background: "var(--velour-accent)",
                      color: "white",
                    }}
                  >
                    {loading
                      ? file
                        ? "Uploading..."
                        : "Creating..."
                      : "Create Shelf"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right — Live Preview */}
            <div
              className="relative hidden overflow-hidden md:flex flex-col items-center justify-center gap-6 p-10"
              style={{
                background:
                  "linear-gradient(135deg,var(--velour-surface-secondary),var(--velour-surface-tertiary))",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.25em]"
                style={{ color: "var(--velour-text-muted)" }}
              >
                Preview
              </p>

              {/* mirrors ShelfCard exactly */}
              <div
                className="w-52 h-[40vh] relative rounded-sm border border-neutral-200 p-2 shadow-md shadow-black/10 overflow-hidden"
                style={{ background: "var(--velour-surface-secondary)" }}
              >
                {/* full-bleed cover */}
                <div className="relative h-full w-full overflow-hidden rounded-sm">
                  {previewUrl ? (
                    // plain img tag — blob URLs don't work with Next.js Image
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    // default placeholder — same as ShelfCard's /placeholder.webp fallback
                    <img
                      src="/placeholder.webp"
                      alt="placeholder"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* book count — top right, same as ShelfCard */}
                <div className="absolute top-2 right-4">
                  <p className="mt-1 text-sm text-neutral-300">0 books</p>
                </div>

                {/* shelf name — bottom left, same as ShelfCard */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-semibold text-shadow-md text-3xl w-[95%] text-white">
                    {title.trim() || "Shelf Name"}
                  </h3>
                </div>
              </div>

              <p
                className="text-xs text-center max-w-50"
                style={{ color: "var(--velour-text-muted)" }}
              >
                This is how your shelf will appear in your library.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
