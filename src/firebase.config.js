  import firebase from "firebase/compat/app";
  import "firebase/compat/firestore";
  import "firebase/compat/storage";


  const config = {
    apiKey: "AIzaSyAkN_Eo5z_sP1LooDNl1tKhl9ShzjucUqQ",
  
    authDomain: "restauranteapp-72bd6.firebaseapp.com",
  
    databaseURL: "https://restauranteapp-72bd6-default-rtdb.firebaseio.com",
  
    projectId: "restauranteapp-72bd6",
  
    storageBucket: "restauranteapp-72bd6.appspot.com",
  
    messagingSenderId: "697577717342",
  
    appId: "1:697577717342:web:33cb9d97d5c65e32263ecf"
  };
  
  const app = firebase.apps.length > 0 ? firebase.apps.length :firebase.initializeApp(config);;

  const firestore = firebase.firestore();
   const storage = firebase.storage(app);

  export { firestore,app,storage};