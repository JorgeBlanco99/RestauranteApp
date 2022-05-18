import React, {useState} from 'react'
import Logo from './img/logo.jpg'
import { MdOutlineShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import {Link} from "react-router-dom";
import { motion } from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue} from '../context/StateProvider';
import { actionType } from '../context/reducer';
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const[{user}, dispatch] = useStateValue();

  const[isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if(!user){
      const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth,provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user:null,
    })
  }
  return (
    <header className="fixed z-50 w-screen p-3  px-4 md:p-6 md:px-16">
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
            <div className="relative">
            <motion.img 
              whileTap={{scale:0.6}} 
              src={user?.photoURL ?? Logo} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer rounded-full"
              alt="userprofile" onClick={login}/>
                {isMenu && (
                  <motion.div initial={{opacity:0 , scale:0.6}}
                  animate={{opacity:1 , scale:1}}
                  exit={{opacity:0 , scale:0.6}}
                   className="w-40 bg-white shadow-x1 rounded-lg flex flex-col absolute top-12 right-0">
                {/*MODO ADMIN CUTRE HACER BIEN*/} 
                  {
                    user && user.email === "ikoke67@gmail.com" && ( 
                      <Link to={"/createItem"}> 
                      <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
                      transition-all duration-75 ease-out text-textColor'> Nuevo Producto <MdAdd/></p>
                      </Link>
                    )
                  } 
                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
                transition-all duration-75 ease-out text-textColor'  onClick={logout}>Cerrar sesion <MdLogout/></p>
              </motion.div>
                )}
                  
            
            </div>
          </div>
        </div>
        {/*Mobile*/}
        <div className="flex items-center justify-between md:hidden w-full h-full">
          
          <div className="relative flex items-center justify-center">
              <MdOutlineShoppingBasket className="text-textColor text-2xl cursor-pointer"/>
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                <p className="text-sm text-white font-semibold">2</p>
              </div>
            </div>

            <Link to = {"/"} className='flex items-center gap-2'>
            <img src={Logo} className="w-10 object-cover" alt="logo"/>
            <p className="text-headingColor text-xl font-bold">Restautante</p>
          </Link>
          <div className="relative">
              <motion.img 
              whileTap={{scale:0.6}} 
              src={user ? user.photoURL : Logo} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer rounded-full"
              alt="userprofile" onClick={login}/>
              
              {
                isMenu && (
                  <div className="w-40 bg-white shadow-x1 rounded-lg flex flex-col absolute top-12 right-0">
                {/*MODO ADMIN CUTRE HACER BIEN*/} 
                {
                 user && user.email === "ikoke67@gmail.com" && ( 
                  <Link to={"/createItem"}> 
                  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
                  transition-all duration-75 ease-out text-textColor'> Nuevo Producto <MdAdd/></p>
                  </Link>
                )} 
                <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 gap-3 px-4 py-2">
                  Inicio</li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 gap-3 px-4 py-2">
                  Menu</li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 gap-3 px-4 py-2">
                  Sobre Nosotros</li>
              </ul>
                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
                transition-all duration-75 ease-out text-textColor justify-center bg-gray-200' onClick={logout}>Cerrar sesion <MdLogout/></p>
              </div>

              )}

              
            </div>
        </div>
    </header>
  );
};

export default Header