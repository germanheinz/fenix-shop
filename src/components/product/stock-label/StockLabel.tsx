'use client';


import { useEffect, useState } from 'react'
import { robotoFont } from "@/config/fonts";
import { getStockBySlug } from '@/actions';


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
  }
  
  return (
    <h1 className={ `${ robotoFont } antialiased font-bold text-xl`}>

        Stock: { stock }

    </h1>
    
  )
}
