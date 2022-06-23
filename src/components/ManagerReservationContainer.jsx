import React, { useState } from 'react'
import { motion } from 'framer-motion';
import {AiOutlineUser} from 'react-icons/ai';
import {TiTick} from 'react-icons/ti';
import { getBIllForId } from '../utils/firebaseFuntions';
import { useStateValue } from '../context/StateProvider';
import { getReservationByName, delateReservation } from '../utils/firebaseFuntions';
import { actionType } from '../context/reducer';
import { hours } from '../utils/data';
import 'dayjs/locale/es';
const ManagerReservationContainer = () => {
    const [name,setName] = useState("");
    const [fields,setFields] = useState(false); /**for errors */
    const [alertStatus,setAlertStatus] = useState("danger");
    const [msg,setMsg] = useState(null);
    const [hour,setHour] = useState(null);
    const [reservation,setReservation]= useState(null);
    const dayjs = require('dayjs')
    dayjs.locale('es');
  const getReservation = async () =>{
      if(!name){
        setFields(true)
        setMsg("Rellene el nombre del cliente");
        setAlertStatus("danger")
        setTimeout(()=>{
          setFields(false)
        },4000)
      }else{
        const a = await getReservationByName(name);
        if(a.length == 0){
            setFields(true)
            setMsg("No hay ninguna reserva con estos datos");
            setAlertStatus("danger")
            setTimeout(()=>{
          setFields(false)
        },4000)
            setReservation(null);
        }else{
            setReservation(a);
            console.log(a);
            clearData(); 
        }
        
      }
    };
    const setHora = (x) => {
        console.log(x);
        hours.forEach(element => {
            if(x == element.id){
                setHour(element.name);
            }
        });
        console.log(hour)
    }
    const doneReservation = (data) =>{
        console.log(data);
        delateReservation(data);            
        setReservation(null);
    }
  const clearData= () => {
    setName("");
  }
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
    {!reservation && (
     <div className=' w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col justify-center items-center gap-4'>
      {fields && (
          <motion.p
          initial ={{opacity:0}}
          animate ={{opacity:1}}
          exit ={{opacity:0}}
          className={`w-full p-2 rounded-lg text-center font-semibold ${
          alertStatus === "danger" 
          ? "bg-red-400 text-red-800"
          : "bg-emerald-400 text-emerald-800"
           }`}
          >
           {msg}
          </motion.p>
      )}
      <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
        <AiOutlineUser className='text-x1 text-gray-700'/>
        <input type="text" requiered value={name} onChange={(e) => setName(e.target.value)}
         placeholder="Introduce el Nombre del cliente"
        className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
      </div>
      <div className='flex items-center w-full'>
          <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={getReservation}> Consultar Reserva</button>
        </div>
    </div>
    )}

    {reservation && reservation.map(res =>(
        <div className={`w-full flex items-center`}>
             <div key={res?.name} className='flex flex-col h-200 w-300 min-w-[300px] my-12 md:w-340 md:min-w-[340px]  shadow-md rounded-lg  backdrop-blur-lg hover:drop-shadow-lg'>
             <div className='w-full flex flex-col items-center justify-center'>
                 <p className='text-textColor font-semibold  text-base md:text-lg'> Nombre: {res.name}</p>
                 <p className='text-textColor font-semibold  text-base md:text-lg'> Dia: {dayjs.unix(res?.id.seconds).toDate().toString().substring(0,15)}</p>
                 <div className='flex items-center gap8'>

                     <p className='text-lg text-black font-semibold' >Hora: {res.hour} <span className='text-sm text-blue-400'><h3></h3></span> </p>
                 </div> 
                 <div className='w-full  flex items-center justify-center'>
                  <motion.div whileTap={{scale: 0.6}} className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer hover:shadow-md'
                    onClick={() => doneReservation(res)}>
                        {/*En el onclick del motion.div hay que gestionar la impresion*/}
                      <TiTick className='text-white' />
                  </motion.div>
             </div>         
             </div>
         </div>
     </div>
    ))}
  </div>
  )
}

export default ManagerReservationContainer