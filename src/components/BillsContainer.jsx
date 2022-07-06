import React, { useState } from 'react'
import { motion } from 'framer-motion';
import {GiTable} from 'react-icons/gi';
import {AiFillPrinter} from 'react-icons/ai';
import { getBIllForId } from '../utils/firebaseFuntions';
import { useStateValue } from '../context/StateProvider';
import { getAllFoodItems } from '../utils/firebaseFuntions';
import { actionType } from '../context/reducer';
const BillsContainer = () => {
    const [table,settable] = useState("");
    const [fields,setFields] = useState(false); /**for errors */
    const [alertStatus,setAlertStatus] = useState("danger");
    const [msg,setMsg] = useState(null);
    const [bill,setBill]= useState(null);
  const getBills = async () =>{
      if(!table){
        setFields(true)
        setMsg("Rellene el numero de mesa");
        setAlertStatus("danger")
        setTimeout(()=>{
          setFields(false)
        },4000)
      }else{
        const a = await getBIllForId(table);
        setBill(a);
        console.log(a);
        clearData(); 
      }
    };
  const clearData= () => {
    settable("");
  }
  return (
    <div className='w-full min-h-screen flex py-6 items-start justify-center'>
    {!bill && (
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
        <GiTable className='text-x1 text-gray-700'/>
        <input type="text" requiered value={table} onChange={(e) => settable(e.target.value)}
         placeholder="Introduce el numero de mesa"
        className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
      </div>
      <div className='flex items-center w-full'>
          <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={getBills}> Consultar Cuenta</button>
        </div>
    </div>
    )}

    {bill && (
        <div className={`w-full flex items-center justify-center`}>
             <div key={bill?.table} className='flex flex-col h-200 w-300 min-w-[300px] my-12 md:w-340 md:min-w-[340px]  shadow-md rounded-lg  backdrop-blur-lg hover:drop-shadow-lg'>
             <div className='w-full flex flex-col items-center justify-center'>
                 <p className='text-textColor font-semibold  text-base md:text-lg'> Mesa: {bill[0]?.table}</p>
                 <p className='text-textColor text-base'> Tipo: {bill[0]?.type}</p>
                 <div className='flex items-center gap8'>
                     <p className='text-lg text-black font-semibold'>Total: {bill[0]?.price} <span className='text-sm text-blue-400'>€</span> </p>
                 </div> 
                 <div className='w-full  flex items-center justify-center'>
                  <motion.div whileTap={{scale: 0.6}} className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer hover:shadow-md'
                     >
                        {/*En el onclick del motion.div hay que gestionar la impresion*/}
                      <AiFillPrinter className='text-white' />
                  </motion.div>
             </div>         
             </div>
         </div>
     </div>
    )}
  </div>
  )
}

export default BillsContainer