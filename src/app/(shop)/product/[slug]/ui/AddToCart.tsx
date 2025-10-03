'use client';

import { QuantitySelector, SizeSelector } from '@/components'
import { Product, CartProduct } from '../../../../../interfaces/poduct.interface';
import { useState } from 'react';
import { Size } from '@/seed/seed';
import { useCartStore } from '@/store';

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {


    const addProductToCart        = useCartStore( state => state.addProductToCart );
    
    const [size, setsize]         = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setposted]     = useState(false);

    const addToCart = () => {
        console.log('$');

        setposted(true);

        if( !size ) return;


        const cartProduct: CartProduct = {
            id: product.id ?? '',
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart( cartProduct )

        setposted(false);
        setQuantity(1);
        setsize(undefined);


    }


    return (
        <>
        {
            posted && ! size && (
                <span className='mt-2 text-red-500 fade-in'>
                    Please select a size 
                </span>
            )
        }

        <SizeSelector 
            selectedSize   = { size } 
            availableSizes = { product.sizes    } 
            onSizeChanged  ={ setsize }
        />
        
        <QuantitySelector quantity={quantity} onQuantityChanged={ setQuantity } />

        <button onClick={ addToCart } className="btn-primary my-5">Add to Cart</button>
        </>
    );
}
