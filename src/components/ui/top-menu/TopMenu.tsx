'use client'

import { geist_Mono } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export const TopMenu = () => {

    
  const openSideMenu     = useUIStore( state => state.openSideMenu)
  const closeSideMenu    = useUIStore( state => state.closeSideMenu)
  
  const totalItemsInCart = useCartStore( state => state.getTotalItems());

  const [loaded, setloaded] = useState( false);

  useEffect(() => {
    setloaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
        <div> 
            <Link href="/"> <span className={ `${ geist_Mono.className} antialiased font-bold`}>Fénix</span> </Link>
            <span> | Shop</span>
        </div>

        <div className="hidden sm:block">
            <Link href="/category/men" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Men</Link>
            <Link href="/category/women" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Women</Link>
            <Link href="/category/kid" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Kid</Link>
        </div>

        <div className="flex items-center">
            <Link href="/search" className="mx-2">
                <IoSearchOutline className="w-5 h-5" />
            </Link>
            <Link href={
                ((totalItemsInCart === 0) && loaded) ? '/empty' : '/cart'
            } className="mx-2">
                <div className="relative">

                    { 
                       ( loaded && totalItemsInCart > 0 ) &&  (
                            <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                { totalItemsInCart }
                            </span>
                    )}
                    <IoCartOutline className="w-5 h-5"/>
                </div>
            </Link>
            <button onClick={() => openSideMenu() } className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                Menu
            </button>
        </div>
    </nav>
  )
}
