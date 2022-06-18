import React from 'react'
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer'

import { useStateValue } from "../context/StateProvider";
import { useSearchParams } from "react-router-dom";

const MenuView = () => {
    const[{foodItems, cartShow}, dispatch] = useStateValue();
  return (
    
    <div className='w-full h-auto flex flex-col items-center justify-center'>
    <MenuContainer/>
    {cartShow && (
        <CartContainer/>
    )}  
    </div> 
    )
}

export default MenuView