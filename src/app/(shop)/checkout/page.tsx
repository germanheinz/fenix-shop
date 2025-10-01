import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';
import { initialData } from '@/seed/seed';
import Image from 'next/image';

  const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
  ]

export default function CheckoutPage() {

  return (
    <div  className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title='Verify Order'/>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/* cart */}
            <div className='flex flex-col mt-5'>
              <span className=' text-xl'> Items </span>
              <Link href="/cart" className='underline mb-5'>
                Edit Items
              </Link>
        

            {/* items */}
            { productInCart.map(product => (
                <div key={product.slug} className='flex mb-5'>
                  <Image 
                    src={`/products/${product.images[0]}`}
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
                  <p> { product.title }</p>
                  <p>$ { product.price } x 3</p>
                  <p className='font-bold'>Subtotal: ${ product.price * 3 }</p>

                </div>
                </div>
                
              ))
            }

            </div>


            {/* checkout */}

            <div className='bg-white rounded-xl shadow-xl p-7'>


              <h2 className='text-2xl mb-2'>Delivery Address</h2>
              <div className='mb-10'>
                <p className='text-xl'>German H</p>
                <p className='text-xl'>Casp 47</p>
                <p>Eixample</p>
                <p>Barcelona</p>
              </div>

              <div className='w-full h-0.5 rounded bg-gray-200 mb-10'/>


              <h2 className='grid grid-cols-2 font-bold '> Summary </h2>


                <div className='grid grid-cols-2'>
                  <span>No Products</span>
                  <span className='text-right'>3 Products</span>

                  <span>Subtotal</span>
                  <span className='text-right'>$ 100</span>

                  <span >Taxes (15%)</span>
                  <span className='text-right'>%5</span>

                  <span className='mt-5 text-2xl'>Total</span>
                  <span className='mt-5 text-2xl text-right'>$ 100</span>
    
                </div>


                <div className='mt-5 mb-2 w-full'>

                  <p className='mb-5'>
                    <span className='text-xs'>terms y conditions</span>
                  </p>

                  <Link 
                    className='flex btn-primary justify-center'
                    href='/orders/123'> Colocar Orden
                  </Link>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
}