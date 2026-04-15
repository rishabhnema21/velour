import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="w-screen pb-16">
      <div className="px-1 md:px-4">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="font-[urbanist] w-full px-4 pt-9 pb-5 md:py-4 text-5xl md:text-6xl">
            <h1 className="text-neutral-200">Read more than words</h1>
            <h1 className="italic font-light text-neutral-200">Discover thoughts that stick.</h1>
          </div>
          <div className="max-w-xs text-right text-sm  px-4 py-1 md:py-4 text-gray-400 font-light">
            <p>
              A quiet place where stories grow beyond the page, where every
              thought you gather shapes your own unique journey through words
              and ideas.
            </p>
          </div>
        </div>
        <div className="px-4 pt-3 flex gap-5 items-end">
          <div className="h-100 w-1/2">
            <Image
            src="/heroBg.jpg"
            alt="image"
            width={595}
            height={20}
            className="rounded-md contrast-125 h-full w-full"
          />
          </div>
          <div className="h-100 w-1/2">
            <Image
            src="/heroImage.jpg"
            alt="image"
            width={750}
            height={20}
            className="rounded-md hidden md:block w-full h-full object-cover"
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
