import Image from 'next/image';
import React from 'react';

const Benefits = () => {
  return (
    <div className='w-full px-2 sm:px-[10%] md:px-40 md:py-10 gap-x-1.5 gap-y-8 md:gap-y-12 flex flex-col items-center'>
      <span className='w-3/4 md:w-1/2 font-semibold text-xl sm:text-2xl md:text-3xl text-center'>
        Benefits of TubeFetch&apos;s Free{' '}
        <span className='text-[#15B37E]'>Youtube Video Downloader</span>
      </span>

      <div className='w-full space-y-8 md:space-y-0'>
        {/* Benefit-1 */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-y-5 md:gap-0'>
          <div className='w-[90%] md:max-w-1/2 flex justify-center'>
            <Image
              src='/images/no-download-limits.webp'
              alt='No Download Limits'
              width={430}
              height={400}
              loading='lazy'
              unoptimized={false}
              className='h-52 w-52 md:h-auto md:w-auto'
            />
          </div>

          <div className='w-[95%] md:max-w-3/5 flex flex-col justify-center gap-y-2'>
            <span className='font-semibold text-xl sm:text-2xl md:text-3xl'>No Download Limits</span>
            <span className='text-gray-500 text-justify'>
              With TubeFetch, you&apos;re not restricted by download limits.
              Whether you need a single video or want to build a massive offline
              collection, you can download as much content as you want. This
              unlimited access allows you to save everything from music videos
              and tutorials to long-form documentaries, ensuring you always have
              your favorite content at your fingertips.
            </span>
          </div>
        </div>

        {/* Benefit-2 */}
        <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-y-5 md:gap-0'>
          <div className='w-[95%] md:max-w-3/5 flex flex-col justify-center gap-y-2'>
            <span className='font-semibold text-xl sm:text-2xl md:text-3xl'>No App Required</span>
            <span className='text-gray-500'>
              Unlike some download services that require you to install an app
              or software, TubeFetch operates entirely online. There&apos;s no
              need to clutter your device with additional applications—simply
              visit the website, paste your video link, and start downloading.
              This feature makes the process quicker and more convenient,
              freeing up your device&apos;s storage and avoiding potential
              security risks from unknown apps.
            </span>
          </div>

          <div className='w-[90%] md:max-w-1/2 flex justify-center'>
            <Image
              src='/images/no-app-required.webp'
              alt='No App Required'
              width={430}
              height={400}
              loading='lazy'
              unoptimized={false}
              className='h-52 w-52 md:h-auto md:w-auto'
            />
          </div>
        </div>

        {/* Benefit-3 */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-y-5 md:gap-0'>
          <div className='w-[90%] md:max-w-1/2 flex justify-center'>
            <Image
              src='/images/cross-platform-compatibility.webp'
              alt='Cross-platform Compatibility'
              width={430}
              height={400}
              loading='lazy'
              unoptimized={false}
              className='h-52 w-52 md:h-auto md:w-auto'
            />
          </div>

          <div className='w-[95%] md:max-w-3/5 flex flex-col justify-center gap-y-2'>
            <span className='font-semibold text-xl sm:text-2xl md:text-3xl'>
              Cross-platform Compatibility
            </span>
            <span className='text-gray-500'>
              TubeFetch&apos;s YouTube downloader is designed to work seamlessly
              across all devices and operating systems. Whether you&apos;re on a
              Windows PC, macOS, Linux machine, Android phone, or iOS device,
              you can access TubeFetch and download videos without any issues.
              This cross-platform compatibility ensures that you can use the
              downloader on your preferred device, anytime and anywhere.
            </span>
          </div>
        </div>

        {/* Benefit-4 */}
        <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-y-5 md:gap-0'>
          <div className='w-[95%] md:max-w-3/5 flex flex-col justify-center gap-y-2'>
            <span className='font-semibold text-xl sm:text-2xl md:text-3xl'>
              No Logins or Accounts
            </span>
            <span className='text-gray-500'>
              TubeFetch offers a seamless experience by eliminating the need for
              logins or account creation. You can start downloading videos
              immediately without sharing any personal information or going
              through time-consuming sign-up processes. This feature not only
              saves time but also ensures your privacy is maintained, giving you
              peace of mind while using the service.
            </span>
          </div>

          <div className='w-[90%] md:max-w-1/2 flex justify-center'>
            <Image
              src='/images/no-logins-or-accounts.webp'
              alt='No Login or Account'
              width={430}
              height={400}
              loading='lazy'
              unoptimized={false}
              className='h-52 w-52 md:h-auto md:w-auto'
            />
          </div>
        </div>

        {/* Benefit-5 */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-y-5 md:gap-0'>
          <div className='w-[90%] md:max-w-1/2 flex justify-center'>
            <Image
              src='/images/user-friendly-interface.webp'
              alt='User-Friendly Interface'
              width={430}
              height={400}
              loading='lazy'
              unoptimized={false}
              className='h-52 w-52 md:h-auto md:w-auto'
            />
          </div>

          <div className='w-[95%] md:max-w-3/5 flex flex-col justify-center gap-y-2'>
            <span className='font-semibold text-xl sm:text-2xl md:text-3xl'>User-Friendly Interface</span>
            <span className='text-gray-500'>
              Navigating TubeFetch is a breeze, thanks to its intuitive and
              user-friendly interface. The design is clean and straightforward,
              allowing users of all skill levels to download videos
              effortlessly. Whether you&apos;re a tech novice or an experienced
              user, you&apos;ll appreciate the ease with which you can convert
              and save content with just a few clicks.
            </span>
          </div>
        </div>

        {/* Benefit-6 */}
        <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-y-5 md:gap-0'>
          <div className='w-[95%] md:max-w-3/5 flex flex-col justify-center gap-y-2'>
            <span className='font-semibold text-xl sm:text-2xl md:text-3xl'>Security and Privacy</span>
            <span className='text-gray-500'>
              TubeFetch prioritizes your security and privacy. The downloader is
              designed to protect your data and ensure a safe browsing
              experience. You don&apos;t have to worry about malware, phishing
              attempts, or data breaches, as tubeFetch uses secure connections
              and robust privacy measures. This commitment to security ensures
              that your downloads are safe and your personal information remains
              confidential.
            </span>
          </div>

          <div className='w-[90%] md:max-w-1/2 flex justify-center'>
            <Image
              src='/images/security-and-privacy.webp'
              alt='Security and Privacy'
              width={430}
              height={400}
              loading='lazy'
              unoptimized={false}
              className='h-52 w-52 md:h-auto md:w-auto'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
