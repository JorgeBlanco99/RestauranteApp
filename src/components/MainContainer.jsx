import React, { useState } from 'react'
import HomeContainer from './HomeContainer'
import Itemscontainer from './Itemscontainer'
import MenuContainer from './MenuContainer'
import { useStateValue } from "../context/StateProvider";
import { filterProps } from 'framer-motion';
import CartContainer from './CartContainer';


const MainContainer = () => {
  const[{foodItems, cartShow}, dispatch] = useStateValue();
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer/>    
      <MenuContainer/>
      {cartShow && (
        <CartContainer/>
      )}   
    </div>
  )
}

export default MainContainer