'use client'

import { useBookDrawerStore } from "@/store/BookDrawerStore";
import Image from "next/image";
import {useRouter} from "next/navigation";
type BookCardProps = {
    id: string;
    cover: string;
    title: string;
    authors: string[];
    description: string | null;
};

const BookCard = ({id, cover, title, authors, description}: BookCardProps) => {

  const router = useRouter();
  const { openDrawer } = useBookDrawerStore();
    return (
        <div onClick={() => openDrawer(id)} className='bg-white rounded-md  overflow-hidden'>
              <div className='h-62 bg-[#f5f5f5]'>
                <Image
                  src={cover}
                  alt={title}
                  height={1000}
                  width={1000}
                  className='h-full w-full object-cover'
                  loading='eager'
                />
              </div>
              <div className='p-4'>
                <h2 className='text-lg text-neutral-800 font-semibold mb-1'>{title}</h2>
                {authors && authors.length > 0 && (
                  <p className='text-sm text-[#4a4a4a] mb-2'>
                    {authors.join(", ")}
                  </p>
                )}
                {description && (
                  <p className='text-sm text-[#4a4a4a] line-clamp-3'>
                    {description}
                  </p>
                )}
              </div>
            </div>
    )
}

export default BookCard;