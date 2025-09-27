'use client';

import { useCartStore } from '@/store';
import React, { useEffect, useMemo, useState } from 'react'
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {

    const [loaded, setloaded] = useState(false);
    const cart = useCartStore((state) => state.cart);

    const { itemInCart, subTotal, tax, total } = useMemo(() => {
        const itemInCart = cart.reduce((sum, p) => sum + p.quantity, 0);
        const subTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        return { itemInCart, subTotal, tax, total };
    }, [cart]);


    useEffect(() => {
        setloaded(true)
    }, []);

    if(!loaded){ return <div>Loading...</div> }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-fit '>
        <h2 className='grid grid-cols-2 font-bold '> Summary </h2>
        <div className='grid grid-cols-2'>
            <span>No Products</span>
            <span className='text-right'>{ itemInCart }</span>

            <span>Subtotal</span>
            <span className='text-right'>{ currencyFormat(subTotal) }</span>

            <span >Taxes (15%)</span>
            <span className='text-right'>{ currencyFormat(tax) }</span>

            <span className='mt-5 text-2xl'>Total</span>
            <span className='mt-5 text-2xl text-right'>{ currencyFormat(total) }</span>
        </div>
    </div>
    )
}
