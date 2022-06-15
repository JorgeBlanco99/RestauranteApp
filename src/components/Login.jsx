import React, { useState } from "react";
import {getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider, signOut
} from "firebase/auth";

import { app } from '../firebase.config';
import { roles } from '../utils/data';
import { useStateValue} from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { motion } from 'framer-motion';



import { getFirestore, doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [fields,setFields] = useState(false); /**for errors */
  const [alertStatus,setAlertStatus] = useState("danger");
  const [msg,setMsg] = useState(null);
    const [category,setCategory] = useState(null);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const [isRegistering, setisRegistering] = useState(false);
    const[{user}, dispatch] = useStateValue();
    const provider = new GoogleAuthProvider();

    const googleLogin = async () => {
        const {user: {refreshToken, providerData}} = await signInWithPopup(auth,provider);
        dispatch({
          type: actionType.SET_USER,
          user: providerData[0],
        });
        if(!user){
          localStorage.setItem('user', JSON.stringify(providerData[0]));
          setFields(true)
          setMsg("Incio de sesion Con exito!");
          setAlertStatus("e")
          setTimeout(()=>{
            setFields(false)
          },4000)
        }else{
          setFields(true)
          setMsg("Error en el inicio de sesion con google");
          setAlertStatus("danger")
          setTimeout(()=>{
            setFields(false)
          },4000)
        }
    };

  async function registerUser(email, password, rol) {
    if(!email|| !password||!rol){
      setFields(true)
      setMsg("Complete todos los valores, Porfavor!");
      setAlertStatus("danger")
      setTimeout(()=>{
        setFields(false)
      },4000)
    }else{
      if(password.length < 6){
        setFields(true)
        setMsg("La contraseña debe tener mas de 6 caracteres");
        setAlertStatus("danger")
        setTimeout(()=>{
          setFields(false)
        },4000)
      }else{
        const infoUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then((userFirebase) => {
          return userFirebase;
        });
  
        const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
        setDoc(docuRef, { correo: email, rol: rol });
        setFields(true)
        setMsg("Usuario registrado con Exito!");
        setAlertStatus("e")
        setTimeout(()=>{
          setFields(false)
        },4000)
      }
      
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    if (isRegistering) {
      registerUser(email, password, rol);
    } else {
      const {user: {refreshToken, providerData}} = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      if(!user){
        localStorage.setItem('user', JSON.stringify(providerData[0]));
        setFields(true)
        setMsg("Incio de sesion Con exito!");
        setAlertStatus("e")
        setTimeout(()=>{
          setFields(false)
        },4000)
      }else{
        setFields(true)
        setMsg("Error en el Usuario o Contraseña");
        setAlertStatus("danger")
        setTimeout(()=>{
          setFields(false)
        },4000)
      }
    }
  }
  return (
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
       {fields && (
            <motion.p
            initial ={{opacity:0}}
            animate ={{opacity:1}}
            exit ={{opacity:0}}
            className={`w-full p-2 rounded-lg text-center font-semibold ${
            alertStatus === "danger" 
            ? "bg-red-400 text-red-800"
            : "bg-emerald-400 text-emerald-800"
             }`}
            >
             {msg}
            </motion.p>
        )}
    <h1 class="text-3xl font-semibold text-center text-green-600">{isRegistering ? "Regístrate" : "Inicia sesión"}</h1>
    <form onSubmit={submitHandler}>
      <label class="block text-sm text-gray-800">
        Correo electrónico:
        <input type="email" id="email" class="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
      </label>

      <label>
        Contraseña:
        <input type="password" id="password" class="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40" />
      </label>

      <div className='w-full'>
            <select  id="rol" onChange={(e)=>setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
              <option value="other" className="bg-white"> Selecione el rol</option>
              {roles && roles.map((item)=> (<option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor"
              value={item.urlParamName}>
                {item.name}
              </option>
              ))}
            </select>
          </div>
        
    
    <div className='flex items-center w-full'>
    <input
        type="submit"
        value={isRegistering ? "Registrar" : "Iniciar sesión"}  className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
      />
    </div>
      
    </form>
    <div className='flex items-center w-full'>
        <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={() => setisRegistering(!isRegistering)}>
            {isRegistering ? "Ya tengo una cuenta" : "Quiero registrarme"}
        </button>
    </div>
    <div className='flex items-center w-full'>
        <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={() => googleLogin()}>Google
        </button>
    </div>
  </div>
  )
}

export default Login