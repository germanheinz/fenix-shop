import { robotoFont } from '@/config/fonts';
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>

      <Link href="/">

      <span className={`${ robotoFont.className } antialiased font-bold`}> Fénix </span>
      <span> | shop</span>
      <span> { new Date().getFullYear( )}</span>
      
      </Link>

      <Link href='/' className='mx-3'>
        Privacy & Legals
      </Link>

      <Link href='/' className='mx-3'>
        Location
      </Link>

    </div>
  
  )
}
