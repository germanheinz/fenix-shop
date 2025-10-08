import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function CartPage() {

  // redirect('/empty')

  return (
    <div  className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title='Cart'/>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/* cart */}
            <div className='flex flex-col mt-5'>
              <span className=' text-xl'> Add more Items</span>
              <Link href="/" className='underline mb-5'>
                Keep Adding
              </Link>
        

            {/* items */}
            
            <ProductsInCart />
            
            </div>


            {/* checkout */}

                <OrderSummary/>


                <div className='mt-5 mb-2 w-full'>
                  <Link 
                    className='flex btn-primary justify-center'
                    href='/checkout/address'> Checkout
                  </Link>
                </div>

            </div>

        </div>

      </div>
  );
}