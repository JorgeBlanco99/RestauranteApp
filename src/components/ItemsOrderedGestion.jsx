import React from 'react'
import OrderItem from './OrderItem'

const ItemsOrderedGestion = (order) => {
    const orders =  Object.values(order.item);
    console.log(orders)
  return (
   <div className='w-full px-2 p-1 flex-col rounded-lg bg-cardItem flex items-center gap-2'>
    {orders && Array.from(orders).map((item) => (
                   <OrderItem item = {item}/>
    ))} 
    </div>
  )
}

export default ItemsOrderedGestion