import React, { useEffect, useState } from 'react'
import {BiMinus,BiPlus} from 'react-icons/bi'
import {motion} from "framer-motion"
import { useStateValue} from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CardItem = ({item, setFlag, flag}) => {
    const [qty, setQty] = useState(item.qty);
    const [items, setItems] = useState([])
    const[{cartItems}, dispatch] = useStateValue();
    const cartDispatch = () => {
        localStorage.setItems("cartItems",JSON.stringify(items));
        dispatch({
            type:actionType.SET_CARD_ITEMS,
            cartItems: items,
        })
    }
    const updateQty = (action, id) => {
        if (action == "add") {
          setQty(qty + 1);
          cartItems.map((item) => {
            if (item.id === id) {
              item.qty += 1;
              setFlag(flag + 1);
            }
          });
          cartDispatch();
        } else {
          if (qty == 1) {
            items = cartItems.filter((item) => item.id !== id);
            setFlag(flag + 1);
            cartDispatch();
          } else {
            setQty(qty - 1);
            cartItems.map((item) => {
              if (item.id === id) {
                item.qty -= 1;
                setFlag(flag + 1);
              }
            });
            cartDispatch();
          }
        }
      };
    useEffect(()=>{
        setItems(cartItems)
    }, [qty])
  return (
    <div className='w-full px-2 p-1 rounded-lg bg-cardItem flex items-center gap-2'>
    <img src= {item?.imageURl} className='w.20 h-20 max-w-[60px] rounded-full object-contain' alt="Foto producto selecionado" />
{/* Nombre*/}
    <div className='flex flex-col gap-2'>
        <p> {item?.title}</p>
        <p className='text-sm block font-semibold'>{parseFloat(item?.price) * qty}€</p>
    </div>
     {/* boton*/}
     <div className='group flex items-center gap-2 ml-auto cursor-pointer '>
         <motion.div  whileTap={{scale: 0.75}} onClick={()=> updateQty("del",item?.id)}>
            <BiMinus className="text-white"/>
         </motion.div>
         <p className='w-5 h-5 rounded-sm bg-cardBg text-white flex items-center justify-center'> {qty}</p>
         <motion.div whileTap={{scale: 0.75}} onClick={()=> updateQty("add",item?.id)}> 
            <BiPlus className="text-white"/>
         </motion.div>
     </div>
</div>
  )
}

export default CardItem