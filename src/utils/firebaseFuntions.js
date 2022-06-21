import { async } from "@firebase/util";
import { collection, doc, getDocs, orderBy, query, setDoc, where,getFirestore} from "firebase/firestore";
import { firestore} from "../firebase.config";


//guardar un elemento fooditem
export const saveItem = async(data) => {
    firestore.collection("foodItems").doc(`${Date.now()}`).set(data).then(() => {
    });

};

export const saveRestaurantInfo = async(data) => {
    firestore.collection("restaurant").doc(`${Date.now()}`).set(data).then(() => {
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
    items.forEach((element) => {
        firestore.collection("orders").doc(`${element.id}`).delete();
    }); 
};

export const deleteProductId = async (id) => {
    const items = await  getDocs(query(collection(firestore,"foodItems"),where('id', '==', id)));
    items.forEach((element) => {
        firestore.collection("foodItems").doc(`${element.id}`).delete();
    }); 
};

export const updateProdutId = async (id , item) => {
    const items = await  getDocs(query(collection(firestore,"foodItems"),where('id', '==', id)));
    items.forEach((element) => {
        firestore.collection("foodItems").doc(`${element.id}`).update(item);
    }); 
};

export const updateBillIdInfo = async(data) => {
    firestore.collection("bill").doc(data.table).update(data);
};
export const updateBillPrice = async(data) => {
    firestore.collection("bill").doc(data.table).update(data);
};
export const getBillPrice = async (id) => {
    const item = await getDocs(query(collection(firestore,"bill"),where('table', '==', id)));
    const bill =  item.docs.map((doc)=> doc.data());
    return( parseFloat(bill[0].price));
};
export const getPendingOrders = async (id) => {
    const orders = await getDocs(query(collection(firestore,"orders"),where('table', '==', id)));
    return( orders.docs.map((doc)=> doc.data()));
};
export const getBIllForId = async (id) => {
    const items = await getDocs(query(collection(firestore,"bill"),where('table', '==', id)));
    return items.docs.map((doc)=> doc.data());
};