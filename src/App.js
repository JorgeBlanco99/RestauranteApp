import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainContainer, Header, CreateContainer } from './components';
import {AnimatePresence} from "framer-motion";
const App = () => {
  return (
  <AnimatePresence exitBeforeEnter>
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header/>
      <main className='mt-16 md:mt-20 px-16 py-4 p-8 w-full'> 
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
