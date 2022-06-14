import { async } from "@firebase/util";
import { collection, doc, getDocs, orderBy, query, setDoc, where,getFirestore} from "firebase/firestore";
import { firestore, app} from "../firebase.config";



//guardar un elemento fooditem
export const saveItem = async(data) => {
    await setDoc(doc(firestore,'foodItems',`${Date.now()}`), data, {
        merge: true
    });
};

export const saveRestaurantInfo = async(data) => {
    await setDoc(doc(firestore,'restaurant',`${Date.now()}`), data, {
        merge: true
    });
};

export const getRestaurantInfo = async () => {
    const items = await getDocs(query(collection(firestore,"restaurant"),orderBy("id","asc")));
    return items.docs.map((doc)=> doc.data());
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

export const deleteProductId = async (id) => {
    const db = getFirestore(app);
    const items = await  getDocs(query(collection(firestore,"foodItems"),where('id', '==', id)));
    //firestore.collection('orders').where('id', '==', id).get();
    items.forEach((element) => {
        db.collection('foodItems').doc(element.id).delete();
        console.log(`deleted: ${element.id}`);
    }); 
};
export const updateProdutId = async (id , item) => {
    console.log("hola");
    const items = await  getDocs(query(collection(firestore,"foodItems"),where('id', '==', id)));
    //firestore.collection('orders').where('id', '==', id).get();
    items.forEach((element) => {
       element.ref.update(item);
        console.log(`update: ${element.id}`);
    }); 
};