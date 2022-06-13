import { async } from "@firebase/util";
import { collection, doc, getDocs, orderBy, query, setDoc, where} from "firebase/firestore";
import { firestore} from "../firebase.config";


//guardar un elemento fooditem
export const saveItem = async(data) => {
    await setDoc(doc(firestore,'foodItems',`${Date.now()}`), data, {
        merge: true
    });
};

export const getAllFoodItems = async () => {
    const items = await getDocs(query(collection(firestore,"foodItems"),orderBy("id","desc")));
    return items.docs.map((doc)=> doc.data());
};

export const saveOrder = async(data) => {
    await setDoc(doc(firestore,'orders',`${Date.now()}`), data, {
        merge: true
    });
};

export const getAllOrders = async () => {
    const items = await getDocs(query(collection(firestore,"orders"),orderBy("id","asc")));
    return items.docs.map((doc)=> doc.data());
};

export const delateOrder = async (id) => {
    const items = await  getDocs(query(collection(firestore,"orders"),where('id', '==', id)));
    //firestore.collection('orders').where('id', '==', id).get();
    items.forEach((element) => {
       // element.ref.delete();
        console.log(`deleted: ${element.id}`);
    }); 
   
    
};