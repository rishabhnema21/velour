import Hero from '@/components/sections/home/Hero'
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = await auth();
  if (userId) redirect("/my-library");
  return (
    <div className='bg-[#111] min-h-screen w-full pt-20 overflow-hidden'>
      <Hero />
      {/* <Features /> */}
    </div>
  )
}

export default Home
