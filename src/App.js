import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer, Header, CreateContainer } from './components';
import {AnimatePresence} from "framer-motion";
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFuntions';
import { actionType } from './context/reducer';
const App = () => {
  const [{foodItems}, dispatch] = useStateValue();
  const fetchData = async () =>{
    await getAllFoodItems().then (data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems : data
      })
    })
  };
  useEffect(() => {fetchData()},[]);
  return (
  <AnimatePresence exitBeforeEnter>
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header/>
      <main className='mt-14 px-4 smd:mt-20 md:px-16 md:py-4  w-full'> 
        <Routes>
          <Route path="/*" element={<MainContainer/>} />
          <Route path="/createItem" element={<CreateContainer/>} />
        </Routes>

      </main>
    </div>
    </AnimatePresence>
  )
}

export default App;
