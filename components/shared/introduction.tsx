import Image from 'next/image';
import React from 'react';

const Introduction = () => {
  return (
    <div className='w-full px-2 sm:px-[10%] md:px-40 py-5 md:py-10 gap-x-1.5 gap-y-10 flex flex-col items-center'>
      <span className='w-3/4 md:w-1/2 font-semibold text-xl sm:text-2xl md:text-3xl text-center'>
        How to Download{' '}
        <span className='text-[#15B37E]'>Youtube Videos for Free?</span>
      </span>

      <div className='w-[90%] md:w-full flex flex-col md:flex-row items-center justify-between gap-y-8 md:gap-0'>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <span className='h-12 w-12 md:h-14 md:w-14 font-semibold text-xl md:text-2xl text-white bg-[#14141b] rounded-[8px] flex items-center justify-center'>
            1
          </span>
          <span className='font-semibold text-lg md:text-xl text-center'>
            Enter the video link
          </span>
        </div>

        <div>
          <Image
            src='/images/dot-wave.svg'
            alt='Dot Wave'
            width={250}
            height={250}
            loading='lazy'
            unoptimized={false}
            className='hidden md:block'
          />
        </div>

        <div className='flex flex-col items-center justify-center gap-y-5'>
          <span className='h-12 w-12 md:h-14 md:w-14 font-semibold text-xl md:text-2xl text-white bg-[#14141b] rounded-[8px] flex items-center justify-center'>
            2
          </span>
          <span className='font-semibold text-lg md:text-xl text-center'>
            Choose your preferred format and quality
          </span>
        </div>

        <div>
          <Image
            src='/images/dot-wave.svg'
            alt='Dot Wave'
            width={250}
            height={250}
            loading='lazy'
            unoptimized={false}
            className='hidden md:block'
          />
        </div>

        <div className='flex flex-col items-center justify-center gap-y-5'>
          <span className='h-12 w-12 md:h-14 md:w-14 font-semibold text-xl md:text-2xl text-white bg-[#14141b] rounded-[8px] flex items-center justify-center'>
            3
          </span>
          <span className='font-semibold text-lg md:text-xl text-center'>
            Download the video
          </span>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
