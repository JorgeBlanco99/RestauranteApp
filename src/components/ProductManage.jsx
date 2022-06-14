import React,  { useEffect, useState } from 'react'
import {IoFastFood} from 'react-icons/io5'
import { categories } from '../utils/data';
import {motion} from "framer-motion"
import ModifyItemsContainer from './ModifyItemsContainer';
import { useStateValue } from "../context/StateProvider";


const ProductManage = () => {
    const[{foodItems}, dispatch] = useStateValue();
    const [filter, setFilter] = useState("sushi");
    useEffect(()=>{},[filter]);
  return (
      <section className='w-full my-6' id="menu">
          <div className='w-full flex flex-col items-center justify-center'>
              <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content 
              before:w-80 before:h-2 before:-bottom-2 before:left-4 before:bg-gradient-to-tr from-blue-500 to-blue-300 transition-all
               ease-in-out duration-100'> Modificacion de productos</p>

            <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {categories && categories.map(category =>(
                <motion.div whileTap={{scale: 0.5}}
                key={category.id} className={`group ${filter === category.urlParamName ? ' bg-blue-500' : 'bg-white'} bg-white hover:bg-blue-500 w-24 min-w-[90px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all`}
                    onClick={()=> setFilter(category.urlParamName)}>
                    <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-white' : 'bg-blue-500' } bg-blue-500 group-hover:bg-white flex justify-center items-center`}>
                        <IoFastFood className={`${filter == category.urlParamName ? 'text-black': ' text-cyan-500'  } group-hover:text-black text-lg`}/>
                    </div>
                    <p className={`group-hover:text-white ${filter === category.urlParamName ? 'text-white':'text-black' }`}>{category.name}</p>
                </motion.div>
                ))}
            </div>
            <div className='w-full'>
                <ModifyItemsContainer flag={false} data={foodItems?.filter(i => i.category === filter)}/>
            </div>
          </div>
      </section>
  )
}

export default ProductManage