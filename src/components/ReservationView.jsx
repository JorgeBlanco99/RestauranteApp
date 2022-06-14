import React from 'react'
import ReservationContainer from "./ReservationContainer";
const ReservationView = () => {
  return (
    <section className='w-full my-6' id="menu">
    <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content 
        before:w-60 before:h-2 before:-bottom-2 before:-left-3 before:bg-gradient-to-tr from-blue-500 to-blue-300 transition-all
         ease-in-out duration-100'> Reservas Online</p>
      <div className='w-full'>
          <ReservationContainer/>
      </div>
    </div>
</section>
  )
}

export default ReservationView