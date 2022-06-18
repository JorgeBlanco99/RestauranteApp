import React, { useEffect,useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import { MainContainer, Header, CreateContainer,Login,KitchenView, ProductManage, ModifyContainer,ReservationView,ManagerView,MenuView,QrGenerator} from './components';
import {AnimatePresence} from "framer-motion";
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFuntions';
import { actionType } from './context/reducer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from './firebase.config';
import { Redirect } from 'react-router'
import { useSearchParams } from "react-router-dom";


const auth = getAuth(app);
const firestore = getFirestore(app);
const App = () => {
  const [flag, setFlag] = useState(true);
  const[{user}, dispatch1] = useStateValue();

  async function getRol(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
        flag: "false",
      };
      dispatch1({
        type: actionType.SET_USER,
        user: userData,
      });
      localStorage.setItem('user', JSON.stringify(userData));
      setFlag(null);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user.flag) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    }
  });
  const [{foodItems}, dispatch] = useStateValue();
  const fetchData = async () =>{
    await getAllFoodItems().then (data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems : data
      })
    })
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [{clientSession}, dispatch2] = useStateValue();
  
  const LoadClientSession = () => {
    const sessionData = {
      table:  searchParams.get('table'),
      type:   searchParams.get('type'),
    };
    dispatch2({
      type: actionType.SET_CLIENT_SESSION,
      clientSession: sessionData,
    });
    localStorage.setItem('clientSession', JSON.stringify(sessionData));

    console.log(clientSession);
};
  useEffect(() => {fetchData()},[]);
  useEffect(() => {LoadClientSession()},[]);

  return (
  <AnimatePresence exitBeforeEnter>
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header/>
      <main className='mt-14 px-4 smd:mt-20 md:px-16 md:py-4  w-full'> 
        <Routes>
          <Route path="/*" element={<MainContainer/>} />
          <Route path="/createItem" element={<CreateContainer/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/kitchen" element={<KitchenView/>} />
          <Route path="/products" element={<ProductManage/>} />
          <Route path="/modify" element={<ModifyContainer/>} />
          <Route path="/reservation" element={<ReservationView/>} />
          <Route path="/gestion" element={<ManagerView/>} />
          <Route path="/generadorQr" element={<QrGenerator/>} />    
          <Route path="/menu" element={<MenuView/>}/>
        </Routes>

      </main>
    </div>
    </AnimatePresence>
  )
}

export default App;
