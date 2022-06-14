import React from 'react'
import {Link} from "react-router-dom";

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id="home">
    <div className='py-10'> 
      <p className=' text-[2.5rem] font-bold tracking-wide text-headingColor'> El restaurante mas eficiente de tu ciudad</p>
      <p className='text-base text-textColor text-center md:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quis earum deleniti eius laudantium minus itaque aliquam numquam animi, consequuntur accusamus, enim commodi sit vero impedit non porro. Doloremque, incidunt?</p>
      <Link to = {"/reservation"}>
      <button type='buttom' className= 'bg-slate-400 w-full px-4 py-2 rounded-lg hover:shadow-lg  transition-all ease-in-out duration-100 md:w-auto'>Reserva Online</button>
      </Link>
      
    </div>
    <div className='py-2 bg-blue-400 flex-1'>
    </div>
  </section>
  )
}

export default HomeContainer