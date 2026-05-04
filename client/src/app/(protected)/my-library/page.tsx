import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="px-1 md:px-8 pt-20 min-h-screen font-[urbanist]">
      <div className="flex">
        <div className="w-3/4">
          <div className="flex justify-between relative bg-[#1a1919] w-full items-center h-50">
            {/* <Image className='rounded-xl w-full h-full object-cover' src="/mesh-gradient.svg" height={200} width={300} alt='image' /> */}
            <div className="text-white text-shadow-xs px-4 py-2">
              <h2 className="text-6xl font-semibold">Continue Reading</h2>
              <div className="mt-3 flex justify-between items-end">
                <p className="w-[60%]">
                  Lorem ipsum doiores ratione repellendus corrupti perspiciatis,
                  vel eos.
                </p>
                <button className="hover:bg-[#2f2f2f]/50 transtion-all duration-200 ease-in cursor-pointer px-5 py-1 w-[30%] rounded-md">
                  &rarr;
                </button>
              </div>
            </div>
            <Image
              src="/book.jfif"
              height={500}
              width={500}
              alt="book"
              className="h-full object- mask-l-from-5% object-cover"
            />
          </div>

          <div className="w-full min-h-[55vh] text-neutral-200 bg-[#1a1a1a] mt-3 flex flex-col justify-center items-center">
            <p>No Custom Shelf Present</p>
            <button>Create Custom Shelf</button>
          </div>
        </div>

        <div className="flex-1 min-h-[86vh] bg-[#1a1a1a] ml-3"></div>
      </div>

      <div className="grid grid-cols-3"></div>
    </div>
  );
};

export default page;
