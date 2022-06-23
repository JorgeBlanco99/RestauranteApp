import React,  { useEffect, useState } from 'react'
import {RiReservedFill} from 'react-icons/ri'
import { gestion } from '../utils/data';
import {motion} from "framer-motion"
import RestaurantInformation from './RestaurantInformation';
import QrGenerator from './QrGenerator';
import BillsContainer from './BillsContainer';
import ManagerReservationContainer from './ManagerReservationContainer';
import { useStateValue } from "../context/StateProvider";

const ManagerView = () => {
    const[{foodItems}, dispatch] = useStateValue();
    const [filter, setFilter] = useState("reservation");
    useEffect(()=>{},[filter]);
  return (
    <section className='w-full my-6' id="menu">
    <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content 
        before:w-80 before:h-2 before:-bottom-2 before:left-2 before:bg-gradient-to-tr from-blue-500 to-blue-300 transition-all
         ease-in-out duration-100'> Gestion del Restaurante</p>
         <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {gestion && gestion.map(category =>(
                <motion.div whileTap={{scale: 0.5}}
                key={category.id} className={`group ${filter === category.urlParamName ? ' bg-blue-500' : 'bg-white'} bg-white hover:bg-blue-500 w-24 min-w-[90px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all`}
                    onClick={()=> setFilter(category.urlParamName)}>
                    <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-white' : 'bg-blue-500' } bg-blue-500 group-hover:bg-white flex justify-center items-center`}>
                        <RiReservedFill className={`${filter == category.urlParamName ? 'text-black': ' text-cyan-500'  } group-hover:text-black text-lg`}/>
                    </div>
                    <p className={`group-hover:text-white ${filter === category.urlParamName ? 'text-white':'text-black' }`}>{category.name}</p>
                </motion.div>
                ))}
            </div>
            <div className='w-full'>
                {
                    filter && filter === "reservation" && (
                        <ManagerReservationContainer/>
                )}
                { filter && filter === "restaurant" && (
                       <RestaurantInformation/>
                )}
                 { filter && filter === "qrGenerator" && (
                       <QrGenerator/>
                )}
                { filter && filter === "bills" && (
                       <BillsContainer/>
                )}
            </div>
    </div>
</section>
  )
}

export default ManagerView