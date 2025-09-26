
'use client'
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export const ProductsInCart = () => {

    const [loaded, setloaded]   = useState(false)
    const productInCart         = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductInCart   = useCartStore(state => state.removeProductFromCart);


    useEffect(() => {
        setloaded(true)
    });
    

    if(!loaded){
        return <div>Loading...</div>
    }

    return(
    <>
    { 
        productInCart.map(product => (
            <div key={`${ product.slug }-${ product.size}` } className='flex mb-5'>
                <Image 
                src={`/products/${product.image}`}
                width={ 100 }
                height={ 100 }
                style={{
                    width: '100px',
                    height: '100px'
                }}
                alt={ product.title }
                className='mr-5 rounded'
                />

            <div>

                <Link className="hover:underline cursor-pointer" href={`/product/${ product.slug }`} >
                    <p> { product.title }</p>
                
                </Link>
                <p>$ { product.price }</p>
                
                <QuantitySelector 
                    quantity={ product.quantity } 
                    onQuantityChanged={ (quantity) => updateProductQuantity(product, quantity) }
                />

                <button className='underline mt-3' onClick={() => removeProductInCart(product)}> Remove </button>
            </div>
            </div>
            
            ))
        }
    </>  
  ) 
}
