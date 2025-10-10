'use client';


import { useEffect, useState } from 'react'
import { getStockBySlug } from '@/actions';
import { fontMono } from '@/config/fonts';


interface Props{
    slug: string
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setstock] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    getStock();
  
  }, [])

  
  const getStock = async() => {
    

      // server action
      const stock = await getStockBySlug( slug );


      setstock( stock );
      setIsLoading( false );
      console.log(isLoading);
    }
  
  return (
    <h1 className={ `${ fontMono } antialiased font-bold text-xl`}>

        Stock: { stock }

    </h1>
    
  )
}
