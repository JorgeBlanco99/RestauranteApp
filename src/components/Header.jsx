import React from 'react'
import Logo from './img/logo.jpg'
import { MdOutlineShoppingBasket } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
        {/*desktop tablet*/}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          <Link to = {"/"} className='flex items-center gap-2'>
            <img src={Logo} className="w-10 object-cover" alt="logo"/>
            <p className="text-headingColor text-xl font-bold">Restautante</p>
          </Link>
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Inicio</li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Menu</li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Sobre Nosotros</li>
            </ul>
            <div className="relative flex items-center justify-center">
              <MdOutlineShoppingBasket className="text-textColor text-2xl cursor-pointer"/>
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                <p className="text-sm text-white font-semibold">2</p>
              </div>
            </div>
            <BiUserCircle className="text-textColor text-3xl cursor-pointer"/>
          </div>
        </div>
        {/*Mobile*/}
        <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header