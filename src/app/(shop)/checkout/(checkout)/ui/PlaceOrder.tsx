'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const PlaceOrder = () => {

    const [loaded, setloaded] = useState(false);

    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const address = useAddressStore(state => state.address);

    const [errorMessage, setErrorMessage] = useState('');

    const { itemInCart, subsTotal, tax, total } = useCartStore.getState().getSummaryInformation();

    const clearCart = useCartStore(state => state.clearCart );

    const cart = useCartStore(state => state.cart);

    const router = useRouter();

    useEffect(() => {
        setloaded(true);
    }, []);


    
    const onCreatingOrder = async() => {
        setIsCreatingOrder(true);


        const productsToOrder = cart.map(product => ({
          productId: product.id,
          quantity: product.quantity,
          size: product.size
        }))

        // TRANSACTIONAL
        const resp = await placeOrder(productsToOrder, address);

        if( !resp.ok ){
          setIsCreatingOrder(false);
          setErrorMessage(String(resp.message))
          return;
        }

        clearCart();
        setIsCreatingOrder(false);
        router.push('/orders/' + resp.prismaTx?.order.id);
    }


    if( !loaded ){ return <p>Loading...</p> }

    return (
      <div className='bg-white rounded-xl shadow-xl p-7'>
        <h2 className='text-2xl mb-2'>Delivery Address</h2>
        <div className='mb-10'>
            <p className='text-xl'>{address.firstName} {address.lastName}</p>
            <p className='text-xl'>{ address.address }</p>
            <p>{ address.address2 }</p>
            <p>{ address.city }</p>
            <p>{ address.phone }</p>
        </div>

        <div className='w-full h-0.5 rounded bg-gray-200 mb-10'/>
            <h2 className='grid grid-cols-2 font-bold '> Summary </h2>

                <div className='grid grid-cols-2'>
                    <span>No Products</span>
                    <span className='text-right'>{ itemInCart }</span>
        
                    <span>Subtotal</span>
                    <span className='text-right'>{ currencyFormat(subsTotal) }</span>
        
                    <span >Taxes (15%)</span>
                    <span className='text-right'>{ currencyFormat(tax) }</span>
        
                    <span className='mt-5 text-2xl'>Total</span>
                    <span className='mt-5 text-2xl text-right'>{ currencyFormat(total) }</span>
                </div>


                <div className='mt-5 mb-2 w-full'>

                  <p className='mb-5'>
                    <span className='text-xs'>terms y conditions</span>
                  </p>

                <p className="text-red-500">{ errorMessage }</p>
                <button onClick={ onCreatingOrder }
                    className={ clsx(
                            {
                                'btn-primary': !isCreatingOrder,
                                'btn-disabled': isCreatingOrder
                            }
                        )
                    }
                    > 
                    Create Order
                  </button>
                </div>

            </div>
  )
}
