import React from 'react'

const OrderItem = (order) => {
  return (
    <div className='w-full px-2 p-1 rounded-lg bg-cardItem flex items-center gap-2'>
    <img src= {order.item.imageURl} className='w.20 h-20 max-w-[60px] rounded-full object-contain' alt="Foto producto selecionado" />
{/* Nombre*/}
{console.log(order)}
    <div className='flex flex-col gap-2'>
        <p> {order.item.title}</p>
        <p className='text-sm block font-semibold'>{order.item.qty}</p>
    </div>
  

    </div>
  )
}

export default OrderItem