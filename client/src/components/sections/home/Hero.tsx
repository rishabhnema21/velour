import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="h-screen pt-20">
      <div className="px-4">
        <div className="flex justify-between items-end">
          <div className="font-[urbanist] px-4 py-4 text-6xl">
            <h1 className="">Read more than words</h1>
            <h1 className="italic font-light">Discover thoughts that stick.</h1>
          </div>
          <div className="max-w-xs text-right text-sm  px-4 py-4 text-gray-800 font-light">
            <p>
              A quiet place where stories grow beyond the page, where every
              thought you gather shapes your own unique journey through words
              and ideas.
            </p>
          </div>
        </div>
        <div className="px-4 pt-3 flex gap-5 items-end">
          <Image
            src="/heroBg.jpg"
            alt="image"
            width={595}
            height={20}
            className="rounded-md contrast-125"
          />
          <Image
            src="/image.jfif"
            alt="image"
            width={750}
            height={20}
            className="rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
