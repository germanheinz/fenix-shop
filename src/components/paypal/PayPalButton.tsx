'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions";


interface Props {
  orderId: string;
  amount: number;
}


export const PayPalButton = ({ orderId, amount}: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = (Math.round(amount * 100 )) / 100;

  if(isPending){
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: `${rountedAmount}`
          }
        }
      ],
      intent: "CAPTURE"
    });

    const orderUpdated = setTransactionId(orderId, transactionId);

    if(!orderUpdated) throw new Error('Error to update Order');

    

    return transactionId;
  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    
    const details = await actions.order?.capture();

    if( !details || !details.id ) return;

    await paypalCheckPayment( details.id );


  }

  return (
    <div className="relative z-0">
      <PayPalButtons 
        createOrder={ createOrder }
        onApprove={ onApprove }
      />
    </div>
  )
}
