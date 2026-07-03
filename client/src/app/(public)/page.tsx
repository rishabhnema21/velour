import Hero from '@/components/sections/home/Hero';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = await auth();
  if (userId) redirect("/my-library");
  return (
    <div className='bg-[#fdfcfb] min-h-screen w-full pt-20 overflow-hidden'>
      <Hero />
      {/* <Features /> */}
      <div className='py-5'>
        <h4 className='text-center italic font-[serif] text-xl'>Work in Progress</h4>
      </div>
    </div>
  )
}

export default Home
