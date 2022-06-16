import React,{useEffect, useState}from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllOrders } from '../utils/firebaseFuntions';
import { actionType } from '../context/reducer';
import {AiOutlineFileDone} from 'react-icons/ai';
import { delateOrder } from '../utils/firebaseFuntions';
import {motion} from "framer-motion"

import notFound from "./img/notFound.png";


const KitchenView = () => {
  const [{kitchenOrders}, dispatch] = useStateValue();
  const fetchData = async () =>{
    await getAllOrders().then (data => {
      dispatch({
        type: actionType.SET_KITCHEN_ORDERS,
        kitchenOrders : data
      })
    })
  };
  const orderDone = (id) => {
    delateOrder(id);
    fetchData();
  };


  useEffect(() => {fetchData()},[]);

  return (
    
    <div className='w-full flex items-center gap-3 my-12 overflow-x-hidden flex-wrap justify-center '>
      <div>

   
      <div  className=' flex items-center justify-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content 
        before:w-40 before:h-2 before:-bottom-2 before:-left-8 before:bg-gradient-to-tr from-blue-500 to-blue-300 transition-all
         ease-in-out duration-100'> Pedidos</p>
         </div>
      <div>
       {kitchenOrders && kitchenOrders.length > 0? (
           kitchenOrders.map((item) =>(
            <div key={item?.id} className='flex flex-col h-200 w-300 min-w-[300px] my-12 md:w-340 md:min-w-[340px]  shadow-md rounded-lg  backdrop-blur-lg hover:drop-shadow-lg'>
            <div className='w-full  flex items-center justify-between'>
                 <motion.button whileTap={{scale: 0.6}} className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer hover:shadow-md' onClick={()=> orderDone(item?.id)}>
                     <AiOutlineFileDone className='text-white'/>
                 </motion.button>
            </div>
            <div className='w-full flex flex-col  items-end justify-end'>
                <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.id}</p>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[0]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'>  {item?.produc[0]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[1]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[1]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[2]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[2]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[3]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[3]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[4]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[4]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[5]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'>  {item?.produc[5]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[6]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'>{item?.produc[6]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[7]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'>  {item?.produc[7]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[8]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[8]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[9]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[9]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[10]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[10]?.qty} </p>
                </div>
                <div className='w-full flex items-center justify-center'>
                  <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.produc[11]?.title} </p>
                  <p className='text-textColor font-semibold  text-base md:text-lg'>  {item?.produc[11]?.qty} </p>
                </div>
                
                
                

            </div>
        </div>
       ))
       ) : (
       <div className='w-full flex flex-col items-center justify-center'>
           <img src={notFound} className="h-40" />
           <p className='text-xl font-semibold'> No Quedan Pedidos Buen Trabajo</p>
        </div>
        )}
              </div>
              </div>
    </div>
  )
}

export default KitchenView