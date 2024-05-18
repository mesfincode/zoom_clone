"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt='hamburger icon'
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side="left" className='border-none bg-dark-1'>
                    <Link href="/" className='flex items-center gap-1' >
                        <Image src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="Yoom logo"
                            className='max-sm:size-10'
                        />
                        <p className='text-[26px] font-extrabold text-white'>Yoom</p>
                    </Link>
                    <div>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {
                                    sidebarLinks.map((link) => {
                                        const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                                        return  <SheetClose asChild key={link.label}>
                                        <Link href={link.route} 
                                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', { 'bg-blue-1': isActive })}>
                                            <Image src={link.imgURL}
                                                width={24}
                                                height={24}
                                                alt={link.label} />
                                            <p className='font-semibold'>{link.label}</p>
                                        </Link>
                                    </SheetClose>
                                    })
                                }
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default MobileNav
