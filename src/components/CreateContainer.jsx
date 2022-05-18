import React, { useState } from 'react'
import { motion } from 'framer-motion';
import {MdFastfood,MdCloudUpload,MdDelete,MdFoodBank,MdDescription,MdAttachMoney} from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { onSnapshot } from 'firebase/firestore';
import { saveItem } from '../utils/firebaseFuntions';
const CreateContainer = () => {
  const [title,setTitle] = useState("");
  const [calories,setCalories] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [imageAsset,setImageAsset] = useState(null);
  const [category,setCategory] = useState(null);
  const [fields,setFields] = useState(false); /**for errors */
  const [alertStatus,setAlertStatus] = useState("danger");
  const [msg,setMsg] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
 
const uploadImage = (e) => {
  setIsLoading(true);
  const imageFile = e.target.files[0];
  const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`)
  const uploadTask = uploadBytesResumable (storageRef,imageFile);
  uploadTask.on('state_change',(snapshot) =>{
    const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
  },(error) => {
    console.log(error);
    setFields(true)
    setMsg("error al subir la imagen");
    setAlertStatus("danger")
    setTimeout(()=>{
      setFields(false)
      setIsLoading(false)
    },4000)
  },() => {
    getDownloadURL(uploadTask.snapshot.ref).then(DownloadURL => { 
      setImageAsset(DownloadURL);
      setIsLoading(false);
      setFields(true);
      setMsg("imagen subida con exito");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false)
      },4000)
    })
  })
};
const delateImage = () =>{
  setIsLoading(true);
  const deleteRef = ref(storage,imageAsset);
  deleteObject(deleteRef).then(()=>{
    setImageAsset(null);
    setIsLoading(false);
    setFields(true);
    setMsg("imagen Eliminada con exito");
    setAlertStatus("success");
    setTimeout(()=>{
      setFields(false)
    },4000)

  })
};
const saveProduct = () =>{
  setIsLoading(true);
  try{
    if(!title || !description || !calories || !price || !imageAsset || !category){
      setFields(true)
      setMsg("Alguno de los valores no esta rellenado");
      setAlertStatus("danger")
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)
      },4000)
    }else{
      const data = {
        id: `${Date.now()}`,
        title: title,
        imageURl: imageAsset,
        category: category,
        description: description,
        calories: calories,
        price: price,
        qty: 1
      }
      saveItem(data);
      setIsLoading(false);
      setFields(true);
      setMsg("Datos añadidos con exito");
      clearData();
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000)

    }

  }catch(error){
    console.log(error);
    setFields(true)
    setMsg("error al subir la imagen");
    setAlertStatus("danger")
    setTimeout(()=>{
      setFields(false)
      setIsLoading(false)
    },4000)
  }
};
const clearData= () => {
  setTitle("");
  setImageAsset(null);
  setDescription("");
  setCalories("");
  setPrice("");
  setCategory("Selecione la categoria");
}
 return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className=' w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col justify-center items-center gap-4'>
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
        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <MdFastfood className='text-x1 text-gray-700'/>
          <input type="text" requiered value={title} onChange={(e) => setTitle(e.target.value)}
           placeholder="Introduce el titulo"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>

        <div className='w-full'>
          <select onChange={(e)=>setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white"> Selecione la categoria</option>
            {categories && categories.map((item)=> (<option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor"
            value={item.urlParamName}>
              {item.name}
            </option>
            ))}
          </select>
        </div>

        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-255 md:h-420 cursor-pointer rounded-lg'>
            {isLoading ? <Loader/> : <>
              {!imageAsset ? <> 
              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                  <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
                  <p className='text-gray-500 hover:text-gray-700'>Haz click para subir imagen</p>
                </div>
                <input type="file" name = "uploadimage" accept="img/*"
                onChange={uploadImage}  className="w-0 h-0"/>
              </label>
              </> 
              : <><div className='relative h-full'>
                    <img src={imageAsset} alt = "imagen subida" className='w-full h-full object-cover'/>
                    <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-slate-500 text-xl
                     cursor-pointer outline-none hover:shadow-md duration-300 transition-all ease-in-out' onClick={delateImage}> 
                     <MdDelete className='text-white' /></button>
                  </div> </>}
            </>}
        </div>
        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <MdDescription className='text-x1 text-gray-700'/>
          <input type="text" requiered value={description} onChange={(e) => setDescription(e.target.value)}
           placeholder="Descripcion"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>

        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <MdFoodBank className='text-x1 text-gray-700'/>
          <input type="text" requiered value={calories} onChange={(e) => setCalories(e.target.value)}
           placeholder="Calorias"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>

        <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
          <MdAttachMoney className='text-x1 text-gray-700'/>
          <input type="text" requiered value={price} onChange={(e) => setPrice(e.target.value)}
           placeholder="Precio"
          className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
        </div>
        <div className='flex items-center w-full'>
          <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveProduct}> Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer