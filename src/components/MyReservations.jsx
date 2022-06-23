import React, { useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import {GiCancel} from 'react-icons/gi';
import { useStateValue } from '../context/StateProvider';
import { getReservationByUid, delateReservation } from '../utils/firebaseFuntions';
import { hours } from '../utils/data';
import 'dayjs/locale/es';
const MyReservations = () => {
  const [reservation,setReservation]= useState(null);
  const[{user}, dispatch] = useStateValue();
  const dayjs = require('dayjs')
  dayjs.locale('es');
  useEffect(() => {getReservation()},[]);

const getReservation = async () =>{
    const a = await getReservationByUid(user.uid);   
    setReservation(a);
};
const doneReservation = (data) =>{
    console.log(data);
    delateReservation(data);            
    setReservation(null);
}
return (
  <div className='w-full min-h-screen flex items-center justify-center'>
  {!reservation && (
   <p> No tienes Reservas </p>
  )}

  {reservation && reservation.map(res =>(
      <div className={`w-full flex items-center`}>
           <div key={res?.name} className='flex flex-col h-200 w-300 min-w-[300px] my-12 md:w-340 md:min-w-[340px]  shadow-md rounded-lg  backdrop-blur-lg hover:drop-shadow-lg'>
           <div className='w-full flex flex-col items-center justify-center'>
              <p className='text-textColor font-semibold  text-base md:text-lg'>Reserva</p>
               <p className='text-textColor font-semibold  text-base md:text-lg'> Dia: {dayjs.unix(res?.id.seconds).toDate().toString().substring(8,11)} de  {dayjs.unix(res?.id.seconds).toDate().toString().substring(4,8)} del  {dayjs.unix(res?.id.seconds).toDate().toString().substring(10,15)}</p>
               <div className='flex items-center gap8'>

                   <p className='text-lg text-black font-semibold' >Hora: {res.hour} <span className='text-sm text-blue-400'><h3></h3></span> </p>
               </div> 
               <div className='w-full  flex items-center justify-center'>
                <motion.div whileTap={{scale: 0.6}} className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer hover:shadow-md'
                  onClick={() => doneReservation(res)}>
                      {/*En el onclick del motion.div hay que gestionar la impresion*/}
                    <GiCancel className='text-white' />
                </motion.div>
           </div>         
           </div>
       </div>
   </div>
  ))}
</div>
)
}

export default MyReservations