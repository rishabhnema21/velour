import { Highlight } from "@/lib/apifetch/highlight";

type QuoteProps = {
  highlight: Highlight;
};

const Quote = ({ highlight }: QuoteProps) => {
  return (
    <div className="rounded-sm break-inside-avoid border-l-4 border-l-neutral-800 border border-neutral-300 px-5 py-4 w-full">
      <blockquote className="font-[serif] italic text-neutral-800 text-xl">
        "{highlight.quote}"
      </blockquote>

      <div className="my-2 bg-neutral-100 p-2 rounded-sm">
        <p className="text-neutral-500 text-sm">
          {highlight.note}
        </p>
      </div>
      <div className="flex justify-between mt-3 items-end">
        <div>
          <h3 className="font-semibold text-neutral-800">
            {highlight.userBook?.book.title}
          </h3>
          <h4 className="text-sm font-semibold text-neutral-600">
            {highlight.userBook?.book?.authors?.join(", ")}
          </h4>
        </div>
        <div>
          {highlight.pageNumber && (
          <span className="text-xs italic font-[serif] text-neutral-400">
            p. {highlight.pageNumber}
          </span>
        )}
        </div>
      </div>
    </div>
  );
};

export default Quote;
