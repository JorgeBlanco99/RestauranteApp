import React, {useState, useEffect} from 'react'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {RiRefreshLine} from 'react-icons/ri'
import { saveOrder } from '../utils/firebaseFuntions';
import { useStateValue} from '../context/StateProvider';
import { actionType } from '../context/reducer';
import CardItem from './CardItem';

import {motion} from "framer-motion"

const CartContainer = () => {
    const[{cartShow , cartItems }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);
  const  order = () =>{
    const data = {
      id: `${Date.now()}`,
      produc: Object.assign({},cartItems)
    }
    
    saveOrder(data);
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);
    
    const showCart = () => {
        dispatch({
          type: actionType.SET_CARD_SHOW,
          cartShow:!cartShow,
        })
      };
      const clearCart = () => {
        dispatch({
          type: actionType.SET_CARD_ITEMS,
          cartItems: [],
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
      };

  return (
    <motion.div initial={{opacity:0, x:200}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x:200}}
    className=' fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
        <div className='w-full flex items-center justify-between p-4'>
            <motion.div whileTap={{scale:0.75}}> <MdOutlineKeyboardBackspace className='text-3xl cursor-pointer'  onClick={showCart}/> </motion.div>
            <p className='text-lg font-semibold'>Cesta</p>
            <motion.p whileTap={{scale:0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-red-300 rounded-md hover:shadow-md cursor-pointer' onClick={clearCart}> Vaciar <RiRefreshLine/></motion.p>
        </div>
        {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full rounded-t-[2rem] flex flex-col bg-cardBg'>
            <div className='w-full h-340 md:h-42 py-10 px-6 flex flex-col gap-3 overflow-y-auto scrollbar-none'>
                {cartItems && cartItems.map(item => (
                   <CardItem key={item?.id} item = {item} setFlag={setFlag} flag={flag}/>
                ))}       
            </div> 
            {/* cuentas*/}  
            <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-centerjustify-evenly py-2 px-8'>
                <div className='w-full flex flex-colitems-center justify-between'>
                    <p className='text-white'> subtotal:</p>
                    <p className='text-white'>{tot} €</p>
                    <p className='text-white'> impuestos:</p>
                    <p className='text-white'>  €</p>    
                </div>
                <div className=' w-full border-b border-black my-2'></div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-white'> Total:</p>
                    <p className='text-white'> {tot} €</p>
                </div>
                <motion.button whileTap={{scale:0.75}}
                type="button" className='w-full p-2 rounded-full bg-blue-600 text-white text-lg my-2 hover shadow-lg' onClick={order}>
                    Pedir
                </motion.button>
            </div>          
        </div>             
        ):(
            <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                {/* añadir una imagen de carta vacia*/}
                <p className='text-xl font-semibold'> Añade productos a la cesta</p>
            </div>
        )}
    </motion.div>
  )
}

export default CartContainer