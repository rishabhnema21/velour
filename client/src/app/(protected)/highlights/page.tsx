"use client";

import QuoteSkeleton from "@/components/highlights/HighlightSkeleton";
import Quote from "@/components/highlights/Quote";
import { useFetchHighlight } from "@/hooks/useHighlight";
import { FaQuoteRight } from "react-icons/fa";

const page = () => {
  const { data: quotes, isLoading } = useFetchHighlight();

  return (
    <main>
      <div className="pb-2 md:pb-10">
        <div className="relative py-2 flex justify-between">
          <div className="px-3 border-b flex-1 border-neutral-300">
            <h4 className="text-neutral-600 inline-block px-3 py-2 rounded-sm font-[serif] tracking-wide">
              Words Worth Keeping
            </h4>
            <h1 className="text-5xl text-neutral-800 font-semibold">
              {" "}
              My Highlights{" "}
            </h1>
          </div>

          <div className="text-end relative w-[30vw]">
            <div>
              <p className="text-xl text-neutral-800 font-semibold">
                Coming into contact with a good book and possessing it, is
                indeed an everlasting enrichment of life.
              </p>
              <p className="text-lg italic text-neutral-800 font-[serif]">
                — Dr. APJ Abdul Kalam
              </p>
            </div>
            <FaQuoteRight className="text-9xl absolute top-0 right-0 opacity-15" />
          </div>
        </div>

        <div className="mt-4 ml-3">
          {isLoading && <QuoteSkeleton />}
          {!isLoading && quotes?.length === 0 && (
            <p className="text-sm text-neutral-500">
              No highlights yet. Save a line that moves you.
            </p>
          )}
          {!isLoading && quotes && quotes.length > 0 && (
            <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-3 space-y-3">
              {quotes.map((highlight) => (
                <Quote key={highlight.id} highlight={highlight} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
