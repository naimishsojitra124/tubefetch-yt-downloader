import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='h-16 max-h-16 md:h-20 md:max-h-20 md:px-40 flex items-center justify-center md:justify-between'>
        <div className=''>
            <Image
            src='TubeFetch.svg'
            alt='Logo'
            width={200}
            height={200}
            className='h-40 w-40 md:h-auto md:w-auto'
            />
        </div>

        {/* TODO:Login/Signup Button */}
        <div className='hidden'>
            Login
        </div>
    </header>
  )
}

export default Header