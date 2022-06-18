import { fetchCart, fetchUser,fetchClient } from "../utils/fetchLocalStorageData";

const  userInfo = fetchUser();
const cartInfo = fetchCart();
const clientInfo = fetchClient();

export const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
    kitchenOrders: null,
    modifyItem: null,
    RestaurantInfo: null,
    clientSession: clientInfo,
};