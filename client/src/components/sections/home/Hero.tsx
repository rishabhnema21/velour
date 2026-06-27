"use client";

import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-screen h-[85vh] pb-16 pt-9">
      <div className="px-1 md:px-4 h-full">
        <div className="flex flex-col h-full md:flex-row justify-between items-center">
          <div className="font-[urbanist] h-full w-full px-4">
            <div className=" tracking-tight pt-9 pb-5 md:py-6 text-5xl font-semibold md:text-6xl">
              <h1 className="text-neutral-800 leading-14 capitalize">
                The person you <span className="text-neutral-600">Become</span>{" "}
                starts with what you{" "}
                <span className="text-neutral-600">read</span>.
              </h1>
              <h2 className="italic leading-12 w-[90%] font-extralight font-[serif] text-5xl mt-2 tracking-tighter text-neutral-700">
                Build a library of insights, not just a collection of books.
              </h2>
            </div>

            <div className="tracking-normal mt-5">
              <button className="bg-neutral-800 px-8 py-2 text-neutral-200 rounded-sm">
                Watch Demo
              </button>
            </div>

            <div className="text-xl mt-5">
              For curious readers, lifelong learners, and thoughtful minds.
            </div>
          </div>
          <div>
            <div className="relative select-none">
              <div className="h-30 w-90 absolute bg-[#fdfcfb] -top-7 right-8 mask-l-from-80% mask-b-from-30%" />
              <div className="h-20 w-full absolute bg-[#fdfcfb] left-[30%] -bottom-6 mask-t-from-50% " />
              <Image
                src="/landingpage1.png"
                alt="image"
                width={2000}
                height={1980}
                loading="eager"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
