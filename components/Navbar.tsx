import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MobileNav } from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

export const Navbar = () => {
    return (
        <nav className='flex-between fixed z-10 w-full bg-dark-1 px-6 py-4 lg:px-10'>
            <Link href='/' className='flex items-center gap-1'>
                <Image
                    src='/icons/logo.svg'
                    alt='Logo'
                    width={32}
                    height={32}
                    className='max-sm:siz-10'
                />
                <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Yommo</p>
            </Link>
            
            <div className='flex-between gap-5'>
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <MobileNav />
            </div>
        </nav>
    )
}