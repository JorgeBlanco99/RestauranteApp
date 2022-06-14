import React, {useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import {MdOutlineSchedule} from 'react-icons/md';
import {FiMail} from 'react-icons/fi';
import {FaUserAlt} from 'react-icons/fa';
import {BiHourglass} from 'react-icons/bi';
import { saveRestaurantInfo,getRestaurantInfo } from '../utils/firebaseFuntions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { hours } from '../utils/data';



const ReservationContainer =  () => {
  const [{RestaurantInfo}, dispatch] = useStateValue();
  const [name,setName] = useState(RestaurantInfo?.name);
  const [tables,setTables] = useState(RestaurantInfo?.tables);
  const [email,setEmail] = useState(RestaurantInfo?.email);
  const [fields,setFields] = useState(false); /**for errors */
  const [alertStatus,setAlertStatus] = useState("danger");
  const [msg,setMsg] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

const saveInfo = () =>{
  setIsLoading(true);
  try{
    if(!name || !email || !tables){
      setFields(true)
      setMsg("Alguno de los valores no esta rellenado");
      setAlertStatus("danger")
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)
    }else{
      const data = {
        id: `${Date.now()}`,
        name: name,
        email: email,
        tables: tables,
      }

     // saveRestaurantInfo(data);
      setIsLoading(false);
      setFields(true);
      setMsg("Datos añadidos con exito");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000)
    }

  }catch(error){
    console.log(error);
    setFields(true)
    setMsg("error al subir la imagen");
    setAlertStatus("danger")
    setTimeout(()=>{
      setFields(false)
      setIsLoading(false)
    },4000)
  }
};
const clearData= () => {
  setName("");
  setEmail("");
  setTables("");
}
const [filter, setFilter] = useState("reservation");

 return (
  
    <div className='w-full min-h-screen flex flex-col items-center justify-center items-top'>
      <div className='w-full flex flex-col items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {hours && hours.map(category =>(
                <motion.div whileTap={{scale: 0.5}}
                key={category.id} className={`group ${filter === category.urlParamName ? ' bg-blue-500' : 'bg-white'} bg-white hover:bg-blue-500  min-w-[90px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-row gap-3 items-center justify-center w-full duration-150 transition-all`}
                    onClick={()=> setFilter(category.urlParamName)}>
                    <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-white' : 'bg-blue-500' } bg-blue-500 group-hover:bg-white flex justify-center items-center`}>
                        <BiHourglass className={`${filter == category.urlParamName ? 'text-black': ' text-cyan-500'  } group-hover:text-black text-lg`}/>
                    </div>
                    <p className={`group-hover:text-white ${filter === category.urlParamName ? 'text-white':'text-black' }`}>{category.name}</p>
                </motion.div>
                ))}
      </div>
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
      <p>Datos de la reserva</p>
      <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <FaUserAlt className='text-x1 text-gray-700'/>
          <input type="text" requiered value={name} onChange={(e) => setName(e.target.value)}
           placeholder="Nombre"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>
        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <FiMail className='text-x1 text-gray-700'/>
          <input type="text" requiered value={email} onChange={(e) => setEmail(e.target.value)}
           placeholder="Corrreo Electronico"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>
        <div className='flex items-center w-full'>
          <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveInfo}>Reservar</button>
        </div>
      </div>
    </div>
   
    )
}

export default ReservationContainer