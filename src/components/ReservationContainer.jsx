import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { hours } from '../utils/data';
import {FiMail} from 'react-icons/fi';
import {FaUserAlt} from 'react-icons/fa';
import { saveReservation,getReservationByDay } from '../utils/firebaseFuntions';
import Calendar from 'react-calendar'
import '../index.css';
import {BiHourglass} from 'react-icons/bi';
import {getRestaurantInfo } from '../utils/firebaseFuntions';
import { useStateValue} from '../context/StateProvider';
const ReservationContainer =  () => {
  const [name,setName] = useState("");
  const [tables,setTables] = useState("");
  const [email,setEmail] = useState("");
  const [fields,setFields] = useState(false); /**for errors */
  const [alertStatus,setAlertStatus] = useState("danger");
  const [msg,setMsg] = useState(null);
  const [date, setDate] = useState(new Date());
  const [flag, setFlag] = useState(false);
  const[{user}, dispatch] = useStateValue();
  const today = new Date();
  const nextMonth= today.getMonth() +2;
  let [hoursr, setHoures] = useState("");
  const [table , setTable] = useState(0);
  const getTables = async  () => {
    await getRestaurantInfo().then (data => {
      const info = data.pop();
      setTable(info.tables);
    })
  }
  getTables();
  
const saveInfo = () =>{
  try{
    if(!name || !email){
      setFields(true)
      setMsg("Alguno de los valores no esta rellenado");
      setAlertStatus("danger")
      setTimeout(()=>{
        setFields(false)
      },4000)
    }else{
      const data = {
        id: date ,
        name: name,
        email: email,
        hour: filter,
        uid: user.uid,
      }

      saveReservation(data);
      setFields(true);
      setMsg("Reserva Completada con exito");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000)
    }

  }catch(error){
    console.log(error);
    setFields(true)
    setMsg("Selecione fecha");
    setAlertStatus("danger")
    setTimeout(()=>{
      setFields(false)
    },4000)
  }
};
const changeDay = async () =>{
  setTimeout(()=>{
    setFlag(true)
  },1000)

  const reservations = await getReservationByDay(date);
  setHoures(reservations);
  setFlag(false);

}
const [filter, setFilter] = useState("reservation");
 return (
 
    <div className='w-full min-h-screen flex flex-col items-center justify-center items-top'>
      <div className='w-full flex flex-col items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
        <div>
          <Calendar onChange={setDate} onClickDay={()=> changeDay(true)} value={date} minDate={new Date()} maxDate={new Date(today.getFullYear(), nextMonth, today.getDay())}/>
        </div>
        { flag&& (

<div className='w-full flex flex-col items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
        {hours && hours.map(hour =>(
        <motion.div whileTap={{scale: 0.5}} oncl
        key={hour.id} className={`group ${filter === hour.urlParamName ? ' bg-blue-500' : 'bg-white'} bg-white hover:bg-blue-500  min-w-[90px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-row gap-3 items-center justify-center w-full duration-150 transition-all`}
            onClick={()=> setFilter(hour.urlParamName)}>
            <div className={`w-10 h-10 rounded-full ${filter === hour.urlParamName ? 'bg-white' : 'bg-blue-500' } bg-blue-500 group-hover:bg-white flex justify-center items-center`}>
                <BiHourglass className={`${filter == hour.urlParamName ? 'text-black': ' text-cyan-500'  } group-hover:text-black text-lg`}/>
            </div>
            <p className={`group-hover:text-white ${filter === hour.urlParamName ? 'text-white':'text-black' }`}>{hour.name}</p>
            <p className={`group-hover:text-white ${filter === hour.urlParamName ? 'text-white':'text-black' }`}>{hoursr[hour.id]}/{table} </p>
        </motion.div>
        ))}
    </div>
        ) }
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