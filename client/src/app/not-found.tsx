
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex font-[urbanist] items-center justify-center gap-6 bg-[#fdfcfb] px-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold tracking-tighter">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        This page doesn't exist.
      </h2>

      <p className="mt-3 max-w-md text-center text-gray-600">
        The page you're looking for may have wandered somewhere else.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-md bg-neutral-800 px-6 py-3 text-white hover:opacity-90 transition"
      >
        Return Home
      </Link>
      </div>

      <div className="h-[90vh]">
        <Image src="/not_found.png" alt="not found" height={400} width={400} />
      </div>
    </main>
  );
}