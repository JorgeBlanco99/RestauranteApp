import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyAkN_Eo5z_sP1LooDNl1tKhl9ShzjucUqQ",
  
    authDomain: "restauranteapp-72bd6.firebaseapp.com",
  
    databaseURL: "https://restauranteapp-72bd6-default-rtdb.firebaseio.com",
  
    projectId: "restauranteapp-72bd6",
  
    storageBucket: "restauranteapp-72bd6.appspot.com",
  
    messagingSenderId: "697577717342",
  
    appId: "1:697577717342:web:33cb9d97d5c65e32263ecf"
  
  };
  
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  export{app,firestore, storage};