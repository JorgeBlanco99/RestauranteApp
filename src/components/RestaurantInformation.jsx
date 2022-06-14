import React, {useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import {MdOutlineSchedule} from 'react-icons/md';
import {GiTable} from 'react-icons/gi';
import { saveRestaurantInfo,getRestaurantInfo } from '../utils/firebaseFuntions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const RestaurantInformation = ()  => {
  const [{RestaurantInfo}, dispatch] = useStateValue();
  const fetchData = async () =>{
    await getRestaurantInfo().then (data => {
      const info = data.pop();
      dispatch({
        type: actionType.SET_RESTAURANT_INFO,
        RestaurantInfo : info
      })
    })
  };

  useEffect(() => {fetchData()},[]);
  console.log(RestaurantInfo);
  const [lunch,setLunch] = useState(RestaurantInfo?.lunch);
  const [tables,setTables] = useState(RestaurantInfo?.tables);
  const [dinner,setDinner] = useState(RestaurantInfo?.dinner);
  const [fields,setFields] = useState(false); /**for errors */
  const [alertStatus,setAlertStatus] = useState("danger");
  const [msg,setMsg] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

const saveInfo = () =>{
  setIsLoading(true);
  try{
    if(!lunch || !dinner || !tables){
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
        lunch: lunch,
        dinner: dinner,
        tables: tables,
      }

      saveRestaurantInfo(data);
      setIsLoading(false);
      setFields(true);
      setMsg("Datos añadidos con exito");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000)
      fetchData();
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
  setLunch("");
  setDinner("");
  setTables("");
}
 return (
    <div className='w-full min-h-screen flex items-center justify-center items-top'>
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
          <MdOutlineSchedule className='text-x1 text-gray-700'/>
          <input type="text" requiered value={lunch} onChange={(e) => setLunch(e.target.value)}
           placeholder="Horario Comidas ej.12:00-15:00"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>
        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <MdOutlineSchedule className='text-x1 text-gray-700'/>
          <input type="text" requiered value={dinner} onChange={(e) => setDinner(e.target.value)}
           placeholder="Horario Cenas ej.20:00-24:00"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>
        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <GiTable className='text-x1 text-gray-700'/>
          <input type="text" requiered value={tables} onChange={(e) => setTables(e.target.value)}
           placeholder="Numero de mesas"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>
        
        <div className='flex items-center w-full'>
          <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveInfo}> Guardar</button>
        </div>
      </div>
    </div>
   
    )
  }

export default RestaurantInformation