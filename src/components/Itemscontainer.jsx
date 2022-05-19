import React from 'react'
import {BsFillBasket2Fill} from 'react-icons/bs'
import {motion} from "framer-motion"
import notFound from "./img/notFound.png";

const Itemscontainer = ({ flag , data }) => {
  return (
    <div className={`w-full flex items-center gap-3 my-12${flag ? 'overflow-x-scroll scrollbar-none scroll-smooth' : 'overflow-x-hidden flex-wrap justify-center '}`}>
       {data && data.length > 0? (
           data.map((item) =>(
            <div key={item?.id} className='flex flex-col h-200 w-300 min-w-[300px] my-12 md:w-340 md:min-w-[340px]  shadow-md rounded-lg  backdrop-blur-lg hover:drop-shadow-lg'>
            <div className='w-full  flex items-center justify-between'>
                <motion.div whileHover={{scale: 1.1}}  className='w-20 h-30 -mt-8'> 
                    <img  src = {item?.imageURl} alt="Foto Producto" className='w-full h-full object-contain'/>
                </motion.div>
                 <motion.div whileTap={{scale: 0.6}} className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer hover:shadow-md'>
                     <BsFillBasket2Fill className='text-white' />
                 </motion.div>
            </div>
            <div className='w-full flex flex-col  items-end justify-end'>
                <p className='text-textColor font-semibold  text-base md:text-lg'> {item?.title}</p>
                <p className='text-textColor text-base'> {item?.description}</p>
                <div className='flex items-center gap8'>
                    <p className='text-lg text-black font-semibold'><span className='text-sm text-blue-400'>$</span> {item?.price}</p>
                </div>          
            </div>
        </div>
       ))
       ) : (
       <div className='w-full flex flex-col items-center justify-center'>
           <img src={notFound} className="h-40" />
           <p className='text-xl font-semibold'> No se han encontrado productos</p>
        </div>
        )}
    </div>
  )
}

export default Itemscontainer
