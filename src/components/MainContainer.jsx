import React, { useState } from 'react'
import HomeContainer from './HomeContainer'
import Itemscontainer from './Itemscontainer'
import MenuContainer from './MenuContainer'
import { useStateValue } from "../context/StateProvider";
import { filterProps } from 'framer-motion';

const MainContainer = () => {
  const[{foodItems}, dispatch] = useStateValue();
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer/>    
      <MenuContainer/>
    </div>
  )
}

export default MainContainer