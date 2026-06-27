"use client";

import QuoteSkeleton from "@/components/highlights/HighlightSkeleton";
import Quote from "@/components/highlights/Quote";
import { useFetchHighlight } from "@/hooks/useHighlight";
import { FaQuoteRight } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";

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
            <div
              className="relative mt-4 p-8 pb-0 md:p-12 md:p-0 rounded-xl border max-w-2xl mx-auto overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              style={{
                backgroundColor: "var(--velour-surface-secondary)",
                borderColor: "var(--velour-border)",
                backgroundImage: "linear-gradient(var(--velour-border-light) 1px, transparent 1px)",
                backgroundSize: "100% 28px",
              }}
            >
             
              <div 
                className="absolute top-0 bottom-0 left-10 w-[1px] md:left-14" 
                style={{ backgroundColor: "rgba(239, 68, 68, 0.15)" }} 
              />
              
              <div className="pl-6 md:pl-10 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <RiDoubleQuotesL className="text-4xl text-neutral-300" />
                  <div 
                    className="h-[1px] flex-1" 
                    style={{ backgroundColor: "var(--velour-border)" }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold font-[serif] tracking-tight text-neutral-800 mb-4">
                  An unwritten margin.
                </h3>
                
                <p className="text-base leading-7 text-neutral-600 mb-8 max-w-lg font-[serif] italic">
                  "A book is not just a container for ideas; it is a catalyst. What we preserve in the margins represents the quiet shifts in our own minds."
                </p>
                
                <p className="text-sm leading-relaxed text-neutral-500 mb-10 max-w-md">
                  You haven't saved any highlights yet. When you read something that changes your perspective, save it here. These quotes act as seeds for the AI-powered reflections layer.
                </p>

                <div 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t font-mono text-[10px] text-neutral-400 uppercase tracking-widest"
                  style={{ borderColor: "var(--velour-border)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                    </span>
                    <span className="font-semibold text-neutral-500">Velour Compiler Active</span>
                  </div>
                  <div>
                    <span>status: awaiting ingestion / 0 seeds loaded</span>
                  </div>
                </div>
              </div>
            </div>
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
