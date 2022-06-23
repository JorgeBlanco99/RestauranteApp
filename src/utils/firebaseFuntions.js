import { async } from "@firebase/util";
import { collection, doc, getDocs, orderBy, query, setDoc, where,getFirestore} from "firebase/firestore";
import { firestore} from "../firebase.config";


//guardar un elemento fooditem
export const saveItem = async(data) => {
    firestore.collection("foodItems").doc(`${Date.now()}`).set(data).then(() => {
    });

};

export const saveRestaurantInfo = async(data) => {
    const table = {
        table : data.tables
      }
    firestore.collection("restaurant").doc(`${Date.now()}`).set(data).then(() => {
    });
    firestore.collection("reservations").doc("config").update(table);
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

export const saveReservation = async(data) => {
    firestore.collection("reservations").doc(`${Date.now()}`).set(data).then(() => {
    });
};

export const getReservationByDay = async (id,hour) => {
    const items = await getDocs(query(collection(firestore,"reservations"),where('id', '==', id)));
    let one= 0;
    let two= 0;
    let three = 0 ;
    let four = 0;
    let five = 0;
    let six = 0;
    let seven = 0;
    items.docs.map((doc)=>{
        switch(doc.data().hour){
            case "1":
                one++;
                break;
             case "2": 
                two ++;
                break;
             case "3":
                three++;
                break;
             case "4": 
               four++;
               break;
             case "5":
               five++;
               break;
             case "6": 
               six++;
               break;
             case "7": 
               seven++;
               break;
           }
    });
    const number = {
        1: one,
        2: two,
        3: three,
        4: four,
        5: five,
        6: six,
        7: seven
    }
    return number;
};

export const getReservationByName = async (name) => {
    const items = await getDocs(query(collection(firestore,"reservations"),where('name', '==', name)));
    return items.docs.map((doc)=> doc.data());
};
export const delateReservation = async (data) => {
    const items = await  getDocs(query(collection(firestore,"reservations"),where('email', '==', data.email),where('name', '==', data.name),where('hour', '==', data.hour)));
    items.forEach((element) => {
        firestore.collection("reservations").doc(`${element.id}`).delete();
    }); 
};
