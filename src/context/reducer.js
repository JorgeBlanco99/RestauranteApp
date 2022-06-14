export const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CARD_SHOW: 'SET_CARD_SHOW',
    SET_CARD_ITEMS: 'SET_CARD_ITEMS',
    SET_KITCHEN_ORDERS: 'SET_KITCHEN_ORDERS',
    SET_MODIFY_ITEM : 'SET_MODIFY_ITEM',
    SET_RESTAURANT_INFO: 'SET_RESTAURANT_INFO',
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionType.SET_USER:
            return{
                ...state,
                user: action.user,
            }
            break;
        case actionType.SET_RESTAURANT_INFO:
            return{
                ...state,
                RestaurantInfo: action.RestaurantInfo,
            }
            break;
        case actionType.SET_MODIFY_ITEM:
            return{
                ...state,
                modifyItem: action.modifyItem,
            }
            break;   
             
        case actionType.SET_KITCHEN_ORDERS:
            return{
                ...state,
                kitchenOrders: action.kitchenOrders,
            }
            break;    
        case actionType.SET_FOOD_ITEMS:
            return{
                ...state,
                foodItems: action.foodItems,
            }
            break;
        case actionType.SET_CARD_SHOW:
                return{
                    ...state,
                    cartShow: action.cartShow,
                }
                break;
        case actionType.SET_CARD_ITEMS:
                return{
                    ...state,
                    cartItems: action.cartItems,
                }
                break;
                
        default:
            return state;
            break;
    }
}
export default reducer;